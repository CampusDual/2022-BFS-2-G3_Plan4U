package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.borjaglez.springify.repository.specification.SpecificationBuilder;
import com.example.demo.dto.ProvinceDTO;
import com.example.demo.dto.mapper.ProvinceMapper;
import com.example.demo.entity.Province;
import com.example.demo.entity.Publication;
import com.example.demo.repository.ProvinceRepository;
import com.example.demo.rest.response.DataSourceRESTResponse;

@Service
public class ProvinceServiceImpl extends AbstractDemoService implements IProvinceService {

	/**
	 * Especificación JPA para {@link Publication}.
	 */
	@Autowired
	private ProvinceRepository provinceRepository;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public ProvinceDTO getProvince(Integer id) {
		Province province = provinceRepository.findById(id).orElse(null);
		return ProvinceMapper.INSTANCE.provinceToProvinceDto(province);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional(readOnly = true)
	public DataSourceRESTResponse<List<ProvinceDTO>> getProvinces(AnyPageFilter pageFilter) {
		checkInputParams(pageFilter);
		Page<Province> provinces = SpecificationBuilder.selectDistinctFrom(provinceRepository).where(pageFilter)
				.findAll(pageFilter); 
		DataSourceRESTResponse<List<ProvinceDTO>> datares = new DataSourceRESTResponse<>();
		datares.setTotalElements((int) provinces.getTotalElements());
		List<ProvinceDTO> provincedto = ProvinceMapper.INSTANCE.provinceToProvinceDtoList(provinces.getContent());
		datares.setData(provincedto);
		return datares;
	}
	
	@Override
	public List<ProvinceDTO> findAll() {
		List<Province> provincedto = provinceRepository.findAll(Sort.by(Sort.Direction.ASC,"provinceName"));
		return ProvinceMapper.INSTANCE.provinceToProvinceDtoList(provincedto);
	}
	
}
