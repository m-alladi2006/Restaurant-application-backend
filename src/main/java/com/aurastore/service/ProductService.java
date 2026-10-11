package com.aurastore.service;

import com.aurastore.dto.ProductDto;
import com.aurastore.entity.Product;
import com.aurastore.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDto> getProducts(String category, String search) {
        List<Product> products;

        if (search != null && !search.trim().isEmpty()) {
            products = productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(search, search);
        } else if (category != null && !category.trim().isEmpty() && !"all".equalsIgnoreCase(category)) {
            products = productRepository.findByCategory(category);
        } else {
            products = productRepository.findAll();
        }

        return products.stream().map(this::mapToDto).toList();
    }

    public ProductDto getProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return mapToDto(product);
    }

    public ProductDto createProduct(ProductDto dto) {
        Product product = Product.builder()
                .name(dto.getName())
                .slug(dto.getSlug() != null ? dto.getSlug() : dto.getName().toLowerCase().replace(" ", "-"))
                .description(dto.getDescription())
                .price(dto.getPrice())
                .originalPrice(dto.getOriginalPrice() != null ? dto.getOriginalPrice() : dto.getPrice())
                .discountPercent(dto.getDiscountPercent() != null ? dto.getDiscountPercent() : 0)
                .rating(dto.getRating() != null ? dto.getRating() : 5.0)
                .numReviews(dto.getNumReviews() != null ? dto.getNumReviews() : 0)
                .category(dto.getCategory())
                .brand(dto.getBrand())
                .countInStock(dto.getCountInStock() != null ? dto.getCountInStock() : 10)
                .images(dto.getImages() != null ? dto.getImages() : List.of("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"))
                .isFeatured(dto.getIsFeatured() != null ? dto.getIsFeatured() : false)
                .attributes(dto.getAttributes())
                .tags(dto.getTags())
                .build();

        Product saved = productRepository.save(product);
        return mapToDto(saved);
    }

    public ProductDto updateProduct(String id, ProductDto dto) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (dto.getName() != null) existing.setName(dto.getName());
        if (dto.getDescription() != null) existing.setDescription(dto.getDescription());
        if (dto.getPrice() != null) existing.setPrice(dto.getPrice());
        if (dto.getCategory() != null) existing.setCategory(dto.getCategory());
        if (dto.getBrand() != null) existing.setBrand(dto.getBrand());
        if (dto.getCountInStock() != null) existing.setCountInStock(dto.getCountInStock());
        if (dto.getImages() != null) existing.setImages(dto.getImages());

        Product updated = productRepository.save(existing);
        return mapToDto(updated);
    }

    public void deleteProduct(String id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }

    private ProductDto mapToDto(Product p) {
        List<ProductDto.ReviewDto> reviews = p.getReviews() != null ? p.getReviews().stream().map(r -> ProductDto.ReviewDto.builder()
                .id(r.getId())
                ._id(r.getId())
                .userId(r.getUserId())
                .userName(r.getUserName())
                .rating(r.getRating())
                .comment(r.getComment())
                .createdAt(r.getCreatedAt().toString())
                .build()).toList() : List.of();

        return ProductDto.builder()
                .id(p.getId())
                ._id(p.getId())
                .name(p.getName())
                .slug(p.getSlug())
                .description(p.getDescription())
                .price(p.getPrice())
                .originalPrice(p.getOriginalPrice())
                .discountPercent(p.getDiscountPercent())
                .rating(p.getRating())
                .numReviews(p.getNumReviews())
                .category(p.getCategory())
                .brand(p.getBrand())
                .countInStock(p.getCountInStock())
                .images(p.getImages())
                .isFeatured(p.getIsFeatured())
                .attributes(p.getAttributes())
                .tags(p.getTags())
                .reviews(reviews)
                .build();
    }
}
