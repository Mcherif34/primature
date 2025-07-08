package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.DecisionDTO;
import ma.brainit.aman.client.model.Decision;
import ma.brainit.base.BaseConverter;

@Service("decisionDTOConverter")
public class DecisionDTOConverter extends BaseConverter<Decision,DecisionDTO>{

	@Override
	@Transactional
	public List<DecisionDTO> convertFromDataBeanList(List<Decision> list) {
		List<DecisionDTO> dtoList = new ArrayList<DecisionDTO>();
		for(Decision e:list){
			DecisionDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public Decision convertFromDTO(DecisionDTO dto) {
		Decision entity = new Decision();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public Decision convertFromDTO(Decision entity,DecisionDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public DecisionDTO convertFromDataBean(Decision entity) {
		DecisionDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}