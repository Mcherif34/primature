package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.WSubWorkDTO;
import ma.brainit.aman.client.model.WSubWork;
import ma.brainit.base.BaseConverter;

@Service("wSubWorkDTOConverter")
public class WSubWorkDTOConverter extends BaseConverter<WSubWork,WSubWorkDTO>{

	@Autowired
	private CourrierFactureDTOConverter courrierFactureDTOConverter;
	
	@Override
	@Transactional
	public List<WSubWorkDTO> convertFromDataBeanList(List<WSubWork> list) {
		List<WSubWorkDTO> dtoList = new ArrayList<WSubWorkDTO>();
		for(WSubWork e:list){
			WSubWorkDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public WSubWork convertFromDTO(WSubWorkDTO dto) {
		WSubWork entity = new WSubWork();
		entity = super.convertDTOToEntity(dto, entity);
		
		return entity;
	}

	public WSubWork convertFromDTO(WSubWork entity,WSubWorkDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public WSubWorkDTO convertFromDataBean(WSubWork entity) {
		WSubWorkDTO dto =  super.convertEntityToDTO(entity);
		
		return dto;
	}

}