package ma.brainit.aman.administration.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.administration.model.SecProfile;

@Transactional(readOnly = true)
public interface SecProfileDao extends JpaRepository<SecProfile, Long>, JpaSpecificationExecutor<SecProfile>{
	@Query("SELECT DISTINCT p.module FROM SecProfile p JOIN p.secUtilisateurs u WHERE p.module != null AND u.id = :userId")
	List<String> getModulesByUser(@Param("userId") Long userId);
	
	@Query("SELECT p FROM SecProfile p WHERE p.performer.id = :id")
	SecProfile getByPerformer(@Param("id") Long id);
	
	@Query("SELECT p FROM SecProfile p WHERE p.performer.id IN (SELECT id FROM Performer WHERE name LIKE '%Conseiller%')")
	List<SecProfile> getAllConseillers();
	
}
