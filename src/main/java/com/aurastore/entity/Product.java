package com.aurastore.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "products")
public class Product {

    @Id
    private String id;
    private String name;
    private String slug;
    private String description;
    private Double price;
    private Double originalPrice;
    private Integer discountPercent;
    private Double rating;
    private Integer numReviews;
    private String category; // category ID or slug
    private String brand;
    private Integer countInStock;

    @Builder.Default
    private List<String> images = new ArrayList<>();

    private Boolean isFeatured;
    private Map<String, String> attributes;
    private List<String> tags;

    @Builder.Default
    private List<Review> reviews = new ArrayList<>();

    @Builder.Default
    private Instant createdAt = Instant.now();

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Review {
        private String id;
        private String userId;
        private String userName;
        private Integer rating;
        private String comment;

        @Builder.Default
        private Instant createdAt = Instant.now();
    }
}
