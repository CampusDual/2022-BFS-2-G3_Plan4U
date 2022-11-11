package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.borjaglez.springify.repository.specification.SpecificationBuilder;
import com.example.demo.dto.PublicationDTO;
import com.example.demo.dto.UserCompletDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.dto.mapper.PublicationMapper;
import com.example.demo.dto.mapper.UserCompletMapper;
import com.example.demo.dto.mapper.UserMapper;
import com.example.demo.entity.Publication;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.rest.response.DataSourceRESTResponse;
import com.example.demo.utils.CipherUtils;


@Service
public class UserServiceImpl extends AbstractDemoService implements IUserService {

	/**
	 * Especificación JPA para {@link User}.
	 */
	@Autowired
	private UserRepository userRepository;


	@Override
	public UserDTO getUser(String login) {
		User user = userRepository.findByLogin(login).orElse(null);	
		user.setPassword(new CipherUtils().decrypt(user.getLogin(), user.getPassword()));
		return UserMapper.INSTANCE.userToUserDto(user);
	}


	@Override
	@Transactional
	public UserDTO createUser(UserCompletDTO createUserRequest) {
		User userdto = UserCompletMapper.INSTANCE.userCompletDTOToUser(createUserRequest);
		userdto.setPassword(new CipherUtils().encrypt(createUserRequest.getLogin(), createUserRequest.getPassword()));
		User usernew = userRepository.save(userdto);
		return UserMapper.INSTANCE.userToUserDto(usernew);
	}
	
	@Override
	public Integer editUser(UserCompletDTO editUserRequest) {
		User userdto = UserCompletMapper.INSTANCE.userCompletDTOToUser(editUserRequest);
		userdto.setPassword(new CipherUtils().encrypt(editUserRequest.getLogin(), editUserRequest.getPassword()));
		User editUser = userRepository.save(userdto);
		return editUser.getId();
	}
	
   @Override
    @Transactional(readOnly = true)
    public DataSourceRESTResponse<List<UserDTO>> getUsers(AnyPageFilter pageFilter) {
        checkInputParams(pageFilter);
        Page<User> users = SpecificationBuilder.selectDistinctFrom(userRepository).where(pageFilter)
                .findAll(pageFilter); 
        DataSourceRESTResponse<List<UserDTO>> datares = new DataSourceRESTResponse<>();
        datares.setTotalElements((int) users.getTotalElements());
        List<UserDTO> userdto = UserMapper.INSTANCE.userToUserDtoList(users.getContent());
        datares.setData(userdto);
        return datares;
    }
   
   @Override
    public List<UserDTO> findAll() {
        List<User> userdto = userRepository.findAll();
        return UserMapper.INSTANCE.userToUserDtoList(userdto);
    }
}
