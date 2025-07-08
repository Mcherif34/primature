package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.MissionExterneDTO;
import ma.brainit.aman.client.model.MissionExterne;
import ma.brainit.base.BaseConverter;

@Service("missionExterneDTOConverter")
public class MissionExterneDTOConverter extends BaseConverter<MissionExterne,MissionExterneDTO>{

	@Override
	@Transactional
	public List<MissionExterneDTO> convertFromDataBeanList(List<MissionExterne> list) {
		List<MissionExterneDTO> dtoList = new ArrayList<MissionExterneDTO>();
		for(MissionExterne e:list){
			MissionExterneDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public MissionExterne convertFromDTO(MissionExterneDTO dto) {
		MissionExterne entity = new MissionExterne();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public MissionExterne convertFromDTO(MissionExterne entity,MissionExterneDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public MissionExterneDTO convertFromDataBean(MissionExterne entity) {
		MissionExterneDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}