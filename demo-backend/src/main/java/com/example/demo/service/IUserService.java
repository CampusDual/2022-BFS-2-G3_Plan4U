package com.example.demo.service;


import com.example.demo.dto.UserCompletDTO;
import com.example.demo.dto.UserDTO;

public interface IUserService {

	UserDTO getUser(String login);
	UserDTO createUser(UserCompletDTO createUserRequest);
	
	Integer editUser(UserCompletDTO editUserRequest);
	
}
