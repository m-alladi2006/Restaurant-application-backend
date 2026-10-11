package com.aurastore.controller;

import com.aurastore.dto.ApiResponse;
import com.aurastore.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<String>>> getWishlist(Authentication authentication) {
        String userId = authentication.getName();
        List<String> productIds = wishlistService.getWishlist(userId);
        return ResponseEntity.ok(ApiResponse.success(productIds));
    }

    @PostMapping("/toggle")
    public ResponseEntity<ApiResponse<List<String>>> toggleWishlist(
            Authentication authentication,
            @RequestBody Map<String, String> body) {
        String userId = authentication.getName();
        String productId = body.get("productId");
        List<String> updatedWishlist = wishlistService.toggleWishlist(userId, productId);
        return ResponseEntity.ok(ApiResponse.success("Wishlist updated", updatedWishlist));
    }
}
