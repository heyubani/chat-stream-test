## Description

NestJS Chat Stream Service with RAG (OpenAI)
This project implements a tiny chat-stream service using NestJS, integrating a simple Retrieval Augmented Generation (RAG) mechanism and streaming responses from the OpenAI API via Server-Sent Events (SSE). It also includes basic rate limiting to prevent abuse.

Features
Chat Streaming: Streams AI responses token by token using SSE.

RAG (Simulated): Retrieves relevant context from predefined documents based on user input.

OpenAI Integration: Utilizes the OpenAI gpt-4.1 model (configurable) for generating responses.

Rate Limiting: Protects the API endpoint with a configurable rate limit (10 requests per minute by default).

## Endpoint to test
```
  http://localhost:8080/api/v1/chat/stream?message=technology
```

## Setup .env

create a  `.env` file to the root folder then add url to your db to connect your postgres DBs. 
An example of the structure of the `.env` is seen in `.env.example` file.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

