# 📸 Photo Studio Application (DevOps Project)

## Project Overview

This is a Photo Studio web application built using Node.js and deployed using a complete DevOps CI/CD pipeline.

The main goal of this project is to automate build, test, and deployment using modern DevOps tools like Docker and GitHub Actions.

---

##  Tech Stack

* Node.js
* Express.js
* Docker
* Docker Compose
* GitHub Actions (CI/CD)
* (Optional: Kubernetes if used)

---

## ⚙️ Project Structure

```
photo-studio/
│── .github/workflows/   # CI/CD pipeline
│── models/              # Database models
│── routes/              # API routes
│── public/              # Static files
│── uploads/             # Uploaded images
│── server.js            # Main server file
│── Dockerfile           # Docker build file
│── docker-compose.yml   # Multi-container setup
│── package.json         # Dependencies
```

---

##  CI/CD Pipeline (GitHub Actions)

* Code push to GitHub triggers pipeline
* Build Docker image
* Run basic checks
* Ready for deployment

---

##  Docker Setup

### Build Docker Image

```bash
docker build -t photo-studio .
```

### Run Container

```bash
docker run -p 3000:3000 photo-studio
```

### Using Docker Compose

```bash
docker-compose up -d
```

---

## ▶️ How to Run Locally

```bash
git clone https://github.com/your-username/photo-studio.git
cd photo-studio
npm install
npm start
```

App runs on:
👉 http://localhost:3000

---

## ⚠️ Challenges Faced

* Fixed permission issues in Docker containers
* Managed environment variables securely (.env)
* Automated CI/CD using GitHub Actions

## 📊 Outcome

* Automated deployment process
* Reduced manual work
* Improved consistency and reliability

---

## 👨‍💻 Author

**Venkataramana (Venkey)

---


