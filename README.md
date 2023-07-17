# SB Node.js OpenAI REST API

NodeJS wrapper to interact with OpenAI

## License

This project is licensed under the MIT License. See LICENSE for more information.

## Table of contents

- [🏗️ Prerequisites](#-prerequisites)
- [🌱 Installation](#-installation)
- [📖 Configuration](#-configuration)
- [📖 API Endpoints](#-api-endpoints)
---

## 🏗️ Prerequisites

- Node.js (version 16.X.X)

## 🌱 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rajeshkumaravel/sb-nodejs-openai
2. Install dependencies:

   ```bash
   npm install
3. Start the server:

   ```bash
   npm start

## 📖 Configuration

1. Post setup of application, copy `.env.sample` file and paste it under root directory

2. Rename the file as `.env`

3. Update the required environment variable

   ```
   # Your unique OPENAI API key value goes here
   OPENAI_API_KEY=<KEY_GENERATED_FROM_OPENAI_API>
   ```

4. [Click here to know more about generating OpenAI API Key](./OPENAI_API.md)

## 📖 API Endpoints

The following API endpoints are available:
- **_Refer swagger documentation link for more details_**
- **_To access swagger; visit http://localhost:{PORT}/docs_**

| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/ask | To query with OpenAI |
| POST | /api/ask/description | To get description for given title |
| POST | /api/ask/tags | To get tags for given title |
| POST | /api/ask/toc | To generated TOC for given title |
| POST | /api/ask/images | To generated images for given title |


