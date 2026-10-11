package com.aurastore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectApplication.class, args);
        System.out.println("=================================================");
        System.out.println("  AuraStore Spring Boot 3 REST API Server Online ");
        System.out.println("  Base URL: http://localhost:8081/api           ");
        System.out.println("  Swagger UI: http://localhost:8081/api/swagger-ui.html ");
        System.out.println("=================================================");
    }
}
