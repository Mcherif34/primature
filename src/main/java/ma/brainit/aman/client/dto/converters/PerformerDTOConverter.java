package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.PerformerDTO;
import ma.brainit.aman.client.model.Performer;
import ma.brainit.base.BaseConverter;

@Service("performerDTOConverter")
public class PerformerDTOConverter extends BaseConverter<Performer,PerformerDTO>{

	@Override
	@Transactional
	public List<PerformerDTO> convertFromDataBeanList(List<Performer> list) {
		List<PerformerDTO> dtoList = new ArrayList<PerformerDTO>();
		for(Performer e:list){
			PerformerDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public Performer convertFromDTO(PerformerDTO dto) {
		Performer entity = new Performer();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public Performer convertFromDTO(Performer entity,PerformerDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public PerformerDTO convertFromDataBean(Performer entity) {
		PerformerDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}