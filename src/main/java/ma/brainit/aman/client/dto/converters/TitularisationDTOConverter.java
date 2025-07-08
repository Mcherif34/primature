package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.TitularisationDTO;
import ma.brainit.aman.client.model.Titularisation;
import ma.brainit.base.BaseConverter;

@Service("titularisationDTOConverter")
public class TitularisationDTOConverter extends BaseConverter<Titularisation,TitularisationDTO>{

	@Override
	@Transactional
	public List<TitularisationDTO> convertFromDataBeanList(List<Titularisation> list) {
		List<TitularisationDTO> dtoList = new ArrayList<TitularisationDTO>();
		for(Titularisation e:list){
			TitularisationDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public Titularisation convertFromDTO(TitularisationDTO dto) {
		Titularisation entity = new Titularisation();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public Titularisation convertFromDTO(Titularisation entity,TitularisationDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public TitularisationDTO convertFromDataBean(Titularisation entity) {
		TitularisationDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}