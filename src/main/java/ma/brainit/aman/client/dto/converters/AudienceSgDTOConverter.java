package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.AudienceSgDTO;
import ma.brainit.aman.client.model.AudienceSg;
import ma.brainit.base.BaseConverter;

@Service("audienceSgDTOConverter")
public class AudienceSgDTOConverter extends BaseConverter<AudienceSg,AudienceSgDTO>{

	@Override
	@Transactional
	public List<AudienceSgDTO> convertFromDataBeanList(List<AudienceSg> list) {
		List<AudienceSgDTO> dtoList = new ArrayList<AudienceSgDTO>();
		for(AudienceSg e:list){
			AudienceSgDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public AudienceSg convertFromDTO(AudienceSgDTO dto) {
		AudienceSg entity = new AudienceSg();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public AudienceSg convertFromDTO(AudienceSg entity,AudienceSgDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public AudienceSgDTO convertFromDataBean(AudienceSg entity) {
		AudienceSgDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}