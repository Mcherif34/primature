package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.CourrierFactureDTO;
import ma.brainit.aman.client.model.CourrierFacture;
import ma.brainit.base.BaseConverter;

@Service("courrierFactureDTOConverter")
public class CourrierFactureDTOConverter extends BaseConverter<CourrierFacture,CourrierFactureDTO>{

	@Override
	@Transactional
	public List<CourrierFactureDTO> convertFromDataBeanList(List<CourrierFacture> list) {
		List<CourrierFactureDTO> dtoList = new ArrayList<CourrierFactureDTO>();
		for(CourrierFacture e:list){
			CourrierFactureDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public CourrierFacture convertFromDTO(CourrierFactureDTO dto) {
		CourrierFacture entity = new CourrierFacture();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public CourrierFacture convertFromDTO(CourrierFacture entity,CourrierFactureDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public CourrierFactureDTO convertFromDataBean(CourrierFacture entity) {
		CourrierFactureDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}