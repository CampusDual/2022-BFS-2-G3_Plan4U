package com.example.demo.service;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.borjaglez.springify.repository.specification.SpecificationBuilder;
import com.example.demo.dto.PublicationDTO;
import com.example.demo.dto.mapper.PublicationMapper;
import com.example.demo.entity.Publication;
import com.example.demo.repository.PublicationRepository;
import com.example.demo.rest.response.DataSourceRESTResponse;

@Service
public class PublicationServiceImpl extends AbstractDemoService implements IPublicationService {

	/**
	 * Especificación JPA para {@link Publication}.
	 */
	@Autowired
	private PublicationRepository publicationRepository;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public PublicationDTO getPublication(Integer id) {
		Publication publication = publicationRepository.findById(id).orElse(null);
		return PublicationMapper.INSTANCE.publicationToPublicationDto(publication);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional(readOnly = true)
	public DataSourceRESTResponse<List<PublicationDTO>> getPublications(AnyPageFilter pageFilter) {
		checkInputParams(pageFilter);
		Page<Publication> publications = SpecificationBuilder.selectDistinctFrom(publicationRepository).where(pageFilter)
				.findAll(pageFilter); 
		DataSourceRESTResponse<List<PublicationDTO>> datares = new DataSourceRESTResponse<>();
		datares.setTotalElements((int) publications.getTotalElements());
		List<PublicationDTO> publicationdto = PublicationMapper.INSTANCE.publicationToPublicationDtoList(publications.getContent());
		datares.setData(publicationdto);
		return datares;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional
	public PublicationDTO createPublication(PublicationDTO createPublicationRequest) {
		Publication publicationdto = PublicationMapper.INSTANCE.publicationDTOtoPublication(createPublicationRequest);
		Publication publicationnew = publicationRepository.save(publicationdto);
		return PublicationMapper.INSTANCE.publicationToPublicationDto(publicationnew);
	}


	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional
	public Integer deletePublication(Integer id) {
		publicationRepository.deleteById(id);
		return id;

	}

	@Override
	public List<PublicationDTO> findAll() {
	    List<Publication> publicationdto = publicationRepository.findAll(Sort.by(Sort.Direction.ASC,"eventDate"));
		return PublicationMapper.INSTANCE.publicationToPublicationDtoList(publicationdto);
	}

	@Override
	public Integer editPublication(PublicationDTO editPublicationRequest) {
		Publication publicationdto = PublicationMapper.INSTANCE.publicationDTOtoPublication(editPublicationRequest);
		Publication editPublication = publicationRepository.save(publicationdto);
		return editPublication.getId();
	}

	@Override
	public List<Object> getDataChart(Date initDate, Date endDate) {
		List<Object> dataChart = publicationRepository.getDataChart(initDate, endDate);
		return dataChart;
	}
}
