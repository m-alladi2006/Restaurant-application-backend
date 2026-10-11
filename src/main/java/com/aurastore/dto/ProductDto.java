package com.aurastore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {

    private String id;
    private String _id;
    private String name;
    private String slug;
    private String description;
    private Double price;
    private Double originalPrice;
    private Integer discountPercent;
    private Double rating;
    private Integer numReviews;
    private String category;
    private String brand;
    private Integer countInStock;
    private List<String> images;
    private Boolean isFeatured;
    private Map<String, String> attributes;
    private List<String> tags;
    private List<ReviewDto> reviews;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReviewDto {
        private String id;
        private String _id;
        private String userId;
        private String userName;
        private Integer rating;
        private String comment;
        private String createdAt;
    }
}
