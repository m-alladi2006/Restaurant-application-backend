package com.aurastore.controller;

import com.aurastore.dto.ApiResponse;
import com.aurastore.dto.OrderDto;
import com.aurastore.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderDto.OrderResponse>> createOrder(
            Authentication authentication,
            @RequestBody OrderDto.CreateOrderRequest request) {
        String userId = authentication.getName();
        OrderDto.OrderResponse order = orderService.createOrder(userId, request);
        return ResponseEntity.ok(ApiResponse.success("Order created successfully", order));
    }

    @GetMapping("/myorders")
    public ResponseEntity<ApiResponse<List<OrderDto.OrderResponse>>> getMyOrders(Authentication authentication) {
        String userId = authentication.getName();
        List<OrderDto.OrderResponse> orders = orderService.getMyOrders(userId);
        return ResponseEntity.ok(ApiResponse.success(orders));
    }
}
