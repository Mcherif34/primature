package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.NominationDTO;
import ma.brainit.aman.client.model.Nomination;
import ma.brainit.base.BaseConverter;

@Service("nominationDTOConverter")
public class NominationDTOConverter extends BaseConverter<Nomination,NominationDTO>{

	@Override
	@Transactional
	public List<NominationDTO> convertFromDataBeanList(List<Nomination> list) {
		List<NominationDTO> dtoList = new ArrayList<NominationDTO>();
		for(Nomination e:list){
			NominationDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public Nomination convertFromDTO(NominationDTO dto) {
		Nomination entity = new Nomination();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public Nomination convertFromDTO(Nomination entity,NominationDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public NominationDTO convertFromDataBean(Nomination entity) {
		NominationDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}