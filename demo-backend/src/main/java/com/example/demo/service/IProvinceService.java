package com.example.demo.service;

import java.util.List;

import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.example.demo.dto.ProvinceDTO;
import com.example.demo.rest.response.DataSourceRESTResponse;

public interface IProvinceService {

	ProvinceDTO getProvince(Integer id);
	DataSourceRESTResponse<List<ProvinceDTO>> getProvinces(AnyPageFilter pageFilter);
	List<ProvinceDTO> findAll();
	
}
