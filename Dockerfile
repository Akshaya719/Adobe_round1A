
# CMD ["node", "index.js"]

FROM node:20-alpine

WORKDIR /app

# Install prod dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy rest of the code
COPY . .

# Entrypoint
CMD ["node", "index.js"]
