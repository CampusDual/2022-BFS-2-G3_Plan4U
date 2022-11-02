package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.borjaglez.springify.repository.specification.SpecificationBuilder;
import com.example.demo.dto.CategoryDTO;
import com.example.demo.dto.mapper.CategoryMapper;
import com.example.demo.entity.Category;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.rest.response.DataSourceRESTResponse;

@Service
public class CategoryServiceImpl extends AbstractDemoService implements ICategoryService{
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Override
	public CategoryDTO getCategory(Integer id) {
		Category category = categoryRepository.findById(id).orElse(null);
		return CategoryMapper.INSTANCE.categoryToCategoryDto(category);
	}
	
	@Override
	@Transactional(readOnly = true)
	public DataSourceRESTResponse<List<CategoryDTO>> getCategories(AnyPageFilter pageFilter) {
		checkInputParams(pageFilter);
		Page<Category> categories = SpecificationBuilder.selectDistinctFrom(categoryRepository).where(pageFilter).findAll(pageFilter); 
		DataSourceRESTResponse<List<CategoryDTO>> datares = new DataSourceRESTResponse<>();
		datares.setTotalElements((int) categories.getTotalElements());
		List<CategoryDTO> categorydto = CategoryMapper.INSTANCE.categoryToCategoryDtoList(categories.getContent());
		datares.setData(categorydto);
		return datares;
	}
	
	@Override
	public List<CategoryDTO> findAll() {
		List<Category> categorydto = categoryRepository.findAll();
		return CategoryMapper.INSTANCE.categoryToCategoryDtoList(categorydto);
	}

}
