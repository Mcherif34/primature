package ma.brainit.aman.administration.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.brainit.base.BaseConverter;
import ma.brainit.aman.administration.dto.SecProfileDTO;
import ma.brainit.aman.administration.model.SecAuthorite;
import ma.brainit.aman.administration.model.SecProfile;

@Service("secProfileDTOConverter")
public class SecProfileDTOConverter extends BaseConverter<SecProfile, SecProfileDTO> {

	@Autowired
	private SecAuthoriteDTOConverter secAuthoriteDTOConverter;
	
	@Autowired
	private SecUtilisateurDTOConverter secUtilisateurDTOConverter;
	
	@Override
	public List<SecProfileDTO> convertFromDataBeanList(List<SecProfile> list) {
		return super.convertFromDataBeanList(list);
	}

	@Override
	public SecProfile convertFromDTO(SecProfileDTO dto) {
		SecProfile entity = super.convertDTOToEntity(dto, new SecProfile());
		if(dto.getIdSecAuthorites() != null){
			List<SecAuthorite> secAuthorites = new ArrayList<SecAuthorite>();
			for(Long id : dto.getIdSecAuthorites()){
				secAuthorites.add(new SecAuthorite(id));
			}
			entity.setSecAuthorites(secAuthorites);
		}
		if(dto.getSecUtilisateurDTOs() != null && dto.getSecUtilisateurDTOs().size() > 0) {
			entity.setSecUtilisateurs(secUtilisateurDTOConverter.convertFromDtoList(dto.getSecUtilisateurDTOs()));
		}
		if(dto.getSecAuthoriteDTOs() != null && dto.getSecAuthoriteDTOs().size() > 0) {
			entity.setSecAuthorites(secAuthoriteDTOConverter.convertFromDtoList(dto.getSecAuthoriteDTOs()));
		}
		return  entity;
	}

	public SecProfile convertFromDTO(SecProfile entity, SecProfileDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public SecProfileDTO convertFromDataBean(SecProfile entity) {
		SecProfileDTO dto = super.convertEntityToDTO(entity);
		if(entity.getSecAuthorites() != null ){
			dto.setSecAuthoriteDTOs(secAuthoriteDTOConverter.convertFromDataBeanList(entity.getSecAuthorites()));
			List<Long> idSecAuthorites = new ArrayList<Long>();
			for(SecAuthorite secAuthorite : entity.getSecAuthorites()){
				idSecAuthorites.add(secAuthorite.getId());
			}
			dto.setIdSecAuthorites(idSecAuthorites);
		}
		if(entity.getSecUtilisateurs() != null ){
			dto.setSecUtilisateurDTOs(secUtilisateurDTOConverter.convertFromDataBeanList(entity.getSecUtilisateurs()));
		}
		return dto;
	}

}
