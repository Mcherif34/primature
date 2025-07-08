package ma.brainit.aman.client.dao;

import ma.brainit.aman.client.model.WSubWork;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WSubWorkDao extends JpaRepository<WSubWork, Long> {
	
}
