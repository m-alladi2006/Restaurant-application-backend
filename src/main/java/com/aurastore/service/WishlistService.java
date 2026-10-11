package com.aurastore.service;

import com.aurastore.entity.Wishlist;
import com.aurastore.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;

    public List<String> getWishlist(String userId) {
        Wishlist wishlist = wishlistRepository.findByUserId(userId)
                .orElseGet(() -> wishlistRepository.save(Wishlist.builder()
                        .userId(userId)
                        .productIds(new ArrayList<>())
                        .build()));
        return wishlist.getProductIds();
    }

    public List<String> toggleWishlist(String userId, String productId) {
        Wishlist wishlist = wishlistRepository.findByUserId(userId)
                .orElse(Wishlist.builder()
                        .userId(userId)
                        .productIds(new ArrayList<>())
                        .build());

        if (wishlist.getProductIds().contains(productId)) {
            wishlist.getProductIds().remove(productId);
        } else {
            wishlist.getProductIds().add(productId);
        }

        Wishlist saved = wishlistRepository.save(wishlist);
        return saved.getProductIds();
    }
}
