package ma.brainit.aman.administration.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.administration.model.SecAuthorite;
import ma.brainit.aman.administration.model.SecUtilisateur;
import ma.brainit.aman.administration.model.SecUtilisateurAuthorite;
import ma.brainit.aman.administration.model.SecUtilisateurAuthoritePK;

@Transactional(readOnly = true)
public interface SecUtilisateurAuthoriteDao extends JpaRepository<SecUtilisateurAuthorite, SecUtilisateurAuthoritePK>, JpaSpecificationExecutor<SecUtilisateurAuthoritePK>{
	
	
	@Query("SELECT ua.secAuthorite FROM SecUtilisateurAuthorite ua JOIN ua.secUtilisateur u WHERE u.id = :secUtilisateurId")
	List<SecAuthorite> findAuthoritesNotifByUtilisateur(@Param("secUtilisateurId") Long secUtilisateurId);
	

	
}