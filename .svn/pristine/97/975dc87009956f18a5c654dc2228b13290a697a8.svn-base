package ma.brainit.aman.client.service;

import ma.brainit.aman.client.dto.CourrierDepartDTO;
import ma.brainit.aman.client.dto.DocumentDTO;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;

public interface CourrierDepartService {
	
	String getPage(Integer page, Integer limit, String sort, String direction, String search);
	
	String getCurrentPage(Integer page, Integer limit, String sort, String direction, String search);
	
	String advancedSearch(Integer page, Integer limit, String sort, String direction, String search, String refDepartBoc, String livraisonDateStart, String livraisonDateEnd, String refDestinataire, String departDateStart, String departDateEnd, String destinataire, String status, String typeCourrier, String objet, String observations, String urgence, String ville, String adresse, String refRegistrePhysique, String redacteur, String signataire);
	
	CourrierDepartDTO save(CourrierDepartDTO dto);

	CourrierDepartDTO load(Long id);
	
	CourrierDepartDTO loadByReference(String reference);
	
	List<DocumentDTO> loadDocumentsByCourrier(Long id);
	
	List<DocumentDTO> loadDocumentsByReference(String reference);
	
	void delete(Long id);
	
	List<CourrierDepartDTO> getAll();
	
	int getCurrentDepartCount();
	
	List<Object> getCurrentDepartCountByYear(int year);
	
	List<Object> getCompletedDepartCountByYear(int year);
	
	int getCurrentNotOverdueDepartCount();
	
	int getCurrentOverdueDepartCount();
	
	int getCompletedDepartCount();
	
	void downloadAttachment(long dataId, HttpServletResponse response) throws ParserConfigurationException;
}
