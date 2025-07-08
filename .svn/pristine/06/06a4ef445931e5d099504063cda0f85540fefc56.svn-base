package ma.brainit.aman.administration.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.administration.model.SecEcran;

@Transactional(readOnly = true)
public interface SecEcranDao extends JpaRepository<SecEcran, Long>, JpaSpecificationExecutor<SecEcran>{
	@Query("SELECT s FROM SecEcran s WHERE s.secModule.id = :id")
	public List<SecEcran> getByModule(@Param("id") Long id);
}
