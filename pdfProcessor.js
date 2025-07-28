
import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

export async function extractHeadings(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);

    if (!data.text || data.text.trim().length === 0) {
      console.warn(`No text extracted from ${filePath}`);
      return [];
    }

    const totalPages = data.numpages || 1;

    const lines = data.text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const linesPerPage = Math.ceil(lines.length / totalPages);

    const headings = [];

    // for (let i = 0; i < lines.length; i++) {
    //   const line = lines[i];

    //   let level = 'H3';
    //   if (line.length < 40 && /^[A-Z]/.test(line)) {
    //     level = 'H1';
    //   } else if (line.length < 80) {
    //     level = 'H2';
    //   }

    //   const page = Math.floor(i / linesPerPage) + 1;

    //   headings.push({
    //     level,
    //     text: line,
    //     page
    //   });
    // }
    for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  //  Skip lines like "1.", "2.", "3." etc.
  if (/^[0-9]+\.$/.test(line)) {
    continue;
  }

  let level = 'H3';
  if (line.length < 40 && /^[A-Z]/.test(line)) {
    level = 'H1';
  } else if (line.length < 80) {
    level = 'H2';
  }

  const page = Math.floor(i / linesPerPage) + 1;

  headings.push({
    level,
    text: line,
    page
  });
}


    return headings;
  } catch (err) {
    console.error(`extractHeadings failed for ${filePath}:`, err.message);
    return [];
  }
}
