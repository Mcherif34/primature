package ma.brainit.aman.client.dao;

import ma.brainit.aman.client.model.Performer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PerformerDao extends JpaRepository<Performer, Long> {
	@Query("SELECT e FROM Performer e")
	public List<Performer> getAll();
	
	@Query("SELECT e FROM Performer e WHERE e.type = 1")
	public List<Performer> getAllGroups();
}
