package ma.brainit.aman.client.service;

import ma.brainit.aman.client.dto.MaterielDTO;
import ma.brainit.aman.client.dto.DocumentDTO;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.http.ResponseEntity;

public interface MaterielService {
	
	String getPage(Integer page, Integer limit, String sort, String direction, String search);
	
	String getCurrentPageDashboard(Integer page, Integer limit, String sort, String direction, String search);
	
	String getCurrentPage(Integer page, Integer limit, String sort, String direction, String search);
	
	String getDonePage(Integer page, Integer limit, String sort, String direction, String search);
	
	String getClosePage(Integer page, Integer limit, String sort, String direction, String search);
	
	String advancedSearch(Integer page, Integer limit, String sort, String direction, String search, String referenceCourrier, String referenceMateriel, String enregistrementDateStart, String enregistrementDateEnd, String objet, String status);
	
	String save(MaterielDTO dto);

	MaterielDTO load(Long id);
	
	MaterielDTO loadByVolumeId(Long volumeId);
	
	MaterielDTO loadByReference(String reference);
	
	List<DocumentDTO> loadDocumentsByReference(String reference);
	
	String delete(Long id);
	
	String send(MaterielDTO dto);
	
	List<MaterielDTO> getAll();
	
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
