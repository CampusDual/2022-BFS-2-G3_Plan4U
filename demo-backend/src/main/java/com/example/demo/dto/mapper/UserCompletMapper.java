package com.example.demo.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.demo.dto.UserCompletDTO;
import com.example.demo.entity.User;

@Mapper
public interface UserCompletMapper {

	UserCompletMapper INSTANCE = Mappers.getMapper(UserCompletMapper.class);
	
	UserCompletDTO userToUserCompletDTO (User user);
	User userCompetDTOToUser(UserCompletDTO userdto);
	
}
