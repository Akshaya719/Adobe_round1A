

import fs from 'fs';
import path from 'path';
import { extractHeadings } from './pdfProcessor.js';

const INPUT_DIR = './input';
const OUTPUT_DIR = './output';

async function processPDF(file) {
  const filePath = path.join(INPUT_DIR, file);
  try {
    const headings = await extractHeadings(filePath);

    if (!headings || !Array.isArray(headings) || headings.length === 0) {
      console.warn(`No headings extracted from ${file}`);
      return;
    }

    const titleCandidate = headings.find(h => h.level === 'H1') || headings[0];
    const title = titleCandidate ? titleCandidate.text : 'Untitled Document';

    const output = {
      title,
      outline: headings
    };

    const outputPath = path.join(OUTPUT_DIR, file.replace(/\.pdf$/i, '.json'));
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
    console.log(`Processed: ${file}`);
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
}

async function run() {
  const files = fs.readdirSync(INPUT_DIR).filter(f => f.toLowerCase().endsWith('.pdf'));
  for (const file of files) {
    await processPDF(file);
  }
}

run();
