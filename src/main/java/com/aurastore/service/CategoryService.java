package com.aurastore.service;

import com.aurastore.dto.CategoryDto;
import com.aurastore.entity.Category;
import com.aurastore.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapToDto)
                .toList();
    }

    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category category = Category.builder()
                .name(categoryDto.getName())
                .slug(categoryDto.getSlug() != null ? categoryDto.getSlug() : categoryDto.getName().toLowerCase().replace(" ", "-"))
                .description(categoryDto.getDescription())
                .image(categoryDto.getImage())
                .build();

        Category saved = categoryRepository.save(category);
        return mapToDto(saved);
    }

    private CategoryDto mapToDto(Category c) {
        return CategoryDto.builder()
                .id(c.getId())
                ._id(c.getId())
                .name(c.getName())
                .slug(c.getSlug())
                .description(c.getDescription())
                .image(c.getImage())
                .build();
    }
}
