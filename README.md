# SB Node.js OpenAI REST API

NodeJS wrapper to interact with OpenAI

## License

This project is licensed under the MIT License. See LICENSE for more information.

## Table of contents

- [🏗️ Prerequisites](#-prerequisites)
- [🌱 Installation](#-installation)
- [🌱 Using Docker](#-using-docker)
- [📖 Troubleshooting](#-troubleshooting)
- [📖 Configuration](#-configuration)
- [📖 API Endpoints](#-api-endpoints)
---

## 🏗️ Prerequisites

- Node.js (version 14.X.X)
- Optional- Docker: [Install Docker](https://docs.docker.com/get-docker/)

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

## 🌱 Using Docker

1. Clone the repository:

   ```bash
   git clone https://github.com/rajeshkumaravel/sb-nodejs-openai
   ```

2. Navigate to the project's root directory:

   ```shell
   cd sb-nodejs-openai
   ```

3. Build the Docker image:

   ```shell
   docker build -t sb-nodejs-openai .
   ```

   This command will read the instructions from the Dockerfile and build an image with the name `sb-nodejs-openai`.

4. Run the Docker container:

   ```shell
   docker run -p 4400:4400 -d sb-nodejs-openai
   ```

   This command will start a Docker container based on the `sb-nodejs-openai` image and map port 4400 from the container to port 4400 on your local machine. The `-d` flag runs the container in detached mode, allowing it to run in the background.

5. To stop the Docker container, use the following command:

   ```shell
   docker stop <container_id>
   ```

   Replace `<container_id>` with the ID or name of the running container. You can find the container ID by running `docker ps`.

## 📖 Troubleshooting

- If you encounter any issues during the build or run process, make sure you have Docker properly installed and running on your system.

- Check the Docker logs to see if there are any error messages or issues reported by the container. You can use the following command to view the logs:

  ```shell
  docker logs <container_id>
  ```

  Replace `<container_id>` with the ID or name of the running container.


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
| POST | /api/ask/keywords | To get keywords for given title |
| POST | /api/ask/toc | To generated TOC for given title |
| POST | /api/ask/images | To generated images for given title |


