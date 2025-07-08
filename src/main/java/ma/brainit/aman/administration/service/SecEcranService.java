package ma.brainit.aman.administration.service;

import java.util.List;

import ma.brainit.aman.administration.dto.SecEcranDTO;

public interface SecEcranService {

	SecEcranDTO save(SecEcranDTO SecEcranDTO);

	SecEcranDTO load(Long id);

	void delete(Long id);

	List<SecEcranDTO> findAll();
	
	List<SecEcranDTO> getByModule(Long moduleId);

	String getPaginator(Integer page, Integer limit, String sort, String direction, String search);
	
	String getPaginatorByModule(Integer page, Integer limit, String sort, String direction, String search, Long moduleId);

}
