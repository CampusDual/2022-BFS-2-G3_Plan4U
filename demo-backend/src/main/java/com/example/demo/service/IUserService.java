package com.example.demo.service;


import com.example.demo.entity.User;

public interface IUserService {

	Boolean canLogin(String user);
	User getUser(Integer id);
	User createUser(User createUserRequest);
}
