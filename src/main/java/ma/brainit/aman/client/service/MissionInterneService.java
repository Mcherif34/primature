package ma.brainit.aman.client.service;

import ma.brainit.aman.client.dto.MissionInterneDTO;
import ma.brainit.aman.client.dto.DocumentDTO;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.http.ResponseEntity;

public interface MissionInterneService {
	
	String getPage(Integer page, Integer limit, String sort, String direction, String search);
	
	String getCurrentPageDashboard(Integer page, Integer limit, String sort, String direction, String search);
	
	String getCurrentPage(Integer page, Integer limit, String sort, String direction, String search);
	
	String getDonePage(Integer page, Integer limit, String sort, String direction, String search);
	
	String getClosePage(Integer page, Integer limit, String sort, String direction, String search);
	
	String advancedSearch(Integer page, Integer limit, String sort, String direction, String search, String referenceCourrier, String enregistrementDateStart, String enregistrementDateEnd, String objet, String status);
	
	String save(MissionInterneDTO dto);

	MissionInterneDTO load(Long id);
	
	MissionInterneDTO loadByVolumeId(Long volumeId);
	
	MissionInterneDTO loadByReference(String reference);
	
	List<DocumentDTO> loadDocumentsByReference(String reference);
	
	String delete(Long id);
	
	String send(MissionInterneDTO dto);
	
	List<MissionInterneDTO> getAll();
	
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
