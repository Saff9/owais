---
title: "3. What is a Backend, how do they work and why do we need them?"
description: "Traditional server definitions, DNS resolution, AWS security groups, reverse proxies with Nginx, browser execution vs server runtimes, and why centralized backends are mandatory."
order: 3
duration: "5 min read · 17 min video"
videoUrl: "https://youtu.be/6Ss4dJD9Kzg"
youtubeId: "6Ss4dJD9Kzg"
tags: ["Backend Architecture", "First Principles", "Reverse Proxy", "Nginx", "DNS", "Security Groups", "Sriniously"]
publishedAt: "2026-11-19"
diagramType: "none"
status: "published"
---

## 🎬 Verbatim Transcript & Visual Study Guide

### 00:00 – What is a Backend? (The Traditional Definition)

Let’s picture it. A backend, in its traditional definition, is a computer which is listening for HTTP, or WebSocket, or gRPC, or any other kind of request through an open port, whether it is 80 or 443, which is accessible over the Internet.

So that clients or other frontends can connect to it, send data to it, or receive data, depending on the kind of request. It is called a "server" because it serves content. It can serve static images, JavaScript files, HTML files, or JSON. And it also accepts data submitted by those clients.

The core responsibility of a backend is data: fetching data, receiving data, persisting data, and performing actions based on that data.

---

### 01:30 – The End-to-End Request Flow (Live Demo)

Let’s look at how a request actually travels. I have a demo set up here.

1. **Browser Request**: The browser issues a request for a specific domain or subdomain.
2. **DNS Resolution**: The DNS server resolves that domain name. In this case, an "A record" maps our backend demo subdomain to the public IP address assigned to an AWS EC2 instance.
3. **Public Network Transit**: The request travels over the internet and reaches that cloud instance.
4. **AWS Security Group**: Before it even touches the instance, it hits the AWS security group, which acts as a firewall.
5. **Reverse Proxy (Nginx)**: If the firewall allows it, the request reaches Nginx, which is acting as a reverse proxy on the instance.
6. **Internal Forwarding**: Nginx receives the request and forwards it to the appropriate local port. In our backend example, it proxies the traffic to `localhost:3001`, where our Node.js server is running.
7. **Processing & Response**: The Node server processes the request, generates the response, and sends it back to Nginx, which then forwards it back to the client (the browser).

---

### 04:00 – DNS and Firewall (Security Groups)

Let’s break down those first few hops. DNS is what connects a readable domain name to a network destination. Without DNS, you’d have to type in raw IP addresses.

Once the request hits the AWS infrastructure, the security group is the first line of defense. It must explicitly allow ports 80 (for HTTP) and 443 (for HTTPS). If those ports are not allowed in the security group rules, AWS will block the traffic right there, and the request will never even reach the Nginx server or the application running inside the EC2 instance.

---

### 06:00 – The Reverse Proxy (Nginx & Certbot)

Now, what is Nginx doing here? Nginx is acting as a reverse proxy. A reverse proxy is a server positioned in front of other servers.

In this configuration, Nginx listens for traffic addressed to our specific domain. It handles a few critical jobs:
- **Traffic Redirection**: It can redirect traffic (for example, forcing all HTTP port 80 traffic to redirect to secure HTTPS port 443).
- **SSL/TLS Termination**: It uses tools like `certbot` to automatically provision and renew SSL/TLS certificates, ensuring the connection is encrypted.
- **Internal Routing**: It routes the traffic to the correct internal application. For the backend, it sends it to `localhost:3001`. We also have a frontend running on this same machine, and for that domain, Nginx routes the traffic to `localhost:3000`.
- **Process Management**: We use a process manager like `pm2` to keep the Node.js processes running reliably in the background.

---

### 08:00 – The Frontend Flow (Browser Execution)

Let’s contrast this with the frontend. When you load the frontend application, the browser flow looks like this:
1. It fetches the initial HTML document from the server.
2. It reads that HTML and makes separate network requests for the JavaScript, CSS, fonts, and images referenced in it.
3. Once the JavaScript loads, it "hydrates" the page and sets up event listeners.

The key difference here is the **runtime environment**. Frontend code is downloaded and executed by the browser (the client-side runtime). Backend code executes on the server, and only the results are sent to the client.

---

### 10:00 – Why We Need a Backend (The "Like" Button Example)

Why can’t we just do everything in the browser? Why do we need a backend at all?

Let’s take a real-world example: clicking the "Like" button on an Instagram post. When you click "Like", your phone or browser sends a request to the server. The server then:
1. Authenticates and identifies who is performing the action.
2. Persists that "like" action into a central database.
3. Identifies the owner of the post.
4. Triggers a downstream action, like sending a push notification to the post owner.

This centralization is absolutely required. If this logic lived in the browser, every single client would have to hold the global application state, know about every other user, and have direct access to the database. That is impossible to scale and deeply insecure. The backend’s job is to be the **single source of truth** that coordinates actions across different users and devices.

---

### 13:00 – Why Backend Logic Can’t Simply Run in the Browser

There are four fundamental reasons why backend logic cannot and should not run in the browser:

#### 1. Security and Sandboxing
Browser runtimes are heavily sandboxed environments. They are isolated from the operating system, the file system, and environment variables. This is a security feature to prevent malicious remote code from accessing a user’s local files or sensitive data. Backends, however, need access to the file system (for logs, reading environment variables, etc.), which browsers intentionally restrict.

#### 2. CORS Restrictions
Browsers enforce Cross-Origin Resource Sharing (CORS) policies. They will block cross-origin requests unless the target server explicitly provides the correct CORS headers. A backend server does not have this restriction and can freely call any external API or service.

#### 3. Database Access and Connection Pooling
Server runtimes have access to native database drivers (like `pg` for PostgreSQL or the official MongoDB driver). These drivers handle low-level socket connections, binary data parsing, and, most importantly, **connection pooling**. A backend maintains a pool of persistent database connections to efficiently handle thousands of concurrent requests. If every single client browser opened its own direct database connection, the database would be instantly overwhelmed and crash.

#### 4. Client Compute Limits
User devices vary wildly. Someone might be on a high-end desktop, while someone else is on a low-spec smartphone with a poor battery. Offloading heavy business logic, complex calculations, or large data processing to the client leads to lag, crashes, and a terrible user experience. Centralized backend servers, on the other hand, can be scaled vertically (bigger machines) or horizontally (more machines) to handle massive loads predictably.

---

### 16:00 – Summary & Core Responsibilities

To wrap up, a backend is a computer listening on open ports, serving content, and accepting data. Its central responsibility is data management: fetching, receiving, persisting, and acting upon that data in a secure, centralized environment.

It bridges the gap between the user’s browser and the persistent state of the application, ensuring that actions like "liking a post" are securely recorded and properly routed to the right people.

In the upcoming videos, we will dive much deeper into the mechanics of the request/response cycle, HTTP protocols, and how routing actually directs these requests to the right place.
