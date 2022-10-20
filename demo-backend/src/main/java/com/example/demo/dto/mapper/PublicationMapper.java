package com.example.demo.dto.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.demo.dto.PublicationDTO;
import com.example.demo.entity.Publication;

@Mapper
public interface PublicationMapper {

    PublicationMapper INSTANCE = Mappers.getMapper( PublicationMapper.class );
 
    PublicationDTO publicationToPublicationDto(Publication publication);
    
    List<PublicationDTO> publicationToPublicationDtoList(List<Publication> publications);
    
    Publication publicationDTOtoPublication(PublicationDTO publicationdto);


}
