package ma.brainit.aman.client.service;

import ma.brainit.aman.client.dto.PerformerDTO;

import java.util.List;

public interface PerformerService {
	
	String getPage(Integer page, Integer limit, String sort, String direction, String search);
	
	PerformerDTO save(PerformerDTO dto);

	PerformerDTO load(Long id);
	
	void delete(Long id);
	
	List<PerformerDTO> getAll();
	
	List<PerformerDTO> getAllGroups();
	
}
