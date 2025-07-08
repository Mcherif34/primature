package ma.brainit.aman.client.dao;

import ma.brainit.aman.client.model.AdnId;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdnIdDao extends JpaRepository<AdnId, Long> {
	@Query("SELECT a FROM AdnId a WHERE a.assignDate = (SELECT MAX(assignDate) FROM AdnId WHERE prefix LIKE 'A%')")
	public AdnId getMaxAdnId();
}
