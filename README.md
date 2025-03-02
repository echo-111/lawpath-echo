# Next.js Address Validator with Apollo Server & Client

## Project Overview

This project is a **Next.js 15** application that provides an **address validation form** using **Apollo Server** and **Apollo Client**. Users can input a **postcode, suburb, and state**, and the form will validate them against the **Australia Post API**.

### **Try Demo here:** [Live Demo](https://lawpath-echo.vercel.app/)

## Features

- **Next.js 15** with the **App Router**.
- **Apollo Server** hosted inside Next.js API routes.
- **Apollo Client** for querying the GraphQL API.
- **Unit and Integration Testing** using Jest and React Testing Library.

---

## Installation & Setup

### **1️ Clone the repository**

```bash
git clone https://github.com/echo-111/lawpath-echo.git
cd lawpath-echo
```

### **2️ Install dependencies**

```bash
npm install
```

### **3️ Set up environment variables**

Create a `.env` file in the root folder and add the following:

```bash
NEXT_PUBLIC_API_URL=https://gavg8gilmf.execute-api.ap-southeast-2.amazonaws.com/staging/postcode
NEXT_PUBLIC_API_KEY=Your Key
```

### **4️ Run the development server**

```bash
npm run dev
```

The app should now be available at `http://localhost:3000`

---

## Running Tests

```bash
npm run test:client
npm run test:server
```
