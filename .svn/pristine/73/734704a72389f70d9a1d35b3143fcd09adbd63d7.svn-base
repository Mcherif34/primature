package ma.brainit.aman.administration.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.administration.model.SecUtilisateur;

@Transactional(readOnly = true)
public interface SecUtilisateurDao
		extends JpaRepository<SecUtilisateur, Long>, JpaSpecificationExecutor<SecUtilisateur> {

	@Query("SELECT u FROM SecUtilisateur u WHERE LOWER(u.login) = LOWER(:login)")
	SecUtilisateur findByLogin(@Param("login") String login);
	
	@Query("SELECT u FROM SecUtilisateur u WHERE LOWER(u.token) = LOWER(:token)")
	SecUtilisateur findByToken(@Param("token") String token);
	
	@Query("SELECT u FROM SecUtilisateur u JOIN u.secProfiles p WHERE p.id = :profileId")
	List<SecUtilisateur> findByProfile(@Param("profileId") Long profileId);

	@Query("SELECT u FROM SecUtilisateur u WHERE u.secProfile = null")
	List<SecUtilisateur> getAllUsersWithoutProfile();
	
	@Query("SELECT u FROM SecUtilisateur u WHERE u.secProfile.id = 4")
	List<SecUtilisateur> getRecoveryAll();
	
}
