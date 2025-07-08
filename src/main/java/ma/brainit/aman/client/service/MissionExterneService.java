package ma.brainit.aman.client.service;

import ma.brainit.aman.client.dto.MissionExterneDTO;
import ma.brainit.aman.client.dto.DocumentDTO;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.Response;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.http.ResponseEntity;

public interface MissionExterneService {
	
	String getPage(Integer page, Integer limit, String sort, String direction, String search);
	
	String getCurrentPageDashboard(Integer page, Integer limit, String sort, String direction, String search);
	
	String getCurrentPage(Integer page, Integer limit, String sort, String direction, String search);
	
	String getDonePage(Integer page, Integer limit, String sort, String direction, String search);
	
	String getClosePage(Integer page, Integer limit, String sort, String direction, String search);
	
	String advancedSearch(Integer page, Integer limit, String sort, String direction, String search, String referenceCourrier, String receptionDateStart, String receptionDateEnd, String referenceExpediteur, String enregistrementDateStart, String enregistrementDateEnd, String expediteur, String objet, String status);
	
	String save(MissionExterneDTO dto);

	MissionExterneDTO load(Long id);
	
	MissionExterneDTO loadByVolumeId(Long volumeId);
	
	MissionExterneDTO loadByReference(String reference);
	
	List<DocumentDTO> loadDocumentsByReference(String reference);
	
	String delete(Long id);
	
	String send(MissionExterneDTO dto);
	
	List<MissionExterneDTO> getAll();
	
	int getCurrentCountByEntity(String term);
	
	int getCurrentCount();
	
	int getCompletedCount();
	
	int getRejectedCount();
	
	int getCurrentCountByProfile();
	
	List<Object> getCurrentCountByYear(int year);
	
	List<Object> getCompletedCountByYear(int year);
	
	int getCurrentNotOverdueClassiqueCount();
	
	int getCurrentOverdueClassiqueCount();
	
	int getCompletedClassiqueCount();
	
	void downloadAttachment(long dataId, HttpServletResponse response) throws ParserConfigurationException;
	
	ResponseEntity<byte[]> streamDocument(long dataId);

}
