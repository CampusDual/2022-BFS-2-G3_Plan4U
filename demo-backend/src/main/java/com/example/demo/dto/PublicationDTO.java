package com.example.demo.dto;

import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.example.demo.utils.Constant;

public class PublicationDTO {

	private Integer id;
	
	@NotEmpty(message = Constant.TITLE_REQUIRED)
	private String title;
	
	@NotEmpty(message = Constant.CONTENT_REQUIRED)
	private String content;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date createDate;
	
	@NotNull(message = Constant.USERID_REQUIRED)
	private String userLogin;

	//@NotEmpty(message = Constant.CONTENT_REQUIRED)
	private String categoryName;
	
	//@NotEmpty(message = Constant.CONTENT_REQUIRED)
	private String provinceName;
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	

	public String getUserLogin() {
		return userLogin;
	}

	public void setUserLogin(String userLogin) {
		this.userLogin = userLogin;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getProvinceName() {
		return provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}

	
	

}
