package ma.brainit.aman.administration.dto.converters;

import java.util.List;
import org.springframework.stereotype.Service;

import ma.brainit.base.BaseConverter;
import ma.brainit.aman.administration.dto.SecAuthoriteDTO;
import ma.brainit.aman.administration.model.SecAuthorite;

@Service("secAuthoriteDTOConverter")
public class SecAuthoriteDTOConverter extends BaseConverter<SecAuthorite, SecAuthoriteDTO> {

	
	@Override
	public List<SecAuthoriteDTO> convertFromDataBeanList(List<SecAuthorite> list) {
		return super.convertFromDataBeanList(list);
	}

	@Override
	public SecAuthorite convertFromDTO(SecAuthoriteDTO dto) {
		SecAuthorite entity = new SecAuthorite();
		return  super.convertDTOToEntity(dto, entity);
	}

	public SecAuthorite convertFromDTO(SecAuthorite entity, SecAuthoriteDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public SecAuthoriteDTO convertFromDataBean(SecAuthorite entity) {
		return super.convertEntityToDTO(entity);
	}

}
