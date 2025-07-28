# PDF Outline Extractor

## Description
Extracts document title and heading outline (H1–H3) from PDFs and detects dominant language.

## Features
- Extracts headings with font size heuristics
- Outputs JSON with structure
- Multilingual language detection
- Fully offline, Docker-compatible

## Input/Output
- Place `.pdf` files in `/input`
- Extracted JSONs saved in `/output`

## Run Instructions
### Docker Build
```
docker build --platform linux/amd64 -t pdfextractor:latest .
```
### Docker Run
```
docker run --rm -v $(pwd)/input:/app/input -v $(pwd)/output:/app/output --network none pdfextractor:latest
```

---