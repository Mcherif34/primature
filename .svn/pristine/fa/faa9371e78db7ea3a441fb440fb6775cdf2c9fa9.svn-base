package ma.brainit.aman.client.service;

import ma.brainit.aman.client.dto.CourrierFactureDTO;
import ma.brainit.aman.client.dto.DocumentDTO;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;

public interface CourrierFactureService {
	
	String getPage(Integer page, Integer limit, String sort, String direction, String search);
	
	String getCurrentPage(Integer page, Integer limit, String sort, String direction, String search);
	
	String advancedSearch(Integer page, Integer limit, String sort, String direction, String search, String refArriveeBoc, String factureDateStart, String factureDateEnd, String numFacture, String receptionDateStart, String receptionDateEnd, String refExpediteur, String enregistrementDateStart, String enregistrementDateEnd, String expediteur, String montantFacture, String status, String attestationRegularite, String decompteDateStart, String decompteDateEnd, String numDecompte, String devise, String elementFacturation, String numBcContrat, String typeCourrier, String delaiPaiement, String formeJuridique, String validationDateStart, String validationDateEnd);
	
	CourrierFactureDTO save(CourrierFactureDTO dto);

	CourrierFactureDTO load(Long id);
	
	CourrierFactureDTO loadByReference(String reference);
	
	List<DocumentDTO> loadDocumentsByReference(String reference);
	
	void delete(Long id);
	
	List<CourrierFactureDTO> getAll();
	
	int getCurrentInvoiceCount();
	
	List<Object> getCurrentInvoiceCountByYear(int year);
	
	List<Object> getCompletedInvoiceCountByYear(int year);
	
	int getCurrentNotOverdueInvoiceCount();
	
	int getCurrentOverdueInvoiceCount();
	
	int getCompletedInvoiceCount();
	
	void downloadAttachment(long dataId, HttpServletResponse response) throws ParserConfigurationException;
}
