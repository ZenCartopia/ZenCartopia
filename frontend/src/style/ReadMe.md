# ZenCartopia - Full Stack E-Commerce Application

ZenCartopia is a full-stack web application built with **React** for the frontend and **Spring Boot** for the backend. It serves as an e-commerce platform that allows users to sign in, edit user profiles, browse products, manage their shopping cart, and place orders. This project demonstrates the integration of React and Spring Boot to build a complete and functional web application.

You can access the project on GitHub: [ZenCartopia](https://github.com/ZenCartopia/ZenCartopia/)

## Table of Contents

- Frontend Setup (React)
- Backend Setup (Spring Boot)
- Configuration
- Usage
- License

---

## Frontend Setup (React)

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (>= 14.x.x)
- [npm](https://npmjs.com/) (>= 6.x.x)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ZenCartopia/ZenCartopia.git
   cd zencartopia/frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Navigate to the `src` folder:**

   ```bash
   cd src
   ```

4. **Start the development server:**

   To start the frontend, run the following command:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`.

---

## Backend Setup (Spring Boot)

### Prerequisites

Ensure you have the following installed:

- [Java 11 or higher](https://openjdk.java.net/)
- [Maven](https://maven.apache.org/)
- [MySQL](https://www.mysql.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/zencartopia-backend.git
   cd zencartopia-backend
   ```

2. **Install dependencies:**

   In your IDE (e.g., IntelliJ IDEA or Eclipse):

   - **Right-click on the `pom.xml` file**, and select **Maven** -> **Download Sources**.
   - **Right-click** again and select **Maven** -> **Reload Projects** to ensure all dependencies are properly downloaded.

3. **Create the database:**

   Ensure that the MySQL database specified in `application.properties` is created before running the backend. In our case, the database name is `zencartopia`.

4. **Run the backend:**

   In your IDE, run the `ZenCartopiaApplication` class (main application class).

   The backend will be available at `http://localhost:5454`.

---

## Configuration

Before running the backend, configure the `application.properties` file located in `src/main/resources` with your database credentials and other settings.

```properties
# Spring Boot Application Name
spring.application.name=ZenCartopia

# Server Port Configuration
server.port=5454

# Logging Configuration
logging.level.org.springframework.security=DEBUG

# Security User Credentials
spring.security.user.name=vishrut
spring.security.user.password=kevadiya

# Database Configuration (MySQL Example)
spring.datasource.url=jdbc:mysql://localhost:3306/zencartopia
spring.datasource.username=root
spring.datasource.password=Root1234
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```
