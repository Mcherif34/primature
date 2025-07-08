package ma.brainit.aman.client.service;

import ma.brainit.aman.client.dto.ExpediteurDTO;

import java.util.List;

public interface ExpediteurService {
	
	String getPage(Integer page, Integer limit, String sort, String direction, String search);
	
	ExpediteurDTO save(ExpediteurDTO dto);

	ExpediteurDTO load(Long id);
	
	ExpediteurDTO getByName(String name);
	
	void delete(Long id);
	
	List<ExpediteurDTO> getAll();
	
	List<String> getAllName();
	
}
