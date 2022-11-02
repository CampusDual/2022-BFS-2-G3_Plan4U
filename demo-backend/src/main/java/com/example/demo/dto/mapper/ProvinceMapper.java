package com.example.demo.dto.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import com.example.demo.dto.ProvinceDTO;
import com.example.demo.entity.Province;


@Mapper
public interface ProvinceMapper {

    ProvinceMapper INSTANCE = Mappers.getMapper( ProvinceMapper.class );
    ProvinceDTO provinceToProvinceDto(Province province);
    List<ProvinceDTO> provinceToProvinceDtoList(List<Province> provinces);
    Province provinceDTOtoProvince(ProvinceDTO provincedto);

}
