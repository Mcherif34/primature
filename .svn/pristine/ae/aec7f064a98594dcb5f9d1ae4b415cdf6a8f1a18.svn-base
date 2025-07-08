package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.DTreeDTO;
import ma.brainit.aman.client.model.DTree;
import ma.brainit.base.BaseConverter;

@Service("DTreeDTOConverter")
public class DTreeDTOConverter extends BaseConverter<DTree,DTreeDTO>{

	@Override
	@Transactional
	public List<DTreeDTO> convertFromDataBeanList(List<DTree> list) {
		List<DTreeDTO> dtoList = new ArrayList<DTreeDTO>();
		for(DTree e:list){
			DTreeDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public DTree convertFromDTO(DTreeDTO dto) {
		DTree entity = new DTree();
		entity = super.convertDTOToEntity(dto, entity);
		
		return entity;
	}

	public DTree convertFromDTO(DTree entity,DTreeDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public DTreeDTO convertFromDataBean(DTree entity) {
		DTreeDTO dto =  super.convertEntityToDTO(entity);
		
		return dto;
	}

}