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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {

    @Id
    private String id;
    private String userId;

    @Builder.Default
    private List<OrderItem> orderItems = new ArrayList<>();

    private ShippingAddress shippingAddress;
    private String paymentMethod;
    private Double itemsPrice;
    private Double taxPrice;
    private Double shippingPrice;
    private Double totalPrice;
    private Boolean isPaid;
    private Instant paidAt;
    private Boolean isDelivered;
    private Instant deliveredAt;
    private String status; // Pending, Processing, Shipped, Delivered, Cancelled

    @Builder.Default
    private Instant createdAt = Instant.now();

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItem {
        private String productId;
        private String name;
        private Integer qty;
        private String image;
        private Double price;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ShippingAddress {
        private String address;
        private String city;
        private String postalCode;
        private String country;
        private String phone;
    }
}
