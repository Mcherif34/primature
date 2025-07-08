package ma.brainit.aman.client.dao;

import ma.brainit.aman.client.model.Expediteur;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExpediteurDao extends JpaRepository<Expediteur, Long> {
	@Query("SELECT e FROM Expediteur e WHERE e.nom != ''")
	public List<Expediteur> getAll();
	
	@Query("SELECT e.nom FROM Expediteur e WHERE e.nom != ''")
	public List<String> getAllName();
	
	@Query("SELECT e FROM Expediteur e WHERE e.nom = :name")
	public Expediteur getByName(@Param("name") String name);
}
