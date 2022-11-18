package com.example.demo.rest.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiFunction;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.example.demo.dto.DataChartDTO;
import com.example.demo.dto.PublicationDTO;
import com.example.demo.entity.enums.ResponseCodeEnum;
import com.example.demo.exception.DemoException;
import com.example.demo.rest.response.DataSourceRESTResponse;
import com.example.demo.service.IPublicationService;
import com.example.demo.utils.Constant;
import com.fasterxml.jackson.annotation.JsonFormat;

@CrossOrigin(origins = {"http://localhost:4201"})
@RestController
@RequestMapping(PublicationsController.REQUEST_MAPPING)
public class PublicationsController {
	public static final String REQUEST_MAPPING = "publications";
	private static final Logger LOGGER = LoggerFactory.getLogger(PublicationsController.class);

	@Autowired
	private IPublicationService publicationService;

	@GetMapping("/getPublication")
	@PreAuthorize("hasAnyAuthority('PUBLICATIONSUSER')")
	public ResponseEntity<?> getPublication(@RequestParam(value = "id") Integer id) {
		LOGGER.info("getPublication in progress...");
		PublicationDTO publication = null;
		Map<String, Object> response = new HashMap<>();
		ResponseEntity<?>re = null;
		try {
			publication = publicationService.getPublication(id);
			if(publication == null) {
				response.put(Constant.MESSAGE, Constant.PUBLICATION_NOT_EXISTS);
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
				re = new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
			}else {
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
				re = new ResponseEntity<>(publication, HttpStatus.OK);
			}
		} catch (DataAccessException e) {
			LOGGER.error(e.getMessage());
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			response.put(Constant.MESSAGE, Constant.DATABASE_QUERY_ERROR);
			response.put(Constant.ERROR, e.getMessage());
			re=  new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		} 
		LOGGER.info("getPublication is finished...");
		return re;
	}

	@PostMapping(path = "/getPublications", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAnyAuthority('PUBLICATIONS')")
	public @ResponseBody DataSourceRESTResponse<List<PublicationDTO>> getPublication(@RequestBody AnyPageFilter pageFilter) {
		LOGGER.info("getPublications in progress...");
		DataSourceRESTResponse<List<PublicationDTO>> dres = new DataSourceRESTResponse<>();
		try {
			dres = publicationService.getPublications(pageFilter);
		} catch (DemoException e) {
			LOGGER.error(e.getMessage());
			dres.setResponseMessage(e.getMessage());
		} 
		LOGGER.info("getPublications is finished...");
		return dres;
	}
	
	@GetMapping(path = "/getPublications")
	@PreAuthorize("hasAnyAuthority('PUBLICATIONSUSER')")
	public @ResponseBody List<PublicationDTO> findAll() {
		LOGGER.info("findAll in progress...");
		return publicationService.findAll();
	}

	@PostMapping(path = "/createPublication")
	@PreAuthorize("hasAnyAuthority('PUBLICATIONSUSER')")
	public ResponseEntity<?> createPublication(@Valid @RequestBody PublicationDTO createPublicationRequest, BindingResult result) {
		LOGGER.info("createPublication in progress...");
		PublicationDTO publicationNew = null;
		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.CREATED;
		String message = Constant.PUBLICATION_CREATE_SUCCESS;
		if(!result.hasErrors()) {
			try {
				publicationNew = publicationService.createPublication(createPublicationRequest);	
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
			} catch (DataAccessException e) {
				if(e.getMostSpecificCause().getMessage().contains(Constant.PUBLICATION_DATABASE_ERROR)) {
					message = Constant.PUBLICATION_DATABASE_ERROR;
					status= HttpStatus.OK;
				}else {
					message = Constant.DATABASE_QUERY_ERROR;
					status= HttpStatus.BAD_REQUEST;
				}
				
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
				response.put(Constant.ERROR, e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
				
			}
			response.put("publicación", publicationNew);
		}else {
			List<String> errors = new ArrayList<>();
			for(FieldError error : result.getFieldErrors()) {
				errors.add(error.getDefaultMessage());
			}
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.WARNING.getValue());
			message = Constant.PUBLICATION_NOT_CREATED;
			response.put(Constant.ERROR, errors);
			status = HttpStatus.BAD_REQUEST;
		}
		
		LOGGER.info("createPublication is finished...");
		response.put(Constant.MESSAGE, message);
		
		return new ResponseEntity<Map<String, Object>>(response, status);
	}

	@PostMapping(path = "/editPublication", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAnyAuthority('PUBLICATIONSUSER')")
	public ResponseEntity<?> editPublication(@Valid @RequestBody PublicationDTO editPublicationRequest, BindingResult result) {
		LOGGER.info("editPublication in progress...");
		int id = 0;
		PublicationDTO publicationOlder = publicationService.getPublication(editPublicationRequest.getId());
		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.CREATED;
		String message = Constant.PUBLICATION_EDIT_SUCCESS;
		if(publicationOlder!=null) {
			if(!result.hasErrors()) {
				try {
					editPublicationRequest.setCreateDate(publicationOlder.getCreateDate());
					id = publicationService.editPublication(editPublicationRequest);
					response.put("publicationid", id);
					response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
				}catch (DataAccessException e) {
					if(e.getMostSpecificCause().getMessage().contains(Constant.PUBLICATION_DATABASE_ERROR)) {
						message = Constant.PUBLICATION_DATABASE_ERROR;
						status= HttpStatus.OK;
					}else {
						message = Constant.DATABASE_QUERY_ERROR;
						status= HttpStatus.BAD_REQUEST;
					}
					response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
					response.put(Constant.ERROR, e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
				}
				
			}else {
				List<String> errors = new ArrayList<>();
				for(FieldError error : result.getFieldErrors()) {
					errors.add(error.getDefaultMessage());
				}
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.WARNING.getValue());
				message = Constant.PUBLICATION_NOT_EDIT;
				response.put(Constant.ERROR, errors);
				status = HttpStatus.OK;
			}
		}else {
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			message = Constant.ID_NOT_EXISTS;
			status = HttpStatus.BAD_REQUEST;
		}
			

		
		response.put(Constant.MESSAGE, message);
		LOGGER.info("editPublication is finished...");
		return new ResponseEntity<Map<String, Object>>(response, status);
	
	}

	@DeleteMapping("/deletePublication")
	@PreAuthorize("hasAnyAuthority('PUBLICATIONSUSER')")
	public ResponseEntity<?> deletePublication(@RequestParam(value = "id")Integer id) {
		LOGGER.info("deletePublication in progress...");
		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.OK;
		String message = Constant.PUBLICATION_DELETE_SUCCESS;
		try {
			publicationService.deletePublication(id);
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
		} catch (DataAccessException e) {
			response.put(Constant.MESSAGE, Constant.DATABASE_QUERY_ERROR);
			response.put(Constant.ERROR, e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			status = HttpStatus.BAD_REQUEST;
			message = Constant.PUBLICATION_NOT_DELETE;
		} 
		response.put(Constant.MESSAGE, message);
		LOGGER.info("deletePublication is finished...");
		return new ResponseEntity<Map<String, Object>>(response,status);
	}
	
	
	@GetMapping(path = "/getDataChart")
	@PreAuthorize("hasAnyAuthority('PUBLICATIONS')")
	public ResponseEntity<?> getDataChart(@RequestParam(value = "iniDate") Date iniDate,
			  @RequestParam(value = "endDate") Date endDate) {
		LOGGER.info("getDataChart in progress...");
		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.OK;
		List<Object> dataChart = publicationService.getDataChart(iniDate, endDate);
		List<Map<String, Object>> listaJson = new ArrayList<>();
		
		List<String> listProvinces = new ArrayList<>();
		for (Object elemento : dataChart) {
			Object[] arrayElementos = (Object[]) elemento;
			if (!listProvinces.contains(arrayElementos[0])) {
				listProvinces.add((String)arrayElementos[0]);
				Map<String, Object> valores = new HashMap<>();
				valores.put("province", arrayElementos[0]);
				listaJson.add(valores);
			}
		}
		
				
		for (Object elemento : dataChart) {
			Object[] arrayElementos = (Object[]) elemento;
			for (int i=0; i < listProvinces.size(); i++) {
				if (listProvinces.get(i).contains((String)arrayElementos[0])){
					listaJson.get(i).put((String)arrayElementos[1], arrayElementos[2]);
				}
			}
		}
		response.put("data", listaJson);
		return new ResponseEntity<Map<String, Object>>(response,status);
	}

}
