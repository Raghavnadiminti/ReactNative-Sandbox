# React-Native-Pad

React-Native-Pad is a browser-based playground to learn and experiment with **React Native**,.  
Users write React Native code in the browser, click **Run**, and instantly see the output — all without setting up anything locally.

The main goal of this project is simple:  
Make learning React Native easy, fast, and accessible directly from the browser.

---

## Project Idea

I wanted to build a platform where:

- Beginners can learn React Native by writing small examples.
- Users can build basic UI components and see live output.


But running user-written code on a server is not simple.  
It needs isolation, security, scalability, and cleanup.



---

## How I Broke Down this 

First, I needed a way to isolate each user’s code.  
For this, I chose **Docker**.  
Every time a user clicks Run, their code runs inside a separate container.  
This keeps users safe from each other and prevents server crashes from bad code.

Next, I had to show the output to the user.  
Each container needs a port, but I cannot expose unlimited ports manually.  
So I built a **custom proxy server using Node.js**.  

The flow works like this:

- User clicks Run
- Request goes to proxy
- Proxy finds a free port
- Proxy starts a container with that port
- Proxy routes user traffic to that container
- Everything logically 
To make this work smoothly, I built my own **port management system**.  
It tracks which ports are free, which are in use, and releases them when containers stop.

Users often click Run many times.  
To handle this, each user gets a unique identity using a crypto-based hash stored in browser `localStorage`.  
This helps me generate unique container names and avoid conflicts.Thinking of adding ratelimiting also here

Docker images were becoming very large, which made startup slow.  
To fix this, I used **multi-stage Docker builds**.  
Only the final required files are kept in the production image, which makes it smaller and faster.

Over time, unused containers start wasting memory and ports.  
So I created a background cleanup system using cron jobs.  
It checks Redis for the last time a user ran code.  
If a container is inactive for more than 30 minutes, it is automatically stopped, deleted, and its port is released.

For fast tracking of users, ports, and containers, I used **Redis**.  
It stores mappings like:

- user → container
- container → port
- last run time

This makes lookups instant and reliable.

Finally, I deployed everything on **AWS EC2** using Linux.  
I used two instances:

- One for proxy and Redis
- One for running Docker containers

This separation makes the system more stable and scalable.

---

## 🛠 Tech Stack

- Frontend:
  - React (browser-based editor)
  

- Backend:
  - Node.js (Proxy server)
  - Redis (State management)

- Infrastructure:
  - Docker
  - Multi-stage builds
  - Cron jobs
  - AWS EC2
  - Linux

---

---

## Related Repositories

This project is built using two main repositories:

### 1) Node.js Proxy Server  
Handles port management, container routing, Redis tracking, and cleanup logic.

- https://github.com/Raghavnadiminti/nodejs_proxyserver  

### 2) React Native Sandbox  
Frontend playground where users write code and run it in the browser.

- https://github.com/Raghavnadiminti/ReactNative-Sandbox  

---

## Features

- Browser-based React Native playground
- Isolated environment for each user
- Dynamic port assignment
- Custom proxy routing
- Redis-based tracking system
- Automatic cleanup of unused containers
- Fast startup with optimized Docker images
- Cloud deployed 

---



This project is not just about React Native.  
It is about building a real system — from frontend to backend to DevOps — and understanding how everything works together.

Built with curiosity, debugging, and lots of coffee   
— Raghavendra
