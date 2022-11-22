package com.example.demo.service;

import java.util.List;

import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.example.demo.dto.CategoryDTO;
import com.example.demo.rest.response.DataSourceRESTResponse;

public interface ICategoryService {
	CategoryDTO getCategory(Integer id);
	DataSourceRESTResponse<List<CategoryDTO>> getCategories(AnyPageFilter pageFilter);
	List<CategoryDTO> findAll();
}
