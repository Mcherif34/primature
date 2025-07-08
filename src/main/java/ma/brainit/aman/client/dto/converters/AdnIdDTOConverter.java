package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.AdnIdDTO;
import ma.brainit.aman.client.model.AdnId;
import ma.brainit.base.BaseConverter;

@Service("AdnIdDTOConverter")
public class AdnIdDTOConverter extends BaseConverter<AdnId,AdnIdDTO>{

	@Override
	@Transactional
	public List<AdnIdDTO> convertFromDataBeanList(List<AdnId> list) {
		List<AdnIdDTO> dtoList = new ArrayList<AdnIdDTO>();
		for(AdnId e:list){
			AdnIdDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public AdnId convertFromDTO(AdnIdDTO dto) {
		AdnId entity = new AdnId();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public AdnId convertFromDTO(AdnId entity,AdnIdDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public AdnIdDTO convertFromDataBean(AdnId entity) {
		AdnIdDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}