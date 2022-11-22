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
import com.example.demo.dto.ProvinceDTO;
import com.example.demo.entity.enums.ResponseCodeEnum;
import com.example.demo.exception.DemoException;
import com.example.demo.rest.response.DataSourceRESTResponse;
import com.example.demo.service.IProvinceService;
import com.example.demo.utils.Constant;

@CrossOrigin(origins = {"http://localhost:4201"})
@RestController
@RequestMapping(ProvincesController.REQUEST_MAPPING)
public class ProvincesController {
	public static final String REQUEST_MAPPING = "provinces";
	private static final Logger LOGGER = LoggerFactory.getLogger(ProvincesController.class);

	@Autowired
	private IProvinceService provinceService;

	@GetMapping("/getProvince")
	@PreAuthorize("hasAnyAuthority('PROVINCES')")
	public ResponseEntity<?> getProvince(@RequestParam(value = "id") Integer id) {
		LOGGER.info("getProvince in progress...");
		ProvinceDTO province = null;
		Map<String, Object> response = new HashMap<>();
		ResponseEntity<?>re = null;
		try {
			province = provinceService.getProvince(id);
			if(province == null) {
				response.put(Constant.MESSAGE, Constant.PUBLICATION_NOT_EXISTS);
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
				re = new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
			}else {
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
				re = new ResponseEntity<>(province, HttpStatus.OK);
			}
		} catch (DataAccessException e) {
			LOGGER.error(e.getMessage());
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			response.put(Constant.MESSAGE, Constant.DATABASE_QUERY_ERROR);
			response.put(Constant.ERROR, e.getMessage());
			re=  new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		} 
		LOGGER.info("getProvince is finished...");
		return re;
	}

	@PostMapping(path = "/getProvinces", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAnyAuthority('PROVINCES')")
	public @ResponseBody DataSourceRESTResponse<List<ProvinceDTO>> getProvince(@RequestBody AnyPageFilter pageFilter) {
		LOGGER.info("getProvinces in progress...");
		DataSourceRESTResponse<List<ProvinceDTO>> dres = new DataSourceRESTResponse<>();
		try {
			dres = provinceService.getProvinces(pageFilter);
		} catch (DemoException e) {
			LOGGER.error(e.getMessage());
			dres.setResponseMessage(e.getMessage());
		} 
		LOGGER.info("getProvinces is finished...");
		return dres;
	}
	
	@GetMapping(path = "/getProvinces")
	@PreAuthorize("hasAnyAuthority('PROVINCES')")
	public @ResponseBody List<ProvinceDTO> findAll() {
		LOGGER.info("findAll in progress...");
		return provinceService.findAll();
	}

}
