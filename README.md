# AuraStore Spring Boot 3 & MongoDB REST API Backend

A production-ready Java 21, Spring Boot 3.x, Spring Data MongoDB, and Spring Security REST API for the AuraStore E-Commerce application.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Java 21 JDK** or later
- **Apache Maven 3.8+**
- **MongoDB 6.0+** running on `localhost:27017`

### 1. Build the Backend
```bash
cd backend
mvn clean package -DskipTests
```

### 2. Run the Application
```bash
mvn spring-boot:run
```
The server will start on `http://localhost:8080/api`.

---

## 📖 Swagger / OpenAPI Documentation
Once the server is running, access live interactive API docs at:
- **Swagger UI**: [http://localhost:8080/api/swagger-ui.html](http://localhost:8080/api/swagger-ui.html)
- **OpenAPI JSON**: [http://localhost:8080/api/v3/api-docs](http://localhost:8080/api/v3/api-docs)

---

## 🔑 Environment Configuration (`application.yml`)

```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/aurastore_db

app:
  jwt:
    secret: dGhpc0lzQVN1cGVyU2VjdXJlSldUU2VjcmV0S2V5Rm9yQXVyYVN0b3JlMjAyNg==
    expiration-ms: 604800000 # 7 Days
  cors:
    allowed-origins: http://localhost:3000,http://localhost:5173
```

---

## 🧪 Thunder Client / Postman Endpoint Testing

### 1. Authentication
- **POST** `/api/auth/register`
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`
- **POST** `/api/auth/login`
  - Body: `{ "email": "john@example.com", "password": "password123" }`
  - *Extract returned `token` for Authorization header: `Bearer <token>`*
- **GET** `/api/auth/profile`
  - Header: `Authorization: Bearer <token>`

### 2. Products
- **GET** `/api/products` (Supports query parameters `?category=electronics&search=headphones`)
- **GET** `/api/products/{id}`
- **POST** `/api/products` *(Admin required)*
  - Body: `{ "name": "Wireless Speaker", "price": 99.99, "category": "cat_audio", "brand": "AuraSound" }`

### 3. Cart & Wishlist
- **GET** `/api/cart`
- **POST** `/api/cart/add`
  - Body: `{ "productId": "<prod_id>", "qty": 1 }`
- **GET** `/api/wishlist`
- **POST** `/api/wishlist/toggle`
  - Body: `{ "productId": "<prod_id>" }`

### 4. Orders
- **POST** `/api/orders`
  - Body: `{ "orderItems": [...], "shippingAddress": { "address": "123 Main St", "city": "Springfield", "postalCode": "97477", "country": "USA", "phone": "555-0192" }, "paymentMethod": "Credit Card" }`
- **GET** `/api/orders/myorders`
