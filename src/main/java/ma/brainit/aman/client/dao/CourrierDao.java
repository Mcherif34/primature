package ma.brainit.aman.client.dao;

import ma.brainit.aman.client.model.Courrier;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CourrierDao extends JpaRepository<Courrier, Long> {
	@Query("SELECT c FROM Courrier c WHERE c.type = :type")
	public Courrier getByType(@Param("type") String type);
	
	@Query("SELECT c FROM Courrier c WHERE c.type = :type AND c.year = :year")
	public Courrier getByTypeByYear(@Param("type") String type, @Param("year") Integer year);
	
	@Query("SELECT c FROM Courrier c WHERE c.type = :type AND c.month = :month AND c.year = :year")
	public Courrier getByTypeByMonthByYear(@Param("type") String type, @Param("month") Integer month, @Param("year") Integer year);
}
