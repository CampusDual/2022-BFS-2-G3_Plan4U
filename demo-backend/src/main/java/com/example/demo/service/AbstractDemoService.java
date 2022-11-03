package com.example.demo.service;

import com.borjaglez.springify.repository.filter.IPageFilter;
import com.example.demo.dto.ContactDTO;
import com.example.demo.dto.PublicationDTO;
import com.example.demo.entity.Contact;
import com.example.demo.entity.Publication;
import com.example.demo.entity.User;
import com.example.demo.exception.DemoException;
import com.example.demo.rest.model.QuerySortPaginationRequest;
import com.example.demo.utils.Constant;

public class AbstractDemoService {
	protected void checkInputParams(IPageFilter pageFilter) {
		if (pageFilter.getPageNumber() == null) {
			throw new DemoException(Constant.PAGE_INDEX_REQUIRED);
		}
		if (pageFilter.getPageSize() == null) {
			throw new DemoException(Constant.PAGE_SIZE_REQUIRED);
		}
	}
	
	protected void checkInputParams(QuerySortPaginationRequest pageFilter) {
		if (pageFilter.getPageIndex() == null) {
			throw new DemoException(Constant.PAGE_INDEX_REQUIRED);
		}
		if (pageFilter.getPageSize() == null) {
			throw new DemoException(Constant.PAGE_SIZE_REQUIRED);
		}
	}
	
	public Contact fromEditContactRequest(Contact contactRequest) {
		return new Contact(contactRequest.getId(), contactRequest.getName(), contactRequest.getSurname1(),
				contactRequest.getSurname2(), contactRequest.getPhone(), contactRequest.getEmail());
	}
	
	public Contact fromCreateContactRequest(ContactDTO contactRequest) {
		return new Contact(contactRequest.getName(), contactRequest.getSurname1(), contactRequest.getSurname2(),
				contactRequest.getPhone(), contactRequest.getEmail());
	}

	
	/*
	public Publication fromEditPublicationRequest(Publication publicationRequest) {
		return new Publication(publicationRequest.getId(), publicationRequest.getTitle(), publicationRequest.getContent(),
				publicationRequest.getCreateDate(), publicationRequest.getUserLogin());
	}
	
	public Publication fromCreatePublicationRequest(PublicationDTO publicationRequest) {
		return new Publication(publicationRequest.getTitle(), publicationRequest.getContent(), publicationRequest.getCreateDate(),
				publicationRequest.getUserLogin());
	}
	*/

	public User fromEditUserRequest(User userRequest) {
		return new User(userRequest.getId(), userRequest.getName(), userRequest.getSurname(),
				userRequest.getLogin(), userRequest.getPhone(), userRequest.getEmail(),
				userRequest.getNif());
	}
}
