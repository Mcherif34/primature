package ma.brainit.aman.client.service;

import ma.brainit.aman.client.dto.WSubWorkTaskDTO;

import java.util.List;

public interface WSubWorkTaskService {
	
	String getPage(Integer page, Integer limit, String sort, String direction, String search);
	
	String getPage(Integer page, Integer limit, String sort, String direction, String search, Long workId);
	
	WSubWorkTaskDTO save(WSubWorkTaskDTO dto);

	WSubWorkTaskDTO load(Long id);
	
	void delete(Long id);
	
	List<WSubWorkTaskDTO> getAll();
	
	List<WSubWorkTaskDTO> getAllByWork(Long wWorkId);
}
