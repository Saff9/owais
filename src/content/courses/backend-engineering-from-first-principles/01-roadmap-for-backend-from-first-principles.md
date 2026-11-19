---
title: "1. Roadmap for backend from first principles"
description: "The complete architectural roadmap for mastering backend engineering from first principles. High-level request lifecycle, HTTP semantics, routing, serialization, auth, middleware, databases, caching, and production resilience."
order: 1
duration: "18 min read · 31 min video"
videoUrl: "https://youtu.be/0Rwb4Xmlcwc"
youtubeId: "0Rwb4Xmlcwc"
tags: ["Backend Architecture", "First Principles", "System Design", "HTTP", "Roadmap", "Sriniously"]
publishedAt: "2026-11-19"
diagramType: "none"
---

## 🎬 Verbatim Transcript & Visual Study Guide

### 00:00 – Mastering Backend Engineering: Beyond CRUD APIs

Backend engineering is a very wide scope, and when I say backend engineering, it is much more than building a set of CRUD APIs. The way I think backend engineering is about building reliable, scalable, fault-tolerant, and maintainable codebases and efficient systems.

If one were to start today to learn backend development, there are a lot of resources—at least 100,000 resources—but how do you decide what to learn? How do you prioritize? How do you see the big picture of when and how all these different concepts come together? This is the reason it takes people years to get their head around a lot of these concepts and principles, because people primarily start with a limited scope of training, whether it is from a college, a boot camp, or a simple online course, and they eventually build on top of that with trial and error and with the help of other developers over time.

Now, I am a backend engineer, and I have faced this struggle initially. When I started out, I had to constantly search for resources, learn from other developers, read a lot of books on backend development, and study hundreds of open-source codebases to see how people in the industry are building stuff. It was a very time-consuming procedure.

The second problem is people start with backend development from a particular language or framework's point of view. It could be Express, Spring Boot, or Ruby on Rails. The problem with that is you look at the problems that you solve with the lens of your particular language and ecosystem, and there are blind spots in that. Let’s imagine you have to switch to a different language. Let’s say you were working with Ruby on Rails for years, and one day your company decided to migrate to Golang for performance reasons. In that situation, how much of your knowledge can you transfer if you don’t understand the underlying systems?

So here, I have decided to put together a comprehensive list of videos which are based on foundational concepts of a backend system, and these are from various books that I’ve read over the years and open-source codebases.

---

### 02:22 – High-Level Understanding

We’ll start with a very high-level understanding of how backend systems work behind the scenes. We’ll look at how a request from a browser flows through different hops, the network, firewalls over the internet, and how it is routed to our backend server that is situated in a remote AWS server, and how it responds to that request. We’ll look at what the response looks like, and that should give us a pretty vivid idea of how systems communicate, how a client communicates with a server, and how the server responds.

```text
[ Browser / Client ]
        │
        ▼ (DNS Resolution)
[ Edge CDN / WAF Firewall ]
        │
        ▼ (Internet Gateway / VPC Hops)
[ Load Balancer (ALB / Nginx) ]
        │
        ▼ (Reverse Proxy / Port Routing)
[ App Server (Node / Go / Python) ]
        │
        ▼
[ Database & Cache Services ]
```

---

### 02:51 – HTTP Protocol

From there, we’ll move to the HTTP protocol, understanding the HTTP protocol, what is the role it plays, and how the communication is established through HTTP, and how HTTP raw messages look like. What are the HTTP headers? What is the role of the headers? The different types of headers like request headers, representational headers, general headers, and security headers.

We’ll look at different types of HTTP methods like GET, POST, PUT, DELETE, and when to use them, and what are the semantics and what are the principles behind them. We’ll look at what the CORS flow is and how it works. We’ll look at how a simple request differs from a pre-flight request, and how a pre-flight request looks like from our browser to the server and back to our browser.

We’ll look at HTTP responses, the structure of it, and different status codes that the server returns, and when to return which type of code, and what are the most commonly used HTTP status codes. Then we’ll look at HTTP caching, what are the different types of caching techniques using HTTP (we have ETags, we have max-age headers). Then we’ll look at the differences between HTTP 1.1, HTTP 2.0, and HTTP 3.0, and what are the differences between them. We will look at how content negotiation looks like between client and server using different headers. We’ll see how persistent connections work in HTTP. We’ll look at HTTP compression, different types of compression techniques like gzip, deflate, and BR, and which is the commonly used technique. We’ll see the security aspect of it: SSL, TLS, and HTTPS.

---

### 04:25 – Routing

Then we’ll move on to routing: how routing maps URLs to server-side logic, and what is the connection between routing and HTTP methods. Different components of routes like path parameters and query parameters. Different types of routes: static routes, dynamic routes, nested routes, hierarchical routes, catch-all wildcard routes, and regular expression-based routes.

How to do API versioning using HTTP, different types of versioning techniques. We’ll see what is the best way to deprecate it and what are the best practices in the industry. We look at the benefits of route grouping and how it helps with versioning, permissions, and shared middleware. We’ll see how to secure routes and how to optimize route matching performance.

---

### 05:04 – Serialization and Deserialization

Then we’ll move on to serialization and deserialization. This basically means how, before sending it over to the network, our server translates the data into a particular format, and after receiving the data from the client over the internet, how it translates the data received from the client over the internet to its own native format; that is called deserialization.

We will see what is the need of it and how it helps with interoperability standards. The different formats that are used in serialization/deserialization: we have text-based formats which are JSON or XML, we have binary formats which is Protocol Buffers, and what are the performance differences between these two and when to use which one.

We’ll look at how different programming languages implement serialization and deserialization. We will explore a popular text-based format for serialization and deserialization which is JSON: the structure of JSON, the different data types like strings, numbers, booleans, arrays, and objects; how serialization of nested objects and collections are handled in JSON; how deserializing into native data structures works (like in Python dictionaries, Golang structs, or JavaScript objects).

What are the common errors while dealing with JSON, like handling missing or extra fields, dealing with null values, or date serialization issues and time zone issues, and how to implement custom serialization before sending or serializing data into JSON. We’ll look at error handling in serialization/deserialization, for example, invalid data, data conversion errors, unknown fields. Look at the security concerns like injection attacks, why to do validation before deserialization, and validating JSON schemas before processing data using JSON schema validation.

We’ll see the performance aspect of it, like reducing the serialized data through compression and eliminating unnecessary fields. Like serialization performance between text-based and binary formats (JSON versus Protobuf), the trade-offs between readability and performance, because in text-based format you can easily check the payload, and see that does not work the same in binary formats, but binary formats are faster. So when you use a binary format and when you use a text-based format, that is a valid trade-off.

---

### 07:13 – Authentication and Authorization

Then we’ll move to authentication and authorization. Why do we use it? Different types of authentication like stateful, stateless. We have basic authentication, bearer token authentications. We’ll look at sessions, JWTs, cookies. We’ll deep dive on the OAuth protocol and OpenID Connect. We’ll see how API keys work, how multi-factor authentications work, what is salting, hashing, and different cryptographic techniques used in authorization. We’ll explore RBAC, ReBAC, ABAC.

We’ll look at what are the best practices in security, like securing cookies, avoiding CSRF, XSS, MitM. Like audit logging, which basically means recording authentication/authorization events for audits, and monitoring failed login attempts, privilege escalation, and access to sensitive resources. We’ll look at obfuscating authentication-related error messages, preventing information leakage to attackers through detailed error messages, like handling edge cases. For example, consistency in responses across different failure modes, like rate limiting and account lockout. We’ll see how to avoid timing attacks. For example, attackers can exploit time differences in error responses to infer valid credentials. For example, an error for a wrong password might take longer than an error for a valid username, because to check for a password you have to do some kind of hashing or some kind of cryptographic technique which takes a little bit of time. So people can guess the tiny bit of timing difference between them and guess passwords. Even though that’s very difficult, we don’t want to keep any security holes.

---

### 08:45 – Validation and Transformation

Then the next topic we’ll explore is validation and transformation. The different types of validation: like syntactic validation (for example, checking whether a string is an email or not, whether it is a valid phone number or not, or whether it is a valid date format or not). There is semantic validation (for example, a date of birth cannot be in the future, or the age of a person should be between 1 and 120; these are called semantic validations). Then we have type validation (for example, checking the input values match expected types: whether it is a string or not, whether it is an integer or not, whether it is an array or not, whether it is an object or not). These types of checks are called type validation.

We’ll see what are the best practices for validation. What is the difference between client-side validation and server-side validation? The importance of server-side validation even if client-side validation is already implemented, because client-side validation improves user experience by providing instant feedback, but server-side validation is the true security implementation because that is the gateway to your business logic.

We’ll look at the importance of failing fast by reducing unnecessary processing by returning early, and we’ll look at why to keep consistency between front-end validation and backend validation. Then there is transformations, for example, type casting: converting string to number or number to string, because in query parameters or path parameters, whatever we receive is a string, but let’s say we are expecting an ID field which is a number, so before we send it to our handlers we have to convert that string into a number. So that step is called a transformation which we have to take care of in our validation pipeline. And different date formats, for example, the front-end might send a different format or we might be expecting a timestamp, so that also has to be taken care of in the validation pipeline.

Then there is normalization, for example, converting an email to lowercase, or trimming whitespace from a string, or adding a country code to a phone number. These are called normalizations. Then there is sanitization for security issues. For example, we have to sanitize a string that is submitted by the user to prevent attacks like SQL injection.

Then there is complex validation logic. For example, relationships: let’s say a user submitted a form and it has two fields, one is password and another is confirm password, so we have to check whether the two strings are the same or not. So that is a relationship-based validation. Then there is conditional validation. So let’s say in the form there are two fields, one is partner name and the second is "married" which is a boolean true or false. So a partner field might only be required if "married" is true. So that is a conditional validation. So these kinds of checks we have to do. Then there is chain validation, like converting a string to lowercase, then removing special characters, and then checking its length.

Then we’ll look at error handling in validation, like sending meaningful error messages to the front-end so that the user can fix them, and aggregating all validation errors in one response for client-side display, or obfuscating error messages. So instead of saying "invalid password", we’ll have to say "invalid credentials" to prevent different types of attacks. Then we will see how to gracefully handle failed transformations, for example, an invalid JSON and a failed date conversion, and how to let the user know in a meaningful message. Then we’ll look at the performance trade-offs of validation and how to optimize it by returning early, avoiding redundant validations.

---

### 12:03 – Middleware

Then our next topic is going to be middleware. We’ll look at what is a middleware and when to use them, what are the common use cases of middlewares, the role of a middleware in a request cycle (for example, a pre-request middleware or a post-response middleware). The flow of middlewares, for example, techniques like chaining: a middleware is executed in a sequence, passing control to the next middleware until the request reaches its final handler.

How to order middleware appropriately. For example, we have to go in this order: we have to log the request, we have to check whether the user is authenticated or not, we have to do validation, and we have to do route handling, and then we have to do error handling. So this order matters in middleware flow. We’ll see how the next function works in middleware and exiting middleware early, how middleware can short-circuit the request pipeline by handling 404 errors.

We’ll look at some of the common middlewares: like security middlewares which add security headers like X-Content-Type-Options or Strict-Transport-Security or Content-Security-Policy, or middlewares which add appropriate CORS headers to every single request or response, and middleware to avoid CSRF attacks, middleware to rate limit. Then we have authentication middleware to reuse the route-protecting logic across our apps. Then we have logging and monitoring middlewares for request logging or structured logging for observability or easier debugging in production. Then we have error handling middlewares which catch and format application-level errors for consistent API responses. Then we have compression or performance-related middlewares which basically compress response bodies to reduce the size of data sent over the networks. Then we have data-parsing middleware, parsing incoming request bodies like JSON, URL-encoded forms, and file uploads, handles multipart data for the file uploads.

Then we’ll look at the performance and scalability aspect of middleware, like what are the best practices to keep middlewares lightweight and efficient, ensuring middleware is applied in the correct order, or how middleware order can affect the performance and security of the application.

---

### 14:03 – Request Context

The next topic is going to be request context. Request context basically means the metadata that is often passed through application middlewares, controllers, and services. It is kind of a request-scoped state, right? The state is only valid for that request.

So here we’ll explore the lifecycle of a request, maintaining state for the duration of a request, sharing data across different layers of the application without coupling, how context provides a temporary request-scoped state. We look at what are the different components of a request context: the request metadata (for example, the HTTP method, the URL, headers, the query parameters, and the body), and there is the session and user information (for example, in the authentication middleware we fetch the user information and then we add it to the request context, so for that request scope the user's information is injected into the context). Then we have tracking and logging information like unique request IDs or Trace IDs. Then we have request-specific data like custom data injected during the request lifecycle, like caching data, permission checks.

We’ll look at what are the use cases, for example, authentication, rate limiting, tracing, logging. We’ll explore the connection between middlewares and request contexts. We’ll see what are the different types of timeouts: request timeouts, custom timeouts, cancellation signals. We’ll see what are the best practices, like keeping it lightweight to prevent memory overhead, ensuring context data is cleaned up after the request lifecycle to prevent memory leaks, avoiding tightly coupling components through context, or over-relying on it for passing data.

---

### 15:28 – Handlers, Controllers, and Services + CRUD Deep Dive

Then we’ll move to handlers and controllers, the MVC pattern, and what handlers, controllers, and services are, the responsibilities of all of them, and reducing code with middleware. Then we have centralized error handling in handlers and consistent success and error message formats, and how to implement them in controllers.

Then we’ll look at the different types of CRUD operations, like how CRUD operations map to HTTP methods and what are the common APIs associated with each method. For example, POST method is usually used for creation and submissions, and the status code is usually 201 Created or 400 if it’s a bad request. GET requests are usually associated with fetching a list of resources or fetching a single resource. And we have PUT and PATCH to update resources, and DELETE to delete resources.

We look at how to implement pagination, and how to implement a search API, how to do sorting, and how to do filtering. And we’ll see what are the best practices, for example, strict validation, consistent response formatting, limiting payload, redacting sensitive fields, error handling, authentication, and authorization.

Then we’ll explore what is the RESTful architecture and what are the best practices for implementing REST APIs: the principle of designing APIs around resources and sticking to HTTP semantics, best practices for filtering and pagination, what are the different types of versioning like URI versioning, header versioning, query string, media type. We’ll see how to design APIs with OpenAPI spec in mind. You’ll see content negotiation, capturing exceptions and providing meaningful messages, supporting client-side caching (ETags), and optimizing large requests and responses.

---

### 17:08 – Databases

After that, we’ll move on to a very important topic, which are databases. We’ll look at relational and non-relational, what are the differences, and when to use which. We look at some of the theoretical concepts like ACID and CAP theorem. We’ll take a look at basic querying and joins, and database design best practices like schema design, indexing. We look at different optimization methods like query optimization, caching, connection pooling. Then we have data integrity, like constraints and validations, transactions, and concurrency. We’ll see how ORMs work, whether to use an ORM, what are the trade-offs, and we’ll look at what are database migrations.

---

### 17:44 – Business Logic Layer (BLL)

Then we’ll move on to the business logic layer, which is also called BLL. What is the role of it? What are the different layers of a request cycle? For example, we have the validation layer, we have routing, we have middlewares, and we have handlers and controllers, which all of them fall under the presentation layer because they deal with user data, whether it is accepting user data or sending user data. So those are part of a presentation layer.

After that, we have the business logic layer, which is the middle one, which deals with our core business logic. And after that, we have the data access layer, which deals with databases, performing querying or inserts or deletions, and the business logic layer uses the data access layer behind the scenes.

We’ll look at different design principles like separation of concerns, single responsibility, open-closed, dependency inversion. What are the components of a business logic layer? For example, we have services, we have domain models which represent core entities like a user or an order, then we have business rules, then we have business validation logic. We’ll look at service layer design best practices, we’ll look at how to handle errors properly, and how to propagate those errors from our service layer to our presentation layer.

---

### 18:51 – Caching

After that, we have caching. We’ll discuss what is the need of caching and how it differs from database persistence. What are the different types of caching? We have memory caching, browser caching, database caching, and what is the need of client-side caching and server-side caching.

The different caching strategies, for example, cache-aside, read-through, write-through, write-behind. The different cache eviction strategies, for example, LRU, LFU, TTL, and FIFO. Need for cache invalidation, like manual cache invalidation, time-to-live invalidation, or event-based invalidation. The different levels of caching: level one which is in-memory, level two which is network-distributed, and there is hierarchical caching which combines level one and level two caching strategies, where frequently used data is stored in a fast, small cache (which is the level one cache), and the less frequently used data is stored in a slower or larger cache (which is the level two cache).

We’ll see how caching for web apps looks like, that is caching static assets or caching API responses using headers. We’ll see how to cache with databases, for example, query caching, like storing the results of heavy joins in Redis, and look at cache hit and cache miss ratio and how to optimize them.

---

### 20:04 – Transactional Emails, Task Queuing, and Scheduling

After that, we’ll move on to transactional emails. What are the use of them? What are the common use cases? The anatomy of a transactional email: the subject, the preheader, the body, header, main content, CTA, footer, and how to personalize with different dynamic parameters.

Then we have task queuing and scheduling. What are the common use cases? For example, queuing might be used for sending emails or processing image files, and third-party API integration like payment processing or webhooks, or offloading heavy computation like batch processing. For example, a user clicks a button to "clear all my data". So to clear all the user's data, we have to execute different queries for different tables to clear all the user's data, and that might take some time. So instead of blocking the request, we return the response instantly and we trigger a background job by pushing into the task queue.

We’ll look at scheduling, what are the use cases, for example, running database backups, recurring notifications and reminders, data synchronization, or maintenance-related issues, for example, clearing logs or caches. The different components of a task queue: there is the producer, queue, consumer, broker backend. The flow of a task dependency, for example, it might be chain dependency or it might have a parent-child relationship. We look at task groups, executing multiple tasks concurrently and waiting for all of them to complete at the same time. We look at how to handle errors and implement retries in task queues. We’ll look at task prioritization and rate limiting, for example, giving importance to tasks like payment processing before you process tasks like sending notifications.

---

### 21:35 – Elasticsearch

After that, we’ll move on to Elasticsearch. Why do we use Elasticsearch and how does it work behind the scenes? The different techniques that are used, for example, inverted index, term frequency, and inverse document frequency, segments, and shards.

What are the use cases of Elasticsearch? For example, providing a type-ahead experience, or log analytics, or social media search, for example, full-text search for user profiles, posts, comments. We’ll see how to create and manage indexes. We’ll see how to search and query, different types of searching: basic searching, full-text search, relevance scoring. We’ll see how to optimize search performance by tweaking text versus keyword fields, understanding analyzers and boosting, and pagination. We’ll take a look at some of the advanced search patterns, for example, filtering, aggregation, fuzzy search. Then we’ll see how Kibana works and how to use Elasticsearch in a user-friendly way, and different best practices, for example, defining field mappings explicitly, optimizing the number of shards, indexing data in batches, and avoiding wildcards.

---

### 22:33 – Error Handling

Then we have error handling. The different types of errors in our apps could be syntax errors, runtime errors, logical errors, and different error handling strategies, for example, fail-safe or fail-fast, graceful degradation, or prevention of errors.

Different practices for error handling, for example, catching early, not swallowing errors, custom error types, failing gracefully, logging errors, and using stack traces. We’ll look at how global error handlers work. We’ll see how to appropriately handle user-facing errors, like providing friendly error messages and providing actionable feedback. We’ll see the importance of monitoring and logging in error handling, and different tools like Sentry or ELK stack, and different error alerts like email-based alerts and Slack-based alerts.

---

### 23:16 – Config Management

After that, we have config management. What is exactly config management and how does it help with flexibility and decouple environment-specific settings from application logic? And what are the use cases? For example, different environments using config management, safely managing sensitive data such as API keys, database passwords, and private certificates, dynamically enabling and disabling features without changing the codebase.

What are the best practices of config management? Different types of configs, for example, static configs like DB credentials and API endpoints, dynamic configs like feature flags, rate limits, and sensitive configs like credentials, tokens, secrets. And different sources of configs, for example, it could be .env file or JSON or YAML, and what are the differences between using environment variables versus command-line flags versus static files.

---

### 24:07 – Logging, Monitoring, and Observability

After that, we have logging, monitoring, and observability, a very important topic. We’ll see what are the differences between logging, tracing, monitoring, and observability. The different types of logging, like system logging, application, access, security logs. The different levels of logs, like debug, info, warning, error, fatal, and we’ll see the difference between structured logging and unstructured logging.

And the best practices for logging, like centralized logging, log rotation and retention, contextual and meaningful logs, and avoiding sensitive data like passwords and API keys. Then we will look at monitoring, different types of monitoring like infrastructure monitoring, application performance monitoring, uptime monitoring. The different tools that are used in monitoring, like Prometheus, Grafana, and how to manage alerts and notifications by defining thresholds, creating alerts, and avoiding alert fatigue by only creating actionable alerts and ensuring that alerts are meaningful and necessary.

Then we’ll take a look at observability, the three pillars of observability which are logs, metrics, and traces, the best practices around it, the security and compliance of log management.

---

### 25:13 – Graceful Shutdown

After that, we’ll move on to graceful shutdown. Why do we need graceful shutdown and how does it work behind the scenes? What are the different use cases? For example, you might need it when server restarts or scaling in cloud environments or microservices or long-running jobs.

How it works, like signal handling (SIGTERM, SIGINT, and SIGKILL signals). What are the different steps of graceful shutdown? For example, it starts with capturing a signal, and then it stops accepting new requests, then it completes in-flight requests, and then it closes external resources like database connections or any open files, etc., and at last, it terminates the app.

---

### 25:50 – Security

After that, we’ll move on to security. The different aspects of security in a backend codebase: avoiding different security attacks like SQL injection, NoSQL injection, XSS, CSRF, broken authentication, insecure deserialization. And principles of a secure software design, for example, least privilege, defense in depth, fail-secure defaults, separation of duties, security by design.

Then we’ll look at the importance of input validation and sanitization, and rate limits, and content security policy, CORS, and same-site cookies, and the importance of monitoring events.

---

### 26:23 – Scaling and Performance

After that, we have scaling and performance. The different metrics of performance, like response time, resource utilization, identifying bottlenecks. Caching and database optimization, for example, avoiding N+1 query problems and ensuring proper use of joins, and using lazy loading where appropriate. Then we have using database indexes to speed up read operations on frequently queried fields, like indexing foreign keys or search fields.

How to process data in batches to minimize database load and improve performance for large data sets. How to avoid memory leaks, like closing file handles, database connections, or cleaning up after a long process. Minimizing network overhead by reducing payload size and using compression. We’ll look at how to do performance testing and profiling.

We look at some of the best practices for writing performant code, like focusing on writing clear and maintainable code first without premature optimization, and writing modular code to make it easier to optimize individual components without affecting the entire system. Ensuring that if a particular resource under load is unavailable, the system degrades gracefully without crashing, and how to offload non-critical tasks like sending emails or logging to background processes or task queues to free up resources for more critical operations.

Then we have concurrency and parallelism. What are the differences between concurrency and parallelism, and how concurrency helps in I/O-bound tasks and how parallelism helps in CPU-bound tasks.

---

### 27:46 – Object Storage and Large Files

Then we have object storage and large files. We’ll look at some of the common use cases when we use object storage, like AWS S3, and how to manage large files with chunking and streaming, and we’ll look at multipart file uploads.

---

### 27:59 – Real-time Backend Systems

Then we have real-time backend systems, where we take a look at WebSockets, or Server-Sent Events, and Pub/Sub architecture.

---

### 28:06 – Testing and Code Quality

After that, we have testing and code quality. Here we take a look at different types of testing: unit testing, integration testing, end-to-end testing, functional testing, regression testing, performance testing, load and stress testing, user acceptance testing, security testing.

We’ll take a look at what is Test-Driven Development (TDD), how to automate tests in CI/CD environments, how to manage code quality with external linting and formatting tools, and what are the measures of code quality and coverage, like quality metrics like cyclomatic complexity (which measures complexity of a function by counting the number of possible paths through the code), and we have maintainability index, which basically quantifies how easy it is to maintain a codebase based on complexity, lines of code, and other factors. Then we’ll take a look at a very interesting set of 12-Factor App principles.

---

### 28:55 – OpenAPI Standards

After that, we’ll move on to OpenAPI standards. What is the need for these standards and why should we stick to it? What are the benefits of it? What are the use cases, like documentation, automation, and the ecosystem surrounding it, like Swagger, Codegen, Postman? And what is the history, the Swagger to OpenAPI transition, and what are the different versions that are currently active?

What are the key concepts of OpenAPI documents? For example, there are API paths, the request and response definition, there are parameters, there are schemas, and what is the structure of an OpenAPI document (there is metadata, there are paths, there are components, there are security definitions, and there are responses). We’ll see what are the new features of OpenAPI 3.0 and 3.1, what are the tools surrounding OpenAPI (for example, Swagger UI, Codegen, Postman), what are the best practices (like avoiding duplication and sticking to standards). We’ll look at a very interesting development method which is API-First Development, where you define your OpenAPI standard or write your OpenAPI spec first, and then you start creating the APIs.

---

### 29:58 – Webhooks

After that, we’ll move on to webhooks. What are the use cases of webhooks, like sending notifications, third-party integrations? What are the differences between API versus webhook for the same use case? For example, for an API we might have to use polling, which is client-side initiated, compared to webhooks which is pushing, which is server-initiated.

What are the key components of webhooks? For example, the webhook URL, event triggers, payload, HTTP method, the response handling. What are the best practices surrounding webhooks, like webhook signature verification, like using HTTPS, and retry logic, logging, how to test webhooks with ngrok, real-world use cases like Stripe Payment Processing, GitHub webhooks, Slack, Discord, Twilio, etc.

---

### 30:39 – DevOps for Backend Engineers

And at last, we’ll take a look at DevOps for backend engineers. What are some DevOps concepts a backend engineer should be familiar with? For example, some of the core concepts like continuous integration, continuous delivery, continuous deployment. The DevOps practices like infrastructure as code, config management, version control.

The different tools surrounding DevOps, for example, creating containers with Docker, or orchestrating containers with Kubernetes, and CI/CD pipelines. And how to scale your service: horizontal scaling versus vertical scaling, and different deployment strategies like blue-green deployment, rolling deployment, etc.
