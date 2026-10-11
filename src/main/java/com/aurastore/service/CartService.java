package com.aurastore.service;

import com.aurastore.dto.CartDto;
import com.aurastore.entity.Cart;
import com.aurastore.entity.Product;
import com.aurastore.repository.CartRepository;
import com.aurastore.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public CartDto.CartResponse getCart(String userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(Cart.builder()
                        .userId(userId)
                        .items(new ArrayList<>())
                        .totalPrice(0.0)
                        .build()));

        return mapToCartResponse(cart);
    }

    public CartDto.CartResponse addToCart(String userId, String productId, Integer qty) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = cartRepository.findByUserId(userId)
                .orElse(Cart.builder()
                        .userId(userId)
                        .items(new ArrayList<>())
                        .totalPrice(0.0)
                        .build());

        Optional<Cart.CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQty(existingItem.get().getQty() + qty);
        } else {
            cart.getItems().add(Cart.CartItem.builder()
                    .productId(product.getId())
                    .name(product.getName())
                    .image(product.getImages() != null && !product.getImages().isEmpty() ? product.getImages().get(0) : "")
                    .price(product.getPrice())
                    .qty(qty)
                    .countInStock(product.getCountInStock())
                    .build());
        }

        double total = cart.getItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQty())
                .sum();
        cart.setTotalPrice(total);

        Cart saved = cartRepository.save(cart);
        return mapToCartResponse(saved);
    }

    private CartDto.CartResponse mapToCartResponse(Cart cart) {
        return CartDto.CartResponse.builder()
                .id(cart.getId())
                ._id(cart.getId())
                .userId(cart.getUserId())
                .totalPrice(cart.getTotalPrice())
                .items(cart.getItems().stream().map(item -> CartDto.CartItemDto.builder()
                        .productId(item.getProductId())
                        .name(item.getName())
                        .image(item.getImage())
                        .price(item.getPrice())
                        .qty(item.getQty())
                        .countInStock(item.getCountInStock())
                        .build()).toList())
                .build();
    }
}
