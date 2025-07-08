package ma.brainit.aman.client.dao;

import ma.brainit.aman.client.model.DTree;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DTreeDao extends JpaRepository<DTree, Long> {
	@Query("SELECT d.id FROM DTree d WHERE d.name LIKE CONCAT('%-', :volumeId, '')")
	public Long getAttachmentParentNode(@Param("volumeId") String volumeId);
}
