package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.dto.UserCompletDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.dto.mapper.UserCompletMapper;
import com.example.demo.dto.mapper.UserMapper;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;


@Service
public class UserServiceImpl implements IUserService {

	/**
	 * Especificación JPA para {@link User}.
	 */
	@Autowired
	private UserRepository userRepository;


	@Override
	public UserDTO getUser(Integer id) {
		User user = userRepository.findById(id).orElse(null);
		return UserMapper.INSTANCE.userToUserDto(user);
	}


	@Override
	@Transactional
	public UserDTO createUser(UserCompletDTO createUserRequest) {
		User userdto = UserCompletMapper.INSTANCE.userCompetDTOToUser(createUserRequest);
		User usernew = userRepository.save(userdto);
		return UserMapper.INSTANCE.userToUserDto(usernew);
	}
}
