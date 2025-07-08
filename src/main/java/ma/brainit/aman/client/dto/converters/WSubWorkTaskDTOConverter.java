package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.WSubWorkTaskDTO;
import ma.brainit.aman.client.model.WSubWorkTask;
import ma.brainit.base.BaseConverter;

@Service("wSubWorkTaskDTOConverter")
public class WSubWorkTaskDTOConverter extends BaseConverter<WSubWorkTask,WSubWorkTaskDTO>{

	@Override
	@Transactional
	public List<WSubWorkTaskDTO> convertFromDataBeanList(List<WSubWorkTask> list) {
		List<WSubWorkTaskDTO> dtoList = new ArrayList<WSubWorkTaskDTO>();
		for(WSubWorkTask e:list){
			WSubWorkTaskDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public WSubWorkTask convertFromDTO(WSubWorkTaskDTO dto) {
		WSubWorkTask entity = new WSubWorkTask();
		entity = super.convertDTOToEntity(dto, entity);
		
		return entity;
	}

	public WSubWorkTask convertFromDTO(WSubWorkTask entity,WSubWorkTaskDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public WSubWorkTaskDTO convertFromDataBean(WSubWorkTask entity) {
		WSubWorkTaskDTO dto =  super.convertEntityToDTO(entity);
		
		return dto;
	}

}