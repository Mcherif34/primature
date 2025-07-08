package ma.brainit.aman.administration.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.brainit.base.BaseConverter;
import ma.brainit.aman.administration.dto.SecEcranDTO;
import ma.brainit.aman.administration.model.SecAuthorite;
import ma.brainit.aman.administration.model.SecEcran;

@Service("secEcranDTOConverter")
public class SecEcranDTOConverter extends BaseConverter<SecEcran, SecEcranDTO> {


	@Autowired
	private SecAuthoriteDTOConverter secAuthoriteDTOConverter;
	
	@Override
	public List<SecEcranDTO> convertFromDataBeanList(List<SecEcran> list) {
		List<SecEcranDTO> dtoList = new ArrayList<SecEcranDTO>();
		for (SecEcran entity: list) {
			dtoList.add(convertFromDataBean(entity));
		}
		return dtoList;
	}

	@Override
	public SecEcran convertFromDTO(SecEcranDTO dto) {
		SecEcran entity = new SecEcran();
		if(dto.getIdSecAuthorites() != null){
			List<SecAuthorite> secAuthorites = new ArrayList<SecAuthorite>();
			for(Long id : dto.getIdSecAuthorites()){
				secAuthorites.add(new SecAuthorite(id));
			}
			entity.setSecAuthorites(secAuthorites);
		}
		return  super.convertDTOToEntity(dto, entity);
	}

	public SecEcran convertFromDTO(SecEcran entity, SecEcranDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public SecEcranDTO convertFromDataBean(SecEcran entity) {
		SecEcranDTO dto = super.convertEntityToDTO(entity);
		if(entity.getSecAuthorites() != null ){
			dto.setSecAuthoriteDTOs(secAuthoriteDTOConverter.convertFromDataBeanList(entity.getSecAuthorites()));
			List<Long> idSecAuthorites = new ArrayList<Long>();
			for(SecAuthorite secAuthorite : entity.getSecAuthorites()){
				idSecAuthorites.add(secAuthorite.getId());
			}
			dto.setIdSecAuthorites(idSecAuthorites);
		}
		return dto;
	}

}
