package com.example.demo.service;

import java.util.Date;
import java.util.List;
import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.example.demo.dto.PublicationDTO;
import com.example.demo.rest.response.DataSourceRESTResponse;

public interface IPublicationService {
	PublicationDTO getPublication(Integer id);
	DataSourceRESTResponse<List<PublicationDTO>> getPublications(AnyPageFilter pageFilter);
	PublicationDTO createPublication(PublicationDTO createPublicationRequest);
	Integer deletePublication(Integer id);
	List<PublicationDTO> findAll();
	Integer editPublication(PublicationDTO editPublicationRequest);
	List<Object> getDataChart(Date initDate, Date endDate);
	
}



