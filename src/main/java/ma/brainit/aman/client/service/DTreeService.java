package ma.brainit.aman.client.service;

import ma.brainit.aman.client.dto.DTreeDTO;

import java.util.List;

public interface DTreeService {
	
	String getPage(Integer page, Integer limit, String sort, String direction, String search);
	
	DTreeDTO save(DTreeDTO dto);

	DTreeDTO load(Long id);
	
	void delete(Long id);
	
	List<DTreeDTO> getAll();
}
