package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.CourrierDepartDTO;
import ma.brainit.aman.client.model.CourrierDepart;
import ma.brainit.base.BaseConverter;

@Service("courrierDepartDTOConverter")
public class CourrierDepartDTOConverter extends BaseConverter<CourrierDepart,CourrierDepartDTO>{

	@Override
	@Transactional
	public List<CourrierDepartDTO> convertFromDataBeanList(List<CourrierDepart> list) {
		List<CourrierDepartDTO> dtoList = new ArrayList<CourrierDepartDTO>();
		for(CourrierDepart e:list){
			CourrierDepartDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public CourrierDepart convertFromDTO(CourrierDepartDTO dto) {
		CourrierDepart entity = new CourrierDepart();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public CourrierDepart convertFromDTO(CourrierDepart entity,CourrierDepartDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public CourrierDepartDTO convertFromDataBean(CourrierDepart entity) {
		CourrierDepartDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}