package com.example.demo.service;


import java.util.List;
import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.example.demo.dto.UserCompletDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.rest.response.DataSourceRESTResponse;

public interface IUserService {

	UserDTO getUser(String login);
	UserDTO createUser(UserCompletDTO createUserRequest);
	List<UserDTO> findAll();
	DataSourceRESTResponse<List<UserDTO>> getUsers(AnyPageFilter pageFilter);
	Integer editUser(UserCompletDTO editUserRequest);
	
}
