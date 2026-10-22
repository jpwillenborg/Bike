# Frontend Client - Mountain Bike Suspension Workbench

A Single Page Application (SPA) built with React and compiled via Vite. Rendered assets are hosted on an Apache production server utilizing an absolute base path model on a dedicated subdomain. Internal layouts rely on Tailwind CSS v4 for fluid, mobile-first breakpoints and dark-mode styling.

## ⚡ Core Technical Features

* **Asynchronous API Consumption:** Uses the native Fetch API to interface with a remote Java Spring Boot REST service running on Render, parsing real-time calculation matrices instantly.
* **Reactive State Management:** Synchronizes calculation updates and persistent database logs across subcomponents without layout flickering or blocking cycles.
* **Component Demarcation:** Highly decoupled presentation layers separating layout items, shell navigation bars, footers, form inputs, metrics counters, and log tracking panels into dedicated folders.
* **Semantic Input Structure:** Form components strictly adhere to proper browser accessibility guidelines by linking labels via unique explicit IDs and enforcing proper name properties.

## 🛠️ Stack Configuration & Primitives

* **User Interface:** React 19, JavaScript (ES6+), HTML5, CSS3
* **Bundler & Build Tool:** Vite
* **Styling Framework:** Tailwind CSS v4
* **Production Delivery:** Apache Web Server Configuration
* **Continuous Integration:** GitHub Actions Workflow Configuration

---

## 💻 Local Development Setup

The client environment is configured to point dynamically to your local development server if running on localhost, or automatically fallback onto your production Render backend if deployed to a live domain.

### 1. Pre-installation Requirements

Ensure you have Node.js (v20+) and npm installed on your development machine.

### 2. Install Dependencies

Navigate into the frontend project root folder and download the package layout primitives:

```bash
cd frontend
npm install
```

### 3. Launch Development Server

Execute the local Vite development instance to serve the client view layers:

```bash
npm run dev
```

Open your local browser to the host path output by the terminal (typically `http://localhost:5173`) to view and interact with your workbench application.

### 4. Compiling Production Bundles

To manually optimize, compress, and compile your static web files prior to production distribution, execute the bundler engine:

```bash
npm run build
```

This compiles your output directory into an optimized `./dist/` target container, perfectly formed for automated GitHub Actions FTPS deliveries or manual file transfers to your Apache public web space.
