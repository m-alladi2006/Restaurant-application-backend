package com.aurastore.controller;

import com.aurastore.dto.ApiResponse;
import com.aurastore.dto.CartDto;
import com.aurastore.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<ApiResponse<CartDto.CartResponse>> getCart(Authentication authentication) {
        String userId = authentication.getName();
        CartDto.CartResponse cart = cartService.getCart(userId);
        return ResponseEntity.ok(ApiResponse.success(cart));
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<CartDto.CartResponse>> addToCart(
            Authentication authentication,
            @RequestBody CartDto.AddToCartRequest request) {
        String userId = authentication.getName();
        CartDto.CartResponse updatedCart = cartService.addToCart(userId, request.getProductId(), request.getQty());
        return ResponseEntity.ok(ApiResponse.success("Item added to cart", updatedCart));
    }
}
