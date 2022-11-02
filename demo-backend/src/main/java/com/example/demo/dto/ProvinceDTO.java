package com.example.demo.dto;


import javax.validation.constraints.NotEmpty;


import com.example.demo.utils.Constant;

public class ProvinceDTO {

	private Integer id;
	
	@NotEmpty(message = Constant.NAME_REQUIRED) // **********CREAR Y CAMBIAR EN CONSTANT CODE_REQUIRED*************************
	private String provinceCode;
	
	@NotEmpty(message = Constant.NAME_REQUIRED)
	private String provinceName;

	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getProvinceCode() {
		return provinceCode;
	}

	public void setProvinceCode(String provinceCode) {
		this.provinceCode = provinceCode;
	}

	public String getProvinceName() {
		return provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}
	

}
