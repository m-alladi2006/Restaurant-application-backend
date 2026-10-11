package com.aurastore.service;

import com.aurastore.dto.OrderDto;
import com.aurastore.entity.Order;
import com.aurastore.repository.CartRepository;
import com.aurastore.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    public OrderDto.OrderResponse createOrder(String userId, OrderDto.CreateOrderRequest request) {
        double itemsPrice = request.getOrderItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQty())
                .sum();
        double taxPrice = Math.round(itemsPrice * 0.1 * 100.0) / 100.0;
        double shippingPrice = 15.0;
        double totalPrice = itemsPrice + taxPrice + shippingPrice;

        List<Order.OrderItem> orderItems = request.getOrderItems().stream()
                .map(i -> Order.OrderItem.builder()
                        .productId(i.getProductId())
                        .name(i.getName())
                        .qty(i.getQty())
                        .image(i.getImage())
                        .price(i.getPrice())
                        .build())
                .toList();

        Order.ShippingAddress shippingAddress = Order.ShippingAddress.builder()
                .address(request.getShippingAddress().getAddress())
                .city(request.getShippingAddress().getCity())
                .postalCode(request.getShippingAddress().getPostalCode())
                .country(request.getShippingAddress().getCountry())
                .phone(request.getShippingAddress().getPhone())
                .build();

        Order order = Order.builder()
                .userId(userId)
                .orderItems(orderItems)
                .shippingAddress(shippingAddress)
                .paymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : "Credit Card")
                .itemsPrice(itemsPrice)
                .taxPrice(taxPrice)
                .shippingPrice(shippingPrice)
                .totalPrice(totalPrice)
                .isPaid(true)
                .paidAt(Instant.now())
                .isDelivered(false)
                .status("Processing")
                .createdAt(Instant.now())
                .build();

        Order saved = orderRepository.save(order);

        // Clear user's cart after successful order creation
        cartRepository.findByUserId(userId).ifPresent(cart -> {
            cart.getItems().clear();
            cart.setTotalPrice(0.0);
            cartRepository.save(cart);
        });

        return mapToOrderResponse(saved);
    }

    public List<OrderDto.OrderResponse> getMyOrders(String userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToOrderResponse)
                .toList();
    }

    private OrderDto.OrderResponse mapToOrderResponse(Order o) {
        List<OrderDto.OrderItemDto> items = o.getOrderItems().stream()
                .map(i -> OrderDto.OrderItemDto.builder()
                        .productId(i.getProductId())
                        .name(i.getName())
                        .qty(i.getQty())
                        .image(i.getImage())
                        .price(i.getPrice())
                        .build())
                .toList();

        OrderDto.ShippingAddressDto address = OrderDto.ShippingAddressDto.builder()
                .address(o.getShippingAddress().getAddress())
                .city(o.getShippingAddress().getCity())
                .postalCode(o.getShippingAddress().getPostalCode())
                .country(o.getShippingAddress().getCountry())
                .phone(o.getShippingAddress().getPhone())
                .build();

        return OrderDto.OrderResponse.builder()
                .id(o.getId())
                ._id(o.getId())
                .userId(o.getUserId())
                .orderItems(items)
                .shippingAddress(address)
                .paymentMethod(o.getPaymentMethod())
                .itemsPrice(o.getItemsPrice())
                .taxPrice(o.getTaxPrice())
                .shippingPrice(o.getShippingPrice())
                .totalPrice(o.getTotalPrice())
                .isPaid(o.getIsPaid())
                .paidAt(o.getPaidAt())
                .isDelivered(o.getIsDelivered())
                .deliveredAt(o.getDeliveredAt())
                .status(o.getStatus())
                .createdAt(o.getCreatedAt())
                .build();
    }
}
