package ma.brainit.aman.administration.service;

import java.util.List;

import ma.brainit.aman.administration.dto.SecAuthoriteDTO;

public interface SecAuthoriteService {

	SecAuthoriteDTO save(SecAuthoriteDTO SecAuthoriteDTO);

	SecAuthoriteDTO load(Long id);

	void delete(Long id);

	List<SecAuthoriteDTO> findAll();
	
	List<SecAuthoriteDTO> getByScreen(Long screenId);

	String getPaginator(Integer page, Integer limit, String sort, String direction, String search);
	
	String getPaginatorByScreen(Integer page, Integer limit, String sort, String direction, String search, Long screenId);

}
