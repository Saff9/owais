---
title: "5. Understanding HTTP for backend engineers, where it all starts"
description: "The complete guide to HTTP: client-server model, statelessness, message anatomy, headers categorization, methods, idempotency, CORS preflight, status codes, caching, compression, and HTTP/1.1 vs HTTP/2 vs HTTP/3."
order: 5
duration: "12 min read · 77 min video"
videoUrl: "https://youtu.be/a3C1DMswClQ"
youtubeId: "a3C1DMswClQ"
tags: ["Backend Architecture", "HTTP", "Networking", "CORS", "Idempotency", "Headers", "Status Codes", "Caching", "HTTP/2", "HTTP/3", "Sriniously"]
publishedAt: "2026-11-19"
diagramType: "none"
status: "published"
---

## 🎬 Verbatim Transcript & Visual Study Guide

### 00:00 – Introduction: Focusing on the 90%

Backend is huge, and if we start discussing every single component that could be part of it, we will be stuck here for years. So, what we will do is we will only discuss those topics which are used in the majority of codebases—let’s say 90% of them.

With that in mind, let’s talk about the HTTP protocol: the medium through which our browsers and applications talk to our servers.

---

### 02:15 – The Client-Server Model & Statelessness

HTTP follows a strict client-server model. The client (like a browser or mobile app) initiates the communication by sending a request. The server waits for these requests, processes them, and returns a response containing data, a web page, or an error.

The most important concept to understand here is **statelessness**. HTTP is stateless, meaning the server has no memory of previous interactions after it sends a response. Every new request is treated as a completely new, unrelated event.

Because of this, every single request must be self-contained. It must carry the URL, the method, the headers, authentication credentials, session information, or any other data the server needs to process that specific interaction independently.

While HTTP itself is stateless, applications maintain continuity by layering state-management mechanisms on top of it, such as cookies, sessions, or JWT tokens. For example, when you request your user profile, your browser automatically attaches a session cookie or token to the request so the server knows exactly which user is asking for the protected data.

---

### 05:30 – The Anatomy of HTTP Messages

Every HTTP interaction consists of two parts: a request and a response. Both have a strict structure.

#### An HTTP Request contains:
1. **Request Method** (e.g., `GET`, `POST`, `PUT`, `DELETE`).
2. **URL** of the desired resource path.
3. **HTTP Version** (e.g., `HTTP/1.1`).
4. **Headers** (key-value metadata pairs).
5. **A Blank Line** (CRLF separator).
6. **Optional Request Body** (carrying data the client wants to send to the server, like JSON payloads).

#### An HTTP Response contains:
1. **HTTP Version**.
2. **Status Code & Message** (e.g., `200 OK`, `404 Not Found`).
3. **Response Headers** (metadata about the returned data and server).
4. **A Blank Line** (CRLF separator).
5. **Response Body** (carrying the returned HTML page, JSON data, raw text, or error payload).

---

### 08:45 – HTTP Headers: The Metadata

HTTP headers are key-value pairs that carry metadata about the request or response. Think of them like the shipping label written on the outside of a parcel. They let systems (like load balancers, proxies, and the server itself) inspect routing details, credentials, client identity, content preferences, and dates without having to open and parse the actual body of the message first.

We categorize headers into:
- **Request Headers**: e.g., `User-Agent`, `Authorization`, `Accept`.
- **General Headers**: e.g., `Connection`, `Date`.
- **Representation Headers**: e.g., `Content-Type`, `Content-Encoding`, `Content-Length`.
- **Security Headers**: e.g., `Strict-Transport-Security` (HSTS), `Content-Security-Policy` (CSP), `X-Frame-Options`.

Headers make HTTP highly extensible and allow us to control caching, authentication, compression, and content selection.

---

### 15:20 – HTTP Methods & Idempotency

HTTP methods define the action the client wants to perform on the resource:
- **`GET`**: Retrieves data from a resource without modifying server state.
- **`POST`**: Commonly creates new data or submits data for processing.
- **`PUT`**: Replaces an entire target resource with the uploaded payload.
- **`PATCH`**: Applies a partial update to an existing resource.
- **`DELETE`**: Removes the specified resource.

A critical concept here is **idempotency**. An operation is idempotent if repeating it multiple times has the exact same intended effect on the server as performing it just once.
- `GET`, `PUT`, and `DELETE` are generally **idempotent**.
- `POST` is generally **non-idempotent**, because sending the same `POST` request twice might create two duplicate records or charge a credit card twice in the database.

---

### 25:10 – CORS and the OPTIONS Preflight Request

Browsers enforce a strict "same-origin policy" for security, blocking web pages from making requests to a different domain than the one that served the web page.

To allow cross-origin requests, servers must explicitly permit them using CORS (Cross-Origin Resource Sharing) response headers.

For "simple" requests (standard GET or simple POST without custom headers), the browser sends the request directly. However, for "complex" requests (like those with custom `Authorization` headers, `application/json` content type, or methods like `PUT`/`DELETE`), the browser automatically generates a **preflight `OPTIONS` request** first.

This `OPTIONS` request asks the server: *"Are you allowed to accept this type of request from this origin?"*

If the server responds with the correct `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods` headers, the browser proceeds with the actual request. If not, the browser blocks the response and throws a CORS error in the developer console.

---

### 35:00 – HTTP Status Codes

Status codes provide a standardized, machine-readable summary of a request’s outcome. They are grouped into five classes:

- **`1xx` (Informational)**: Request received, continuing process (e.g., `100 Continue`).
- **`2xx` (Success)**: The action was successfully received, understood, and accepted:
  - `200 OK`: Standard success.
  - `201 Created`: New resource successfully created (common in POST).
  - `204 No Content`: Action succeeded, but no body returned (common in DELETE).
- **`3xx` (Redirection)**: Further action must be taken to complete the request:
  - `301 Moved Permanently`: Permanent redirect (cached by browsers).
  - `302 Found`: Temporary redirect.
  - `304 Not Modified`: Cached local copy is still valid (conditional request).
- **`4xx` (Client Error)**: The request contains bad syntax or cannot be fulfilled:
  - `400 Bad Request`: Malformed syntax or invalid payload.
  - `401 Unauthorized`: Authentication required or token missing/expired.
  - `403 Forbidden`: Authenticated, but lacking required permissions (RBAC).
  - `404 Not Found`: Resource does not exist.
  - `405 Method Not Allowed`: HTTP method not supported on this endpoint.
  - `409 Conflict`: Conflict with current server state (e.g., duplicate email).
  - `429 Too Many Requests`: Rate limit exceeded.
- **`5xx` (Server Error)**: The server failed to fulfill a valid request:
  - `500 Internal Server Error`: Unhandled application exception or crash.
  - `502 Bad Gateway`: Reverse proxy received an invalid response from upstream.
  - `503 Service Unavailable`: Server is overloaded or down for maintenance.
  - `504 Gateway Timeout`: Reverse proxy timed out waiting for upstream server.

---

### 45:30 – HTTP Caching

HTTP caching is a powerful feature that reduces repeat downloads, saves bandwidth, and lowers server load.

The server can instruct the client (or intermediate proxies/CDNs) to cache a response using headers like `Cache-Control` (e.g., `public, max-age=3600`).

For conditional requests, the server can provide validators:
- **`ETag`**: A unique hash representing the exact version of the resource.
- **`Last-Modified`**: A timestamp indicating when the resource was last updated.

On subsequent requests, the client sends `If-None-Match` (with the ETag) or `If-Modified-Since`. If the resource hasn’t changed, the server responds with a lightweight `304 Not Modified` status and an empty body, instructing the client to safely use its locally cached copy.

---

### 55:15 – Content Negotiation & Compression

Clients can express their preferences to the server using specific headers:
- `Accept`: Preferred media types (e.g., `application/json`, `text/html`).
- `Accept-Language`: Preferred human language (e.g., `en-US`).
- `Accept-Encoding`: Preferred compression algorithms (e.g., `gzip`, `deflate`, `br`).

The server reads these headers and responds with the most appropriate representation of the resource. For example, if the client sends `Accept-Encoding: gzip`, the server will compress the response body before transmission, significantly reducing transfer size and speeding up round-trip time.

---

### 1:05:00 – Persistent Connections & Large Transfers

In early HTTP (`HTTP/1.0`), a new TCP connection was opened and closed for every single request, which created massive TCP handshake and slow-start overhead.

`HTTP/1.1` introduced **persistent connections (Keep-Alive)** by default. This allows multiple requests and responses to be sent sequentially over a single, reused TCP connection, drastically reducing latency.

For large transfers, HTTP supports **chunked transfer encoding**. Instead of waiting for the entire file or report to be generated in memory, the server can stream the response body in sequential chunks, allowing the client to start processing data immediately.

---

### 1:12:00 – HTTP Versions & HTTPS/TLS

HTTP has evolved to solve modern web bottlenecks:
- **HTTP/1.1**: Persistent connections, chunked transfer encoding, pipelining (limited).
- **HTTP/2**: Introduced **multiplexing** (multiple requests/responses interleaved concurrently on a single TCP connection), binary framing, and header compression (**HPACK**). Eliminates head-of-line blocking at the HTTP layer.
- **HTTP/3**: Replaces TCP with **QUIC over UDP**. Eliminates TCP head-of-line blocking, accelerates connection establishment (0-RTT), and survives network changes (e.g., switching from Wi-Fi to mobile data) without dropping active streams.

#### Security: HTTPS & TLS
SSL is obsolete. Modern secure web traffic uses **TLS (Transport Layer Security)**. HTTPS is standard HTTP running over an encrypted TLS channel, providing:
1. **Encryption**: Prevents eavesdropping on payloads and headers.
2. **Integrity**: Prevents man-in-the-middle packet tampering.
3. **Authentication**: Uses digital X.509 certificates to verify that the client is communicating with the legitimate server.

---

### 1:17:00 – Summary

To wrap up, HTTP is the foundational language of the web. Its stateless, client-server architecture, combined with rich metadata in headers, well-defined methods, and status codes, gives backend engineers a predictable, scalable, and powerful tool to build distributed systems.

Understanding HTTP at this depth is not optional; it is the absolute starting point for everything else we will build in this series.
