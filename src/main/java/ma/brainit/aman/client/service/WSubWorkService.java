package ma.brainit.aman.client.service;

import ma.brainit.aman.client.dto.WSubWorkDTO;

import java.util.List;

public interface WSubWorkService {
	
	String getPage(Integer page, Integer limit, String sort, String direction, String search);
	
	WSubWorkDTO save(WSubWorkDTO dto);

	WSubWorkDTO load(Long id);
	
	void delete(Long id);
	
	List<WSubWorkDTO> getAll();
}
