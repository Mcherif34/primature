package ma.brainit.aman.administration.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import ma.brainit.aman.administration.dto.SecUtilisateurDTO;
import ma.brainit.aman.administration.model.SecUtilisateur;

public interface SecUtilisateurService extends UserDetailsService {

	SecUtilisateurDTO save(SecUtilisateurDTO secUtilisateurDTO);

	SecUtilisateurDTO reset(SecUtilisateurDTO secUtilisateurDTO);
	
	SecUtilisateurDTO load(Long id);

	void delete(Long id);
	
	Boolean changePassword(SecUtilisateurDTO dto);

	List<SecUtilisateurDTO> findAll();
	
	List<SecUtilisateurDTO> getRecoveryAll();
	
	List<SecUtilisateurDTO> getAllUsersWithoutProfile();

	SecUtilisateurDTO findByLogin(String login);
	
	SecUtilisateurDTO findByToken(String token);

	SecUtilisateurDTO getCurrentUser();

	SecUtilisateurDTO findCurrentUser();

	String getPaginator(Integer page, Integer limit, String sort, String direction, String search);
	
	String getPaginator(Integer page, Integer limit, String sort, String direction, String search, Long profileId);

	SecUtilisateur findUserByLogin(String login);

	void setLastConnection(SecUtilisateur secUtilisateur);

	Boolean changePassword(String token, SecUtilisateurDTO dto);
	
	List<SecUtilisateurDTO> findByProfile(Long id);
	
}
