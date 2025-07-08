package ma.brainit.aman.administration.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.base.BaseConverter;
import ma.brainit.aman.administration.dto.SecUtilisateurAuthoriteDTO;
import ma.brainit.aman.administration.model.SecUtilisateurAuthorite;

@Service("secUtilisateurAuthoriteDTOConverter")
public class SecUtilisateurAuthoriteDTOConverter extends BaseConverter<SecUtilisateurAuthorite,SecUtilisateurAuthoriteDTO>{

	@Override
	@Transactional
	public List<SecUtilisateurAuthoriteDTO> convertFromDataBeanList(List<SecUtilisateurAuthorite> list){

		List<SecUtilisateurAuthoriteDTO> dtoList = new ArrayList<SecUtilisateurAuthoriteDTO>();
		for(SecUtilisateurAuthorite e:list){
			SecUtilisateurAuthoriteDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public SecUtilisateurAuthorite convertFromDTO(SecUtilisateurAuthoriteDTO dto) {

		SecUtilisateurAuthorite entity = new SecUtilisateurAuthorite();
		entity = super.convertDTOToEntity(dto, entity);

		return entity;
	}

	public SecUtilisateurAuthorite convertFromDTO(SecUtilisateurAuthorite entity,SecUtilisateurAuthoriteDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public SecUtilisateurAuthoriteDTO convertFromDataBean(SecUtilisateurAuthorite entity) {

		SecUtilisateurAuthoriteDTO dto =  super.convertEntityToDTO(entity);

		return dto;
	}

}