# Ramen Ratings API

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Bun](https://img.shields.io/badge/Bun-v1.2.0%2B-important.svg)
![Docker](https://img.shields.io/badge/Docker-Compose-blue.svg)

## Project Overview

The Ramen Ratings API is a comprehensive data service designed for ramen enthusiasts, food researchers, and developers seeking detailed information about ramen products worldwide. Leveraging modern web technologies, this API provides robust, performant access to an extensive ramen ratings database.

## Technical Architecture

### Core Technologies
- **Runtime**: Bun (ultra-fast JavaScript runtime)
- **Web Framework**: Hono (lightweight, performant web framework)
- **ORM**: Drizzle (type-safe, lightweight database toolkit)
- **Database**: PostgreSQL
- **Containerization**: Docker Compose

### Key Features
- Comprehensive ramen product database
- Flexible querying capabilities
- High-performance data retrieval
- Scalable microservice architecture

## System Requirements

### Minimum Dependencies
- Docker
- Docker Compose
- Bun v1.2.0+

## Project Setup

### 1. Repository Initialization
```bash
git clone https://github.com/your-username/ramen-ratings-api.git
cd ramen-ratings-api
```

### 2. Environment Configuration
Create `.env` file with database credentials:
```bash
POSTGRES_USER=ramen_user
POSTGRES_PASSWORD=ramen_password
POSTGRES_DB=ramen_ratings
```

### 3. Database and Application Launch
```bash
docker-compose up -d
```

## API Endpoints

### Core Endpoints
- `GET /ramen`: Retrieve all ramen entries
- `GET /ramen/brand/:brandName`: Filter by brand
- `GET /ramen/stars/:starsValue`: Filter by rating
- `GET /ramen/country/:countryName`: Filter by country of origin

### Advanced Querying
- Supports complex filtering
- Pagination support
- Sorting capabilities

## Project Structure

```
ramen-ratings-api/
│
├── src/
│   ├── db/           # Database configuration
│   │   ├── db.ts     # Database connection
│   │   └── schema.ts # Database schema definitions
│   │
│   ├── routes/       # API route definitions
│   │   └── ramen.router.ts
│   │
│   ├── scripts/      # Data transformation utilities
│   │   ├── convertCsvToJson.ts
│   │   ├── importRamenRatings.ts
│   │   └── seedFromJson.ts
│   │
│   └── index.ts      # Application entry point
│
├── Dockerfile        # Container build instructions
├── docker-compose.yml# Multi-container orchestration
└── drizzle.config.ts # ORM configuration
```

## Data Pipeline

### Data Sources
- Original Source: CSV file
- Transformation: CSV → JSON
- Seeding: JSON → PostgreSQL

### Data Processing Scripts
- `convertCsvToJson.ts`: Converts raw CSV to structured JSON
- `seedFromJson.ts`: Imports JSON data into PostgreSQL

## Development Workflow

### Local Development
```bash
# Install dependencies
bun install

# Run migrations
bun run migrate

# Start development server
bun run dev
```

### Testing
- Unit tests with Bun's test runner
- Integration tests for API endpoints

## Contributing
1. Fork repository
2. Create feature branch
3. Commit changes
4. Open pull request

## License
MIT License - Open-source, free to use and modify

## Contact
Maintainer: Anthony Macias
