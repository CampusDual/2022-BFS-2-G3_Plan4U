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
import com.example.demo.utils.CipherUtils;


@Service
public class UserServiceImpl extends AbstractDemoService implements IUserService {

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
		userdto.setPassword(new CipherUtils().encrypt(createUserRequest.getLogin(), createUserRequest.getPassword()));
		User usernew = userRepository.save(userdto);
		return UserMapper.INSTANCE.userToUserDto(usernew);
	}
	
	@Override
	public Integer editUser(UserDTO editUserRequest) {
		User userdto = UserMapper.INSTANCE.userDTOtoUser(editUserRequest);
		User editUser = userRepository.save(fromEditUserRequest(userdto));
		return editUser.getId();
	}
	
}
