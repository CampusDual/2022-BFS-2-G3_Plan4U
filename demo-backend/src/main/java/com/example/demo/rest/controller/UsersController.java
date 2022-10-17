package com.example.demo.rest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ContactDTO;
import com.example.demo.dto.UserCompletDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entity.User;
import com.example.demo.entity.enums.ResponseCodeEnum;
import com.example.demo.service.IUserService;
import com.example.demo.utils.Constant;

@CrossOrigin(origins = { "http://localhost:4201" })
@RestController
@RequestMapping(UsersController.REQUEST_MAPPING)
public class UsersController {
	public static final String REQUEST_MAPPING = "users";
	private static final Logger LOGGER = LoggerFactory.getLogger(UsersController.class);

	@Autowired
	private IUserService userService;

	/**
	 * Obtiene un contacto de BDD con el id indicado.
	 * 
	 * @param id el id del contacto de la BDD.
	 * @return el contacto cuyo id sea el pasado por parámetros.
	 */
	@GetMapping("/getUser")
	@PreAuthorize("hasAnyAuthority('USERS')")
	public ResponseEntity<?> getUser(@RequestParam(value = "login") String login) {
		LOGGER.info("getUser in progress...");
		UserDTO user = null;
		Map<String, Object> response = new HashMap<>();
		ResponseEntity<?>re = null;
		try {
			user = userService.getUser(login);
			if(user==null) {
				response.put(Constant.MESSAGE, Constant.USER_NOT_EXISTS);
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
				re = new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
			}else {
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
				re = new ResponseEntity<UserDTO>(user, HttpStatus.OK);
			}
		} catch (DataAccessException e) {
			LOGGER.error(e.getMessage());
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			response.put(Constant.MESSAGE, Constant.DATABASE_QUERY_ERROR);
			response.put(Constant.ERROR, e.getMessage());
			re=  new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		} 
		LOGGER.info("getUser is finished...");
		return re;
	}
		
	
	@PostMapping(path = "/createUser")
	//@PreAuthorize("hasAnyAuthority('USERS')")
	public ResponseEntity<?> createUser(@Valid @RequestBody UserCompletDTO createUserRequest, BindingResult result) {
		LOGGER.info("createUser in progress...");
		UserDTO userNew = null;
		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.CREATED;
		String message = Constant.USER_CREATE_SUCCESS;
		if(!result.hasErrors()) {	
			try {
				userNew = userService.createUser(createUserRequest);	
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
			} catch (DataAccessException e) {
				if(e.getMostSpecificCause().getMessage().contains(Constant.EMAIL_ERROR)) {
					message = Constant.EMAIL_ALREADY_EXIST;
					status= HttpStatus.OK;
				}else {
					message = Constant.DATABASE_QUERY_ERROR;
					status= HttpStatus.BAD_REQUEST;
				}
				
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
				response.put(Constant.ERROR, e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
				
			}
			response.put("usuario", userNew);
		}else {
			List<String> errors = new ArrayList<>();
			for(FieldError error : result.getFieldErrors()) {
				errors.add(error.getDefaultMessage());
			}
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.WARNING.getValue());
			message = Constant.USER_NOT_CREATED;
			response.put(Constant.ERROR, errors);
			status = HttpStatus.BAD_REQUEST;
		}
		
		LOGGER.info("createContact is finished...");
		response.put(Constant.MESSAGE, message);
		
		return new ResponseEntity<>(response, status);
	}
	
	//EditUser
	
	@PostMapping(path = "/editUser", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAnyAuthority('USERS')")
	public ResponseEntity<?> editUser(@Valid @RequestBody UserCompletDTO editUserRequest, BindingResult result) {
		LOGGER.info("editUser in progress...");
		int id = 0;
		UserDTO userOlder = userService.getUser(editUserRequest.getLogin());
		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.CREATED;
		String message = Constant.USER_EDIT_SUCCESS;
		if(userOlder!=null) {
			if(!result.hasErrors()) {
				try {
					id = userService.editUser(editUserRequest);
					response.put("userid", id);
					response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
				}catch (DataAccessException e) {
					if(e.getMostSpecificCause().getMessage().contains(Constant.PHONE_ERROR)) {
						message = Constant.PHONE_ALREADY_EXISTS;
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
				message = Constant.CONTACT_NOT_EDIT;
				response.put(Constant.ERROR, errors);
				status = HttpStatus.OK;
			}
		}else {
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			message = Constant.ID_NOT_EXISTS;
			status = HttpStatus.BAD_REQUEST;
		}
			

		
		response.put(Constant.MESSAGE, message);
		LOGGER.info("editUser is finished...");
		return new ResponseEntity<Map<String, Object>>(response, status);
	
	}
}
