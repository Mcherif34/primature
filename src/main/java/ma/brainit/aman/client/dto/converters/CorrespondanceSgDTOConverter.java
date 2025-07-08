package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.CorrespondanceSgDTO;
import ma.brainit.aman.client.model.CorrespondanceSg;
import ma.brainit.base.BaseConverter;

@Service("correspondanceSgDTOConverter")
public class CorrespondanceSgDTOConverter extends BaseConverter<CorrespondanceSg,CorrespondanceSgDTO>{

	@Override
	@Transactional
	public List<CorrespondanceSgDTO> convertFromDataBeanList(List<CorrespondanceSg> list) {
		List<CorrespondanceSgDTO> dtoList = new ArrayList<CorrespondanceSgDTO>();
		for(CorrespondanceSg e:list){
			CorrespondanceSgDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public CorrespondanceSg convertFromDTO(CorrespondanceSgDTO dto) {
		CorrespondanceSg entity = new CorrespondanceSg();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public CorrespondanceSg convertFromDTO(CorrespondanceSg entity,CorrespondanceSgDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public CorrespondanceSgDTO convertFromDataBean(CorrespondanceSg entity) {
		CorrespondanceSgDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}