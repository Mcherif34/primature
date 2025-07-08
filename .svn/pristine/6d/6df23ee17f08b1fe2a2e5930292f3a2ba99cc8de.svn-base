package ma.brainit.aman.client.dao;

import ma.brainit.aman.client.model.CourrierFacture;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CourrierFactureDao extends JpaRepository<CourrierFacture, Long> {
	@Query("SELECT c FROM CourrierFacture c WHERE c.refArriveeBoc = :reference")
	public CourrierFacture getByReference(@Param("reference") String reference);
	
	@Query("SELECT COUNT(c) FROM CourrierFacture c WHERE c.wSubWork.subWorkDateCompleted IS NULL")
	public int getCurrentInvoiceCount();
	
	@Query("SELECT EXTRACT(MONTH FROM c.wSubWork.subWorkDateInitiated), COUNT(c.id) FROM CourrierFacture c WHERE c.wSubWork.subWorkDateCompleted IS NULL AND EXTRACT(YEAR FROM c.wSubWork.subWorkDateInitiated) = :year GROUP BY EXTRACT(MONTH FROM c.wSubWork.subWorkDateInitiated)")
	public List<Object> getCurrentInvoiceCountByYear(@Param("year") int year);
	
	@Query("SELECT EXTRACT(MONTH FROM c.wSubWork.subWorkDateCompleted), COUNT(c.id) FROM CourrierFacture c WHERE c.wSubWork.subWorkDateCompleted IS NOT NULL AND EXTRACT(YEAR FROM c.wSubWork.subWorkDateCompleted) = :year GROUP BY EXTRACT(MONTH FROM c.wSubWork.subWorkDateCompleted)")
	public List<Object> getCompletedInvoiceCountByYear(@Param("year") int year);
	
	@Query("SELECT COUNT(c) FROM CourrierFacture c WHERE c.wSubWork.subWorkDateCompleted IS NULL AND DATEDIFF(DAY, c.wSubWork.subWorkDateInitiated, GETDATE()) <= 4")
	public int getCurrentNotOverdueInvoiceCount();
	
	@Query("SELECT COUNT(c) FROM CourrierFacture c WHERE c.wSubWork.subWorkDateCompleted IS NULL AND DATEDIFF(DAY, c.wSubWork.subWorkDateInitiated, GETDATE()) > 4")
	public int getCurrentOverdueInvoiceCount();
	
	@Query("SELECT COUNT(c) FROM CourrierFacture c WHERE c.wSubWork.subWorkDateCompleted IS NOT NULL")
	public int getCompletedInvoiceCount();
}
