# Mover Frontend

**Mover** is a full-stack ride-sharing application inspired by Uber, designed for the Indian market with a cash-based payment model. This repository contains the **frontend**, built with **React.js**, which provides an intuitive user interface for riders and captains to book, manage, and track rides in real-time. The frontend integrates with a backend API (Express.js) for ride operations and uses Socket.IO for real-time communication.

**[Live Demo](https://mover-frontend.vercel.app)** | [Backend Repository](https://github.com/your-username/mover-backend) | [Portfolio](https://your-portfolio-link)

---

## Overview

Mover’s frontend delivers a seamless experience for users to sign up, book rides, select vehicle types (car, motorcycle, auto), and receive real-time updates on captain assignments. Captains can accept or ignore rides, with live notifications powered by Socket.IO. The app is tailored for India, supporting cash payments to align with local driver preferences. The frontend communicates with a backend API hosted on Render and uses Google Maps API for location services.

This project showcases my skills in building responsive, real-time web applications using React.js, integrating third-party APIs, and deploying on Vercel.

---

## Features

- **User Authentication**: Secure signup and login for riders and captains.
- **Ride Booking**: Select vehicle type, enter pickup/dropoff locations with Google Maps auto-suggestions, and book rides.
- **Real-Time Updates**: Socket.IO-powered notifications for ride assignments and cancellations.
- **Captain Interface**: Accept or ignore ride requests within a 2 km radius, with OTP verification for ride confirmation.
- **Responsive UI**: Mobile-friendly design for a consistent experience across devices.
- **Cash Payments**: Supports India’s cash-preferring drivers, avoiding commission-based payment gateways.

---

## Tech Stack

- **Frontend**: React.js (Create React App or Vite)
- **Styling**: CSS (or Tailwind CSS if used)
- **Real-Time**: Socket.IO Client
- **APIs**: Google Maps API (Places, Distance Matrix)
- **Deployment**: Vercel
- **Environment Management**: `.env` for API keys and backend URL
- **Version Control**: Git/GitHub

---
