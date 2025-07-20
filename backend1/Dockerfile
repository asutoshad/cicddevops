FROM node:20-alpine

WORKDIR /app

# Copy only dependency files first for better Docker layer caching
COPY package.json yarn.lock ./

# Install dependencies (this includes knex from node_modules)
RUN yarn install

# Now copy the rest of the source code
COPY . .

# Build your TypeScript app (if needed)
RUN yarn build

# Expose the correct backend port
EXPOSE 5001

# Run migrations using the locally installed knex, then start the app
CMD ["sh", "-c", "yarn migrate && yarn start"]
