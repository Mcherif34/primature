package ma.brainit.aman.administration.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.brainit.base.BaseConverter;
import ma.brainit.aman.administration.dto.SecUtilisateurDTO;
import ma.brainit.aman.administration.model.SecProfile;
import ma.brainit.aman.administration.model.SecUtilisateur;

@Service("secUtilisateurDTOConverter")
public class SecUtilisateurDTOConverter extends BaseConverter<SecUtilisateur, SecUtilisateurDTO> {

	@Autowired
	private SecProfileDTOConverter secProfileDTOConverter;
	
	@Autowired
	private SecUtilisateurAuthoriteDTOConverter secUtilisateurAuthoriteDTOConverter;
	
	@Override
	public List<SecUtilisateurDTO> convertFromDataBeanList(List<SecUtilisateur> list) {
		return super.convertFromDataBeanList(list);
	}

	@Override
	public SecUtilisateur convertFromDTO(SecUtilisateurDTO dto) {
		SecUtilisateur entity = new SecUtilisateur();
//		if(dto.getIdSecProfiles() != null){
//			List<SecProfile> secProfiles = new ArrayList<SecProfile>();
//			for(Long id : dto.getIdSecProfiles()){
//				secProfiles.add(new SecProfile(id));
//			}
//			entity.setSecProfiles(secProfiles);
//		}
//		if(dto.getSecUtilisateurAuthoriteDTOs() != null && dto.getSecUtilisateurAuthoriteDTOs().size() >0){
//			entity.setSecUtilisateurAuthorites(secUtilisateurAuthoriteDTOConverter.convertFromDtoList(dto.getSecUtilisateurAuthoriteDTOs()));
//		}
		return super.convertDTOToEntity(dto, entity);
	}

	public SecUtilisateur convertFromDTO(SecUtilisateur entity, SecUtilisateurDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public SecUtilisateurDTO convertFromDataBean(SecUtilisateur entity) {
		if (entity == null) {
			return null;
		}
		SecUtilisateurDTO dto = super.convertEntityToDTO(entity);
//		if(entity.getSecProfiles() != null ){
//			dto.setSecProfileDTOs(secProfileDTOConverter.convertFromDataBeanList(entity.getSecProfiles()));
//			List<Long> idSecProfiles = new ArrayList<Long>();
//			for(SecProfile secProfile : entity.getSecProfiles()){
//				idSecProfiles.add(secProfile.getId());
//			}
//			dto.setIdSecProfiles(idSecProfiles);
//		}
//		if(entity.getSecUtilisateurAuthorites() != null ){
//			dto.setSecUtilisateurAuthoriteDTOs(secUtilisateurAuthoriteDTOConverter.convertFromDataBeanList(entity.getSecUtilisateurAuthorites()));
//		}
		dto.setPassword(null);
		return dto;
	}

}
