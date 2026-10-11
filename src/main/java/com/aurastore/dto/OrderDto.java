package com.aurastore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

public class OrderDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateOrderRequest {
        private List<OrderItemDto> orderItems;
        private ShippingAddressDto shippingAddress;
        private String paymentMethod;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderResponse {
        private String id;
        private String _id;
        private String userId;
        private List<OrderItemDto> orderItems;
        private ShippingAddressDto shippingAddress;
        private String paymentMethod;
        private Double itemsPrice;
        private Double taxPrice;
        private Double shippingPrice;
        private Double totalPrice;
        private Boolean isPaid;
        private Instant paidAt;
        private Boolean isDelivered;
        private Instant deliveredAt;
        private String status;
        private Instant createdAt;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemDto {
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
    public static class ShippingAddressDto {
        private String address;
        private String city;
        private String postalCode;
        private String country;
        private String phone;
    }
}
