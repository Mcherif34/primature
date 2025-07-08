package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.CourrierDTO;
import ma.brainit.aman.client.model.Courrier;
import ma.brainit.base.BaseConverter;

@Service("courrierDTOConverter")
public class CourrierDTOConverter extends BaseConverter<Courrier,CourrierDTO>{

	@Override
	@Transactional
	public List<CourrierDTO> convertFromDataBeanList(List<Courrier> list) {
		List<CourrierDTO> dtoList = new ArrayList<CourrierDTO>();
		for(Courrier e:list){
			CourrierDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public Courrier convertFromDTO(CourrierDTO dto) {
		Courrier entity = new Courrier();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public Courrier convertFromDTO(Courrier entity,CourrierDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public CourrierDTO convertFromDataBean(Courrier entity) {
		CourrierDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}