package ma.brainit.aman.administration.service;

import java.util.List;

import ma.brainit.aman.administration.dto.SecUtilisateurAuthoriteDTO;
import ma.brainit.aman.administration.model.SecUtilisateurAuthoritePK;

public interface SecUtilisateurAuthoriteService {
	
	String getPage(Integer page, Integer limit, String sort, String direction, String search);
	
	String getPageByUtilisateur(Integer page, Integer limit, String sort, String direction, String search, Long secUtilisateurId);
	
	SecUtilisateurAuthoriteDTO save(SecUtilisateurAuthoriteDTO dto);

	SecUtilisateurAuthoriteDTO load(SecUtilisateurAuthoritePK id);

	void delete(SecUtilisateurAuthoritePK id);
	
	List<SecUtilisateurAuthoriteDTO> getAll();
	
	List<Long> getAuthoritesIdByUtilisateur(Long secUtilisateurId);
	
}
