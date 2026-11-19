---
title: "6. What is Routing in Backend? How Requests Find Their Way Home"
description: "Understanding backend routing: mapping HTTP methods and paths to handlers, static vs dynamic routes, path parameters, query parameters, nested resources, API versioning, and catch-all routes."
order: 6
duration: "6 min read · 24 min video"
videoUrl: "https://youtu.be/SubuU1iOC2s"
youtubeId: "SubuU1iOC2s"
tags: ["Backend Architecture", "Routing", "REST API", "HTTP Methods", "API Versioning", "Path Parameters", "Query Parameters", "Sriniously"]
publishedAt: "2026-11-19"
diagramType: "none"
status: "published"
---

## 🎬 Verbatim Transcript & Visual Study Guide

### 00:00 – Introduction to Routing: The "What" and the "Where"

In the previous video, we talked about different HTTP methods and how they are important in HTTP semantics. In a way, all these HTTP methods describe your intent—your action, what you want to do on that particular resource. You can say these HTTP methods express the **"what"** of a request.

Routing, on the other hand, expresses the **"where"**. It indicates which resource the server should interact with based on the intent defined by the HTTP method.

Each HTTP method (`GET`, `POST`, `PUT`, `DELETE`, etc.) describes an action regarding data manipulation: fetching, adding, updating, or deleting resources. Routing is the mechanism that maps that intent to the correct location on your server.

---

### 01:31 – Mapping Requests to Handlers

Backend routing is the mapping of a **URL path** and an **HTTP request method** to a specific server-side handler or set of instructions.

The combination of the HTTP method and the route path forms a **unique routing key**. This means that a `GET` request to `/api/books` and a `POST` request to `/api/books` can reach completely different handlers, even though their URL paths are identical, because the HTTP methods distinguish the requested operations:

- `GET  /api/books` ➔ `getAllBooksHandler()`
- `POST /api/books` ➔ `createBookHandler()`

Once the server finds the matching handler, it can perform authentication, business logic, database operations, and any other work required before returning a response to the client.

---

### 04:40 – Static vs. Dynamic Routes

Routes generally fall into two categories: static and dynamic.

#### Static Routes
Static routes do not contain variable parameters; they remain constant for every request. For example, `/api/books` is a static route. This consistency allows for predictable responses, as the exact same string is used whenever a request targets that endpoint, regardless of the HTTP method used.

#### Dynamic Routes
Dynamic routes include variable parameters within their paths, allowing for flexible interactions. For example:
- `/api/users/:id` (e.g., `/api/users/123`)

The server extracts these dynamic parameters from the route to perform operations, like database queries, based on the specific user ID provided in the request. A colon (`:`) commonly marks a dynamic parameter in modern server route definitions.

---

### 08:19 – Parameters in API Requests

When dealing with dynamic data, we use two main types of parameters:

#### 1. Path Parameters
Path parameters are dynamic segments of a URL embedded directly after a forward slash (e.g., the `123` in `/api/users/123`). They provide semantic clarity in REST APIs by making URLs human-readable and identifying a particular resource on which the requested HTTP action should operate.

#### 2. Query Parameters
Query parameters follow a question mark (`?`) in URLs and consist of key-value pairs (e.g., `/api/search?query=backend&limit=10`). They are used primarily with `GET` requests when no request body is present. They allow additional metadata to be sent alongside requests without altering the main route structure.

Query parameters are perfect for facilitating **pagination, sorting, and filtering** results returned by APIs, enabling clients to specify limits on data retrieval (like page numbers or sort orders) when dealing with large datasets. Placing arbitrary search values directly in the path is technically possible, but it is harder to maintain and less semantically expressive than using query parameters.

---

### 15:20 – Nested Routes for Semantic Clarity

Nested routes express relationships between resources clearly through hierarchical structures.

For example:
- `/api/users/:userId/posts/:postId`

This endpoint allows clients to fetch related data efficiently while maintaining semantic meaning throughout API calls. It clearly communicates that we are looking for a specific post that belongs to a specific user. This hierarchical mapping keeps your API organized and intuitive.

---

### 19:13 – Versioning and Deprecation in APIs

As your application evolves, your API will need to change. This is where route versioning comes in.

Route versioning involves appending version identifiers (like `v1` or `v2`) to API endpoints:
- `/api/v1/users`
- `/api/v2/users`

This facilitates changes over time without disrupting existing client applications that are still using older versions of the API endpoint format.

The benefit of versioning is that it provides clear communication about changes made between versions, while allowing developers time to transition from deprecated versions smoothly before complete removal occurs from your service offerings.

---

### 22:46 – Catch-All Routes: Handling Unmatched Requests

Finally, we have catch-all routes.

A catch-all route captures any unmatched requests at the very end of your routing logic execution. Instead of letting the server return a default, confusing null response or hanging when a user attempts to access an undefined endpoint, the catch-all route intercepts it.

This allows you to provide users with a friendly, standardized error message (like a `404 Not Found` with a helpful JSON payload) instead of a raw server crash or empty page. It’s a simple but crucial practice for building robust, production-grade APIs.
