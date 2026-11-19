---
title: "7. Serialization and Deserialization for backend engineers"
description: "How clients and servers exchange data across languages: domain-agnostic serialization, the OSI application layer mental model, JSON structure rules, Protobuf vs XML vs JSON, and request/response payloads."
order: 7
duration: "6 min read · 21 min video"
videoUrl: "https://youtu.be/vzg90tY3uM0"
youtubeId: "vzg90tY3uM0"
tags: ["Backend Architecture", "Serialization", "Deserialization", "JSON", "Protobuf", "OSI Model", "REST API", "Sriniously"]
publishedAt: "2026-11-19"
diagramType: "none"
status: "published"
---

## 🎬 Verbatim Transcript & Visual Study Guide

### 00:00 – Introduction to Serialization & Client-Server Communication

What is serialization and deserialization? Let’s look at this. We have already discussed that usually we have a client—let’s say it’s a browser, like Chrome. In our typical technical language, this is called the frontend.

Usually, we communicate with a server that’s running on your localhost, or it’s running somewhere remote in the cloud, in AWS, GCP, or Azure. The client communicates with the server through some means of network communication. It can be through HTTP (our traditional REST API endpoints), or it can be through gRPC, or it can be through WebSockets. We have different means of communication for clients and servers to talk to each other.

For this example, and throughout the series, since we are focusing on HTTP or our traditional REST API style communication, let’s assume this client is a JavaScript app. It can be React, Angular, Vue, or any JavaScript framework or library.

---

### 02:03 – The Core Problem: Different Languages, Different Data Types

In order to send a request to the server, the client has to make an HTTP request. If it’s a POST request, we have the URL, and below that we have the headers, and below that we have the request body. This is how the frontend sends the data—the request with all the information that the client wants to send to the server. The server then responds with some response which the client is able to parse and make sense of.

The thing to focus on in this session is: **how do clients and servers make sense of the data that is being sent or received?**

For example, in our case, the client is a JavaScript app, and the server can be a Rust app. The web server is built with the Rust language. In JavaScript, let’s say we are sending an object: `{ name: "some string" }`. After we send this in the request body and it reaches the Rust server, how does the server take this data and make sense of it in its own format, in its own data types?

JavaScript and Rust have completely different data types. JavaScript is a completely dynamic language; it is not compiled. On the other side, Rust is very strict when it comes to types, and it is a compiled language. All the data types are completely different.

So how does this happen? How does data transmitted over a network reach another machine somewhere else on the internet, and that machine is able to make sense of that data, perform some business logic, send a response, and the client is again able to make sense of that response to show some UI?

---

### 04:07 – The OSI Model & The "Mental Model" for Backend Engineers

Before we talk about data transmission over the internet, it’s very good to have some knowledge about the OSI model. If you’re a CS student, you might have already come across it. If you’re not, you don’t have to completely master it or understand every aspect of it, like IP packets or data frames.

Having a good high-level overview of how these different layers of the network communicate with each other over the internet to transmit data is helpful:
- The layer on top is called the **Application Layer** (Layer 7).
- At the bottom is the **Physical Layer** (Layer 1).
- The same stack exists on the server side: application layer down to physical layer, with transport, network, and data link layers in between.

Now, imagine you were asked to solve this problem: you have two machines in different locations connected over the internet, and you have to come up with a way so that one machine is able to send data to another machine, and they should be able to parse that data and make sense of it in a way that is **language-agnostic**.

---

### 06:14 – The Solution: A Common Serialization Standard

A very obvious and common solution is figuring out a **common standard**. This is just a way of saying you will agree on a set of rules: both client and server agree that this is the format data must be sent and received in.

1. The client takes its native data (e.g., a JavaScript object or map), **serializes** it into this common standard format, and sends it over the network.
2. The server receives the bytes, **deserializes** the data from the common standard into its own native format (e.g., a Rust struct).
3. The server runs its business logic, updates the database, **serializes** the result back into the common format, and sends the response.
4. The client reads the response, **deserializes** it into a native JavaScript object, and updates the UI.

To summarize:
> **Serialization and Deserialization** is the process of converting in-memory data structures to and from a standardized, domain-agnostic format so that disparate machines, languages, and environments can reliably communicate over networks or storage systems.

---

### 08:53 – Types of Serialization Standards

Backend is a huge domain, and there are hundreds of technologies. In production systems, we categorize serialization into two primary types:

#### 1. Text-Based Serialization
- **JSON** (JavaScript Object Notation): The dominant standard for web and mobile APIs (used in ~80%+ of REST endpoints).
- **YAML**: Human-friendly, primarily used in configuration files (Docker Compose, Kubernetes manifests, CI/CD).
- **XML**: Verbose, tag-based standard common in legacy enterprise integrations and SOAP.

#### 2. Binary Serialization
- **Protobuf** (Protocol Buffers by Google): Strongly-typed, highly compressed binary format used heavily in microservices and gRPC communication for high throughput and low latency.
- **MessagePack**, **Avro**, **BSON**: Other binary encodings optimized for speed and storage efficiency.

---

### 13:00 – Deep Dive into JSON (JavaScript Object Notation)

JSON stands for JavaScript Object Notation. Although born in the JavaScript ecosystem, JSON is completely language-independent. You will find JSON in REST APIs, configuration files, and structured application logs.

A typical JSON payload is strictly human-readable:
- It starts with a curly brace `{` and ends with `}`.
- **All keys must be inside double quotes** (`"key"`), and they must strictly be strings.
- **Values** can be:
  - Strings (`"hello"`)
  - Numbers (`123`, `45.67`)
  - Booleans (`true`, `false`)
  - Arrays (`["item1", "item2"]`)
  - Objects (nested `{ "country": "India", "zip": 190001 }`)
  - Null (`null`)

---

### 16:22 – Real-World Demo: JSON in HTTP Requests and Responses

Let’s see this in a real environment. We hit a `POST /api/books` endpoint:

#### Request Payload (Client ➔ Server):
```json
{
  "title": "Designing Data-Intensive Applications",
  "author": "Martin Kleppmann",
  "price": 45
}
```

As a backend engineer, the mental model you should maintain:
- The data is transformed by the browser into raw string bytes, packetized across the OSI layers (frames, packets, optical fiber bits), and reassembled at the server.
- At Layer 7 (the application layer), your web framework parses the body back into a parsed JSON data structure or strongly-typed object (`Book`).
- Your handler processes the book, persists it into PostgreSQL, and responds with a serialized JSON response:

#### Response Payload (Server ➔ Client):
```json
{
  "success": true,
  "data": {
    "id": 104,
    "title": "Designing Data-Intensive Applications",
    "author": "Martin Kleppmann",
    "createdAt": "2026-11-19T20:00:00Z"
  }
}
```

---

### 20:41 – Summary: The Flow of Serialization and Deserialization

To wrap up:
- **Serialization** converts your in-memory objects into a portable, wire-safe format (like JSON strings).
- **Deserialization** reconstructs those serialized bytes into native, type-safe structures in the target programming language.

Mastering this fundamental separation enables you to architect systems where a Go microservice, a Python ML pipeline, a Rust backend, and a React frontend can all communicate effortlessly.
