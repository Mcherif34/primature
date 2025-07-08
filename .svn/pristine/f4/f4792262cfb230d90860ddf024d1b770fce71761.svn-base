package ma.brainit.aman.administration.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.administration.model.SecAuthorite;

@Transactional(readOnly = true)
public interface SecAuthoriteDao extends JpaRepository<SecAuthorite, Long>, JpaSpecificationExecutor<SecAuthorite>{
	@Query("SELECT s FROM SecAuthorite s WHERE s.secEcran.id = :id")
	public List<SecAuthorite> getByScreen(@Param("id") Long id);
}
