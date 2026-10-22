# Full-Stack Mountain Bike Suspension Workbench Sandbox

An interactive full-stack web application featuring decoupled architecture, asynchronous server-side state persistence, and real-time biometric tuning calculation. This system functions as a portfolio engineering demonstration and does not connect to real-world suspension telemetry hardware or retain corporate manufacturing analytics.

🔗 **Live Production Deployment:** [https://bike.jpwillenborg.com](https://bike.jpwillenborg.com)

🏗️ System Architecture & Engineering
The application is structured into two entirely separate modules to preserve structural boundary isolation:

* **Frontend Client (frontend):** A Single Page Application (SPA) built with React and compiled via Vite. Rendered assets are hosted on an Apache production server utilizing an absolute base path model on a dedicated subdomain. Internal layouts rely on Tailwind CSS v4 for fluid, mobile-first breakpoints.
* **Backend Server (backend):** A RESTful Java environment utilizing the Spring Boot framework. The API manages mathematical suspension parameter calculations server-side to prevent client-side intercept tampering, interfaces directly with an embedded object-relational mapping repository layer, and exposes structured endpoints over CORS-whitelisted routes.

⚡ Core Technical Features
* **Asynchronous Calculations:** Employs a Java Spring Boot REST engine to instantly parse weight-factored algorithms and calculate custom fork and rear shock pressures without client-side lag.
* **Persistent Garage Logs:** Integrates a reactive state array management cycle on the client that hooks directly into persistent database payloads, synchronizing item creation and entry removal seamlessly across browser reloads.
* **Server-Side Validation Security:** All suspension computations, riding style pressure factors, and product component assertions are handled within isolated Spring MVC controllers prior to persistence layers.
* **Embedded Datastore Engine:** Automated configuration that spins up an isolated in-memory H2 database engine matching custom JPA/Hibernate entities, establishing standalone workspace storage without external database installation requirements.

🛠️ Stack Configuration & Primitives
* **Frontend UI:** React, Vite, Tailwind CSS v4, JavaScript (ES6+)
* **Backend API:** Java 17+, Spring Boot, Spring Web (REST)
* **Database / Persistence Layer:** H2 Embedded Memory Database Engine / Spring Data JPA (Hibernate)
* **Live Infrastructure Hosting:** Apache Linux Server (Static Frontend Assets), Render Web Service Containers (Backend Docker Service)
* **Automated CI/CD Delivery:** GitHub Actions core orchestration engine. Frontend updates pushed to the `main` branch trigger isolated Node compilation layers and distribute minimized output directories over secure automated FTPS handshakes.

---

## 💻 Local Development Setup

The application features a self-contained embedded data architecture. By default, it operates in an automated memory space using virtualized database tables, allowing reviewers to evaluate runtime engines immediately without configuring a local SQL server instance. To see the live pipeline connected to the cloud production cluster, visit [https://jpwillenborg.com](https://jpwillenborg.com).

### 1. Backend API Setup
Navigate to the backend directory, verify your Maven project parameters, and execute the Spring Boot application wrapper:

```bash
cd backend
./mvnw clean spring-boot:run
```

The database configures itself automatically at runtime inside your local system memory via the `src/main/resources/application.properties` resource sheet:

```properties
spring.application.name=bike
spring.h2.console.enabled=true
spring.h2.console.settings.web-allow-others=true
spring.datasource.url=jdbc:h2:mem:bikedb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 2. Frontend Client Setup
Navigate to the frontend directory, install assets, bind development host switches, and execute Vite:

```bash
cd ../frontend
npm install
```

Start the local client development server pipeline:

```bash
npm run dev
```
