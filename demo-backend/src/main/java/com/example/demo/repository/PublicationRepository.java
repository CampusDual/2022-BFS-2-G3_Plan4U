package com.example.demo.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Publication;


public interface PublicationRepository extends JpaRepository<Publication, Integer>, JpaSpecificationExecutor<Publication> {

	@Query("SELECT provinceName , categoryName , COUNT(categoryName) AS TotCategories"
			+ "  FROM Publication"
			+ "  WHERE eventDate >= :initDate AND eventDate <= :endDate"
			+ "  GROUP BY provinceName , categoryName"
			+ "  ORDER BY provinceName")
	public List<Object> getDataChart(@Param("initDate") Date initDate, @Param("endDate") Date endDate);
	
}
