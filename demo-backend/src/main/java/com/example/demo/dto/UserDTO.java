package com.example.demo.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.example.demo.utils.Constant;

public class UserDTO {
	
	private Integer id;
	@NotEmpty(message = Constant.NAME_REQUIRED)
	private String name;
	
	@NotEmpty(message = Constant.SURNAME_REQUIRED)
	private String surname;
	
	@NotEmpty(message = Constant.NIF_REQUIRED)
	private String nif;
	
	@NotNull(message = Constant.PHONE_REQUIRED)
	private Integer phone;
	
	@Email(message= Constant.EMAIL_INVALID)
	@NotEmpty(message = Constant.EMAIL_REQUIRED)
	private String email;
	
	@NotNull(message = Constant.LOGIN_REQUIRED)
	private Integer login;
	
	@NotNull(message = Constant.PASSWORD_REQUIRED)
	private Integer password;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getNif() {
		return nif;
	}

	public void setNif(String nif) {
		this.nif = nif;
	}

	public Integer getPhone() {
		return phone;
	}

	public void setPhone(Integer phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getLogin() {
		return login;
	}

	public void setLogin(Integer login) {
		this.login = login;
	}

	public Integer getPassword() {
		return password;
	}

	public void setPassword(Integer password) {
		this.password = password;
	}

}
