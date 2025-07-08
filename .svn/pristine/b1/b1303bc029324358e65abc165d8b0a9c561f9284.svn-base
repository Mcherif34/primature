package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.ExpediteurDTO;
import ma.brainit.aman.client.model.Expediteur;
import ma.brainit.base.BaseConverter;

@Service("expediteurDTOConverter")
public class ExpediteurDTOConverter extends BaseConverter<Expediteur,ExpediteurDTO>{

	@Override
	@Transactional
	public List<ExpediteurDTO> convertFromDataBeanList(List<Expediteur> list) {
		List<ExpediteurDTO> dtoList = new ArrayList<ExpediteurDTO>();
		for(Expediteur e:list){
			ExpediteurDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public Expediteur convertFromDTO(ExpediteurDTO dto) {
		Expediteur entity = new Expediteur();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public Expediteur convertFromDTO(Expediteur entity,ExpediteurDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public ExpediteurDTO convertFromDataBean(Expediteur entity) {
		ExpediteurDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}