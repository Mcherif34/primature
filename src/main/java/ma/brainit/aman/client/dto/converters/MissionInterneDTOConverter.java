package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.MissionInterneDTO;
import ma.brainit.aman.client.model.MissionInterne;
import ma.brainit.base.BaseConverter;

@Service("missionInterneDTOConverter")
public class MissionInterneDTOConverter extends BaseConverter<MissionInterne,MissionInterneDTO>{

	@Override
	@Transactional
	public List<MissionInterneDTO> convertFromDataBeanList(List<MissionInterne> list) {
		List<MissionInterneDTO> dtoList = new ArrayList<MissionInterneDTO>();
		for(MissionInterne e:list){
			MissionInterneDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public MissionInterne convertFromDTO(MissionInterneDTO dto) {
		MissionInterne entity = new MissionInterne();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public MissionInterne convertFromDTO(MissionInterne entity,MissionInterneDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public MissionInterneDTO convertFromDataBean(MissionInterne entity) {
		MissionInterneDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}