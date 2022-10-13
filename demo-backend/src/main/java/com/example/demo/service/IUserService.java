package com.example.demo.service;


import com.example.demo.dto.UserCompletDTO;
import com.example.demo.dto.UserDTO;

public interface IUserService {

	UserDTO getUser(Integer id);
	UserDTO createUser(UserCompletDTO createUserRequest);
	
	Integer editUser(UserDTO editUserRequest);
}
