package com.example.demo.rest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.example.demo.dto.CategoryDTO;
import com.example.demo.entity.enums.ResponseCodeEnum;
import com.example.demo.exception.DemoException;
import com.example.demo.rest.response.DataSourceRESTResponse;
import com.example.demo.service.ICategoryService;
import com.example.demo.utils.Constant;

@CrossOrigin(origins = {"http://localhost:4201"})
@RestController
@RequestMapping(CategoriesController.REQUEST_MAPPING)
public class CategoriesController {
	public static final String REQUEST_MAPPING = "categories";
	private static final Logger LOGGER = LoggerFactory.getLogger(CategoriesController.class);
	
	@Autowired
	private ICategoryService categoryService;
	
	@GetMapping("/getCategory")
	@PreAuthorize("hasAnyAuthority('CATEGORIES')")
	public ResponseEntity<?> getCategory(@RequestParam(value = "id") Integer id) {
		LOGGER.info("getCategory in progress...");
		CategoryDTO category = null;
		Map<String, Object> response = new HashMap<>();
		ResponseEntity<?>re = null;
		try {
			category = categoryService.getCategory(id);
			if(category == null) {
				response.put(Constant.MESSAGE, Constant.PUBLICATION_NOT_EXISTS);
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
				re = new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
			}else {
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
				re = new ResponseEntity<>(category, HttpStatus.OK);
			}
		} catch (DataAccessException e) {
			LOGGER.error(e.getMessage());
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			response.put(Constant.MESSAGE, Constant.DATABASE_QUERY_ERROR);
			response.put(Constant.ERROR, e.getMessage());
			re=  new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		} 
		LOGGER.info("getCategory is finished...");
		return re;
	}
	
	@PostMapping(path = "/getCategories", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAnyAuthority('CATEGORIES')")
	public @ResponseBody DataSourceRESTResponse<List<CategoryDTO>> getCategory(@RequestBody AnyPageFilter pageFilter) {
		LOGGER.info("getCategories in progress...");
		DataSourceRESTResponse<List<CategoryDTO>> dres = new DataSourceRESTResponse<>();
		try {
			dres = categoryService.getCategories(pageFilter);
		} catch (DemoException e) {
			LOGGER.error(e.getMessage());
			dres.setResponseMessage(e.getMessage());
		} 
		LOGGER.info("getCategory is finished...");
		return dres;
	}
	
	@GetMapping(path = "/getCategories")
	@PreAuthorize("hasAnyAuthority('CATEGORIES')")
	public @ResponseBody List<CategoryDTO> findAll() {
		LOGGER.info("findAll in progress...");
		return categoryService.findAll();
	}
}
