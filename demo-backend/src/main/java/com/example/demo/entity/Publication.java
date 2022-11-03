package com.example.demo.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "publications")
public class Publication implements Serializable{


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	

	@Column(nullable=false)
	private String title;
	
	
	@Column(nullable=false)
	private String content;
	

//	@Column(nullable=false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createDate;
	@PrePersist
	public void prePersist() {
		createDate = new Date();
	}

	
	@Column(nullable=false, name = "user_login")
	private String userLogin;
	
	@Column(name = "category_id")
	private Integer categoryId;
	
	@Column(name = "province_id")
	private Integer provinceId;

	
	public Publication() {
	}
	
	public Publication(String title, String content, Date createDate, String userLogin, Integer categoryId, Integer provinceId) {
		this.title = title;
		this.content = content;
		this.createDate = createDate;
		this.userLogin = userLogin;
		this.categoryId = categoryId;
		this.provinceId = provinceId;
	}

	public Publication(Integer id, String title, String content, Date createDate, String userLogin, Integer categoryId, Integer provinceId) {
		this(title, content, createDate, userLogin, categoryId, provinceId);
		this.id = id;
	}

	public Publication(String title, String content, String userLogin) {	// potencialmente inútil; si no añadir provincia y categoría
		this.title = title;
		this.content = content;
		this.userLogin = userLogin;
	}
	
	public Publication(Integer id, String title, String content, String userLogin) {	// potencialmente inútil; si no añadir provincia y categoría
		this(title, content, userLogin);
		this.id = id;
	}
	
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

	
	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public Integer getProvinceId() {
		return provinceId;
	}

	public void setProvinceId(Integer provinceId) {
		this.provinceId = provinceId;
	}


	private static final long serialVersionUID = 1L;
}