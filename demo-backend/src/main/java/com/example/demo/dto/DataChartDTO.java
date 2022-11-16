package com.example.demo.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class DataChartDTO {

	@JsonFormat(timezone = "Europe/Madrid")
	private Date iniDate;
	
	@JsonFormat(timezone = "Europe/Madrid")
	private Date endDate;

	public Date getIniDate() {
		return iniDate;
	}

	public void setIniDate(Date iniDate) {
		this.iniDate = iniDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	
}
