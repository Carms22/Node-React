# LAB | Node.js + React 

## Introduction

This is a full-stack application built with Node.js, Express.js, Axios, JWT, Mongoose, npm, and React, using Vite for the frontend.

## Overview

This application provides a basic setup for building a full-stack web application using popular technologies such as Node.js for the backend, React for the frontend, and Axios for handling HTTP requests. Mongoose is used as an Object Data Modeling (ODM) library for MongoDB.

## Features

- User authentication (login, register)
- API endpoints for user management (Register, login, create-edit-delete post, create comment, like, follow, searchBar)
- Integration with MongoDB for data storage
- React frontend with a modern build setup using Vite
- Axios for making HTTP requests between frontend and backend

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **npm**: A package manager for JavaScript.
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A next-generation frontend tooling.

## Setup Instructions

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies for both the backend and frontend:
   - For the backend, navigate to the `backend` directory and run `npm install`.
   - For the frontend, navigate to the `frontend` directory and run `npm install`.
3. Start the backend server: Navigate to the `backend` directory and run `npm run dev`.
4. Start the frontend server: Navigate to the `frontend` directory and run `npm run dev`.
5. Open your browser and visit `http://localhost:5173` to view the application.

## Folder Structure

node-react-app/
├── backend/                   # Backend server files
│   ├── controllers/           # Request handlers/controllers
│   ├── models/                # Database models
│   ├── routes/                # Route definitions
│   ├── config.js              # Configuration files
│   ├── db.js                  # Database connection setup
│   └── server.js              # Backend server entry point
│
├── frontend/                  # Frontend React app
│   ├── public/                # Static assets
│   ├── src/                   # Source files
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Application pages
│   │   ├── services/          # Service modules (e.g., API requests)
│   │   ├── App.jsx            # Main React component
│   │   ├── index.jsx          # React entry point
│   │   └── ...
│   ├── package.json           # Frontend dependencies and scripts
│   ├── vite.config.js         # Vite configuration
│   └── ...
│
└── README.md                  # Project documentation
