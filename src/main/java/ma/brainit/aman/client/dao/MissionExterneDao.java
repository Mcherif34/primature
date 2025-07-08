package ma.brainit.aman.client.dao;

import ma.brainit.aman.client.model.MissionExterne;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MissionExterneDao extends JpaRepository<MissionExterne, Long> {
	@Query("SELECT c FROM MissionExterne c WHERE c.referenceCourrier = :reference")
	public MissionExterne getByReference(@Param("reference") String reference);
	
	@Query("SELECT c FROM MissionExterne c WHERE c.wSubWork.id = :volumeId")
	public MissionExterne getByVolumeId(@Param("volumeId") Long volumeId);
	
	@Query("SELECT COUNT(c) FROM MissionExterne c WHERE c.wSubWork.subWorkDateCompleted IS NULL AND c.status = 2 AND c.performer.name LIKE CONCAT('%', :term, '%')")
	public int getCurrentCountByEntity(@Param("term") String term);
	
	@Query("SELECT COUNT(c) FROM MissionExterne c WHERE c.wSubWork.subWorkDateCompleted IS NULL AND c.status = 2")
	public int getCurrentCount();
	
	@Query("SELECT COUNT(c) FROM MissionExterne c WHERE c.wSubWork.subWorkDateCompleted IS NOT NULL")
	public int getCompletedCount();
	
	@Query("SELECT COUNT(c) FROM MissionExterne c WHERE c.wSubWork.subWorkDateCompleted IS NULL AND c.status = 2 AND c.taskTitle LIKE '%[Rejet]%'")
	public int getRejectedCount();
	
	@Query("SELECT COUNT(c) FROM MissionExterne c WHERE c.wSubWork.subWorkDateCompleted IS NULL AND c.status = 2 AND c.performer.name = :name")
	public int getCurrentCountByProfile(@Param("name") String name);
	
	@Query("SELECT EXTRACT(MONTH FROM c.wSubWork.subWorkDateInitiated), COUNT(c.id) FROM MissionExterne c WHERE c.wSubWork.subWorkDateCompleted IS NULL AND EXTRACT(YEAR FROM c.wSubWork.subWorkDateInitiated) = :year GROUP BY EXTRACT(MONTH FROM c.wSubWork.subWorkDateInitiated)")
	public List<Object> getCurrentCountByYear(@Param("year") int year);
	
	@Query("SELECT EXTRACT(MONTH FROM c.wSubWork.subWorkDateCompleted), COUNT(c.id) FROM MissionExterne c WHERE c.wSubWork.subWorkDateCompleted IS NOT NULL AND EXTRACT(YEAR FROM c.wSubWork.subWorkDateCompleted) = :year GROUP BY EXTRACT(MONTH FROM c.wSubWork.subWorkDateCompleted)")
	public List<Object> getCompletedCountByYear(@Param("year") int year);
	
	@Query("SELECT COUNT(c) FROM MissionExterne c WHERE c.wSubWork.subWorkDateCompleted IS NULL AND DATEDIFF(DAY, c.wSubWork.subWorkDateInitiated, GETDATE()) <= 4")
	public int getCurrentNotOverdueClassiqueCount();
	
	@Query("SELECT COUNT(c) FROM MissionExterne c WHERE c.wSubWork.subWorkDateCompleted IS NULL AND DATEDIFF(DAY, c.wSubWork.subWorkDateInitiated, GETDATE()) > 4")
	public int getCurrentOverdueClassiqueCount();
	
	@Query("SELECT COUNT(c) FROM MissionExterne c WHERE c.wSubWork.subWorkDateCompleted IS NOT NULL")
	public int getCompletedClassiqueCount();
}
