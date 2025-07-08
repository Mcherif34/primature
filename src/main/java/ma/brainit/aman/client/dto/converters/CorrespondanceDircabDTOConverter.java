package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.CorrespondanceDircabDTO;
import ma.brainit.aman.client.model.CorrespondanceDircab;
import ma.brainit.base.BaseConverter;

@Service("correspondanceDircabDTOConverter")
public class CorrespondanceDircabDTOConverter extends BaseConverter<CorrespondanceDircab,CorrespondanceDircabDTO>{

	@Override
	@Transactional
	public List<CorrespondanceDircabDTO> convertFromDataBeanList(List<CorrespondanceDircab> list) {
		List<CorrespondanceDircabDTO> dtoList = new ArrayList<CorrespondanceDircabDTO>();
		for(CorrespondanceDircab e:list){
			CorrespondanceDircabDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public CorrespondanceDircab convertFromDTO(CorrespondanceDircabDTO dto) {
		CorrespondanceDircab entity = new CorrespondanceDircab();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public CorrespondanceDircab convertFromDTO(CorrespondanceDircab entity,CorrespondanceDircabDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public CorrespondanceDircabDTO convertFromDataBean(CorrespondanceDircab entity) {
		CorrespondanceDircabDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}