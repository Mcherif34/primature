package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.CongeExterneDTO;
import ma.brainit.aman.client.model.CongeExterne;
import ma.brainit.base.BaseConverter;

@Service("congeExterneDTOConverter")
public class CongeExterneDTOConverter extends BaseConverter<CongeExterne,CongeExterneDTO>{

	@Override
	@Transactional
	public List<CongeExterneDTO> convertFromDataBeanList(List<CongeExterne> list) {
		List<CongeExterneDTO> dtoList = new ArrayList<CongeExterneDTO>();
		for(CongeExterne e:list){
			CongeExterneDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public CongeExterne convertFromDTO(CongeExterneDTO dto) {
		CongeExterne entity = new CongeExterne();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public CongeExterne convertFromDTO(CongeExterne entity,CongeExterneDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public CongeExterneDTO convertFromDataBean(CongeExterne entity) {
		CongeExterneDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}