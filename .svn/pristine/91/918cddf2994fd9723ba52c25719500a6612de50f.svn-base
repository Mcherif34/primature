package ma.brainit.aman.client.dao;

import ma.brainit.aman.client.model.WSubWorkTask;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WSubWorkTaskDao extends JpaRepository<WSubWorkTask, Long> {
	@Query("SELECT w FROM WSubWorkTask w WHERE w.subWorkTaskDateReady = (SELECT MAX(subWorkTaskDateReady) FROM WSubWorkTask WHERE wWork.id = :wWorkId) and w.performer IS NOT NULL")
	public WSubWorkTask getByWWork(@Param("wWorkId") Long wWorkId);
	
	@Query("SELECT w FROM WSubWorkTask w WHERE w.subWorkTaskDateReady = (SELECT MAX(subWorkTaskDateReady) FROM WSubWorkTask WHERE wWork.id = :wWorkId) and w.performer IS NOT NULL AND w.performer.id != 1000")
	public WSubWorkTask getByWWorkOutgoing(@Param("wWorkId") Long wWorkId);
	
	@Query("SELECT w FROM WSubWorkTask w WHERE w.wWork.id = :wWorkId AND w.performer IS NOT NULL AND w.subWorkTaskDateReady IS NOT NULL ORDER BY w.subWorkTaskDateReady")
	public List<WSubWorkTask> getByWork(@Param("wWorkId") Long wWorkId);
}
