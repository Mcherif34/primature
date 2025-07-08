package ma.brainit.aman.client.dao;

import ma.brainit.aman.client.model.CourrierDepart;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CourrierDepartDao extends JpaRepository<CourrierDepart, Long> {
	@Query("SELECT c FROM CourrierDepart c WHERE c.refDepartBoc = :reference")
	public CourrierDepart getByReference(@Param("reference") String reference);
	
	@Query("SELECT COUNT(c) FROM CourrierDepart c WHERE c.wSubWork.subWorkDateCompleted IS NULL")
	public int getCurrentDepartCount();
	
	@Query("SELECT EXTRACT(MONTH FROM c.wSubWork.subWorkDateInitiated), COUNT(c.id) FROM CourrierDepart c WHERE c.wSubWork.subWorkDateCompleted IS NULL AND EXTRACT(YEAR FROM c.wSubWork.subWorkDateInitiated) = :year GROUP BY EXTRACT(MONTH FROM c.wSubWork.subWorkDateInitiated)")
	public List<Object> getCurrentDepartCountByYear(@Param("year") int year);
	
	@Query("SELECT EXTRACT(MONTH FROM c.wSubWork.subWorkDateCompleted), COUNT(c.id) FROM CourrierDepart c WHERE c.wSubWork.subWorkDateCompleted IS NOT NULL AND EXTRACT(YEAR FROM c.wSubWork.subWorkDateCompleted) = :year GROUP BY EXTRACT(MONTH FROM c.wSubWork.subWorkDateCompleted)")
	public List<Object> getCompletedDepartCountByYear(@Param("year") int year);
	
	@Query("SELECT COUNT(c) FROM CourrierDepart c WHERE c.wSubWork.subWorkDateCompleted IS NULL AND DATEDIFF(DAY, c.wSubWork.subWorkDateInitiated, GETDATE()) <= 4")
	public int getCurrentNotOverdueDepartCount();
	
	@Query("SELECT COUNT(c) FROM CourrierDepart c WHERE c.wSubWork.subWorkDateCompleted IS NULL AND DATEDIFF(DAY, c.wSubWork.subWorkDateInitiated, GETDATE()) > 4")
	public int getCurrentOverdueDepartCount();
	
	@Query("SELECT COUNT(c) FROM CourrierDepart c WHERE c.wSubWork.subWorkDateCompleted IS NOT NULL")
	public int getCompletedDepartCount();
}
