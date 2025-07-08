package ma.brainit.aman.client.service.impl;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.opentext.livelink.service.docman.Node;

import ma.brainit.aman.administration.actions.SearchParam;
import ma.brainit.aman.administration.dto.SecProfileDTO;
import ma.brainit.aman.administration.dto.SecUtilisateurDTO;
import ma.brainit.aman.administration.model.SecProfile;
import ma.brainit.aman.administration.service.SecProfileService;
import ma.brainit.aman.administration.service.SecUtilisateurService;
import ma.brainit.aman.client.dao.CorrespondanceDircabDao;
import ma.brainit.aman.client.dao.DTreeDao;
import ma.brainit.aman.client.dao.WSubWorkTaskDao;
import ma.brainit.aman.client.dto.CorrespondanceDircabDTO;
import ma.brainit.aman.client.dto.CourrierDTO;
import ma.brainit.aman.client.dto.DocumentDTO;
import ma.brainit.aman.client.dto.converters.CorrespondanceDircabDTOConverter;
import ma.brainit.aman.client.model.CorrespondanceDircab;
import ma.brainit.aman.client.model.Courrier;
import ma.brainit.aman.client.model.WSubWorkTask;
import ma.brainit.aman.client.service.CorrespondanceDircabService;
import ma.brainit.aman.client.service.CourrierService;
import ma.brainit.aman.client.service.CorrespondanceDircabService;
import ma.brainit.aman.webservice.GedService;
import ma.brainit.base.BasePaginatorDao;
import ma.brainit.base.BaseTable;
import ma.brainit.base.utils.Util;


@Service
@Transactional
public class CorrespondanceDircabServiceImpl implements CorrespondanceDircabService {

	@Value("${opentext.url}")
	private String opentextUrl;
	
	@Value("${opentext.otdsUrl}")
	private String opentextOtdsUrl;
	
	@Value("${opentext.login}")
	private String opentextLogin;

	@Value("${opentext.password}")
	private String opentextPassword;
	
	@Value("${opentext.courrierCorrespondanceDircabID}")
	private Long opentextCourrierCorrespondanceDircabID;
	
	private GedService ged = new GedService();
	
	@Autowired
	private CorrespondanceDircabDTOConverter CorrespondanceDTOConverter;

	@Autowired
	private BasePaginatorDao<CorrespondanceDircab, Long> paginatorDao;

	@Autowired
	private CorrespondanceDircabDao CorrespondanceDao;
	
	@Autowired
	private CourrierService courrierService;
	
	@Autowired
	private WSubWorkTaskDao wSubWorkTaskDao;

	@Autowired
	private DTreeDao dtreeDao;

	@Autowired
	private SecUtilisateurService secUtilisateurService;
	

	@Autowired
	private SecProfileService secProfileService;
	
	@Override
	public String getPage(Integer page, Integer limit, String sort, String direction, String search) {
		StringBuilder condition = new StringBuilder("");
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams  = CorrespondanceDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(CorrespondanceDircab.class);
		List<CorrespondanceDircab> list = paginatorDao.getPaginator(page, limit,sort,direction,searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<CorrespondanceDircabDTO> dtos = CorrespondanceDTOConverter.convertFromDataBeanList(list);
		
		return Util.toJson(new BaseTable<CorrespondanceDircabDTO>(dtos,totalCount));
	}
	
	@Override
	public String getCurrentPageDashboard(Integer page, Integer limit, String sort, String direction, String search) {
		StringBuilder condition = new StringBuilder("WHERE e.wSubWork.subWorkDateCompleted IS NULL AND e.status = 2");
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams  = CorrespondanceDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(CorrespondanceDircab.class);
		List<CorrespondanceDircab> list = paginatorDao.getPaginator(page, limit,sort,direction,searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<CorrespondanceDircabDTO> dtos = CorrespondanceDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<CorrespondanceDircabDTO>(dtos,totalCount));
	}
	
	@Override
	public String getCurrentPage(Integer page, Integer limit, String sort, String direction, String search) {
		SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
		SecProfileDTO group = secProfileService.load(user.getSecProfileId());
		StringBuilder condition = new StringBuilder("WHERE e.wSubWork.subWorkDateCompleted IS NULL AND e.status = 2 AND e.performer.id = ").append(group.getPerformerId());
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams  = CorrespondanceDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(CorrespondanceDircab.class);
		List<CorrespondanceDircab> list = paginatorDao.getPaginator(page, limit,sort,direction,searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<CorrespondanceDircabDTO> dtos = CorrespondanceDTOConverter.convertFromDataBeanList(list);
		
		return Util.toJson(new BaseTable<CorrespondanceDircabDTO>(dtos,totalCount));
	}
	
	@Override
	public String getDonePage(Integer page, Integer limit, String sort, String direction, String search) {
		SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
		SecProfileDTO group = secProfileService.load(user.getSecProfileId());
		StringBuilder condition = new StringBuilder("WHERE e.wSubWork.subWorkDateCompleted IS NULL AND e.status = 2 AND e.performer.id != ").append(group.getPerformerId());
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams  = CorrespondanceDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(CorrespondanceDircab.class);
		List<CorrespondanceDircab> list = paginatorDao.getPaginator(page, limit,sort,direction,searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<CorrespondanceDircabDTO> dtos = CorrespondanceDTOConverter.convertFromDataBeanList(list);
		
		return Util.toJson(new BaseTable<CorrespondanceDircabDTO>(dtos,totalCount));
	}
	
	@Override
	public String getClosePage(Integer page, Integer limit, String sort, String direction, String search) {
		StringBuilder condition = new StringBuilder("WHERE e.wSubWork.subWorkDateCompleted IS NOT NULL");
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams  = CorrespondanceDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(CorrespondanceDircab.class);
		List<CorrespondanceDircab> list = paginatorDao.getPaginator(page, limit,sort,direction,searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<CorrespondanceDircabDTO> dtos = CorrespondanceDTOConverter.convertFromDataBeanList(list);
		
		return Util.toJson(new BaseTable<CorrespondanceDircabDTO>(dtos,totalCount));
	}
	
	@Override
	public String advancedSearch(Integer page, Integer limit, String sort, String direction, String search, String referenceCourrier, String receptionDateStart, String receptionDateEnd, String referenceExpediteur, String enregistrementDateStart, String enregistrementDateEnd, String expediteur, String objet, String status) {
		SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
		SecProfileDTO group = secProfileService.load(user.getSecProfileId());
		StringBuilder condition = new StringBuilder("WHERE e.id IS NOT NULL");
		if(referenceCourrier != null && !referenceCourrier.equals("NAN")) {
			condition.append(" AND e.referenceCourrier LIKE '%").append(referenceCourrier.toUpperCase().replaceAll("-", "/")).append("%'");
		}
		if(receptionDateStart != null && !receptionDateStart.equals("NAN") && receptionDateEnd != null && !receptionDateEnd.equals("NAN")) {
			condition.append(" AND e.dateReception BETWEEN '").append(receptionDateStart).append("' AND '").append(receptionDateEnd).append("'");
		}
		if(referenceExpediteur != null && !referenceExpediteur.equals("NAN")) {
			condition.append(" AND e.referenceExpediteur LIKE '%").append(referenceExpediteur.toUpperCase().replaceAll("-", "/")).append("%'");
		}
		if(enregistrementDateStart != null && !enregistrementDateStart.equals("NAN") && enregistrementDateEnd != null && !enregistrementDateEnd.equals("NAN")) {
			condition.append(" AND e.dateEnregistrement BETWEEN '").append(enregistrementDateStart).append("' AND '").append(enregistrementDateEnd).append("'");
		}
		if(expediteur != null && !expediteur.equals("NAN") && !expediteur.equals("Choisir une option")) {
			condition.append(" AND e.expediteur LIKE '%").append(expediteur.replaceAll("'", "''").toUpperCase()).append("%'");
		}
		if(objet != null && !objet.equals("NAN")) {
			condition.append(" AND e.objet LIKE '%").append(objet.toUpperCase()).append("%'");
		}
		if(status.equals("current")) {
			condition.append(" AND e.wSubWork.subWorkDateCompleted IS NULL AND e.status = 2 AND e.performer.id = ").append(group.getPerformerId());
		}
		if(status.equals("done")) {
			condition.append(" AND e.wSubWork.subWorkDateCompleted IS NULL AND e.status = 2 AND e.performer.id != ").append(group.getPerformerId());
		}
		if(status.equals("completed")) {
			condition.append(" AND e.wSubWork.subWorkDateCompleted IS NOT NULL");
		}
		System.out.println(condition.toString());
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams  = CorrespondanceDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(CorrespondanceDircab.class);
		List<CorrespondanceDircab> list = paginatorDao.getPaginator(page, limit,sort,direction,searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<CorrespondanceDircabDTO> dtos = CorrespondanceDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<CorrespondanceDircabDTO>(dtos,totalCount));
	}

	@Override
	@Transactional
	public String save(CorrespondanceDircabDTO dto) {
		SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
		CourrierDTO entity = courrierService.loadByTypeByMonthByYear("COURRIER ARRIVEE", Calendar.getInstance().get(Calendar.MONTH)+1, Calendar.getInstance().get(Calendar.YEAR));
		Long sequence = (long) 1;
		if(entity != null)
			sequence = entity.getSequence()+1;
		else {
			entity = courrierService.loadByType("COURRIER ARRIVEE");
		}
		String reference = "A/"+Calendar.getInstance().get(Calendar.YEAR)+"/"+String.format("%02d", Calendar.getInstance().get(Calendar.MONTH)+1)+"/"+String.format("%03d", sequence);
		String authToken = ged.authentication(opentextUrl, opentextLogin, opentextPassword);
		String result = ged.initiateCorrespondanceDircab(opentextUrl, opentextCourrierCorrespondanceDircabID, dto, user.getLogin(), reference, authToken);
		if(result == "FAILED") {
			return result;
		}
		entity.setSequence(sequence);
		entity.setMonth(Calendar.getInstance().get(Calendar.MONTH)+1);
		entity.setYear(Calendar.getInstance().get(Calendar.YEAR));
		courrierService.save(entity);
		
		return reference;
	}

	@Override
	@Transactional
	public CorrespondanceDircabDTO load(Long id) {
		CorrespondanceDircab entity = CorrespondanceDao.findOne(id);
		CorrespondanceDircabDTO dto = CorrespondanceDTOConverter.convertFromDataBean(entity);
		List<DocumentDTO> documents = new ArrayList<DocumentDTO>();
		String authToken = ged.authentication(opentextUrl, opentextLogin, opentextPassword);
		try {
			if(entity != null && entity.getwSubWork() != null) {
				List<Node> attachments = ged.getAttachments(opentextUrl, entity.getwSubWork().getId(), authToken);
				if(attachments != null) {
					for(int i = 0; i < attachments.size(); i++) {
						DocumentDTO document = new DocumentDTO();
						document.setDataId(attachments.get(i).getID());
						document.setName(attachments.get(i).getName());
						documents.add(document);
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return dto;
	}
	
	@Override
	@Transactional
	public CorrespondanceDircabDTO loadByReference(String reference) {
		CorrespondanceDircabDTO dto = CorrespondanceDTOConverter.convertFromDataBean(CorrespondanceDao.getByReference(reference.replaceAll("-", "/")));
		return dto;
	}
	
	@Override
	@Transactional
	public CorrespondanceDircabDTO loadByVolumeId(Long volumeId) {
		CorrespondanceDircabDTO dto = CorrespondanceDTOConverter.convertFromDataBean(CorrespondanceDao.getByVolumeId(volumeId));
		return dto;
	}
	
	@Override
	@Transactional
	public List<DocumentDTO> loadDocumentsByReference(String reference) {
		CorrespondanceDircab entity = CorrespondanceDao.getByReference(reference.replaceAll("-", "/"));
		List<DocumentDTO> documents = new ArrayList<DocumentDTO>();
		String authToken = ged.authentication(opentextUrl, opentextLogin, opentextPassword);
		try {
			if(entity != null && entity.getwSubWork() != null) {
				Long attachmentParentNode = dtreeDao.getAttachmentParentNode(entity.getwSubWork().getId().toString());
				List<Node> attachments = ged.getAttachments(opentextUrl, attachmentParentNode, authToken);
				if(attachments != null) {
					for(int i = 0; i < attachments.size(); i++) {
						DocumentDTO document = new DocumentDTO();
						document.setDataId(attachments.get(i).getID());
						document.setName(attachments.get(i).getName());
						documents.add(document);
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return documents;
	}

	@Override
	@Transactional
	public String delete(Long id) {
		return courrierService.delete(id);
	}
	
	@Override
	@Transactional
	public String send(CorrespondanceDircabDTO dto) {
		SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
		String authToken = ged.authentication(opentextUrl, opentextLogin, opentextPassword);
		String result = "";
//		result = ged.getActivitiesList(opentextUrl, dto, authToken);
		if(dto.getTaskTitle().equals("Réception du courrier")) {
			if(dto.getMotif() != null && dto.getMotif() != "")
				result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Initiation", "Motif Rejet Courrier", 3, authToken);
			else
				result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Initiation", null, 3, authToken);
		}
		if(dto.getTaskTitle().equals("Traitement DIRCAB")) {
			if(dto.getMotif() != null && dto.getMotif() != "")
				result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Traitement DIRCAB", "Motif Rejet Traitement DIRCAB", 15, authToken);
			else
				result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Traitement DIRCAB", null, 15, authToken);
		}
		if(dto.getTaskTitle().equals("Annotation PM")) {
			if(dto.getMotif() != null && dto.getMotif() != "")
				result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Annotation PM", "Motif Rejet Annotation PM", 4, authToken);
			else
				result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Annotation PM", null, 4, authToken);
		}
		if(dto.getTaskTitle().equals("Annotation DIRCAB")) {
			if(dto.getMotif() != null && dto.getMotif() != "")
				result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Annotation DIRCAB", "Motif Rejet Annotation DIRCAB", 5, authToken);
			else
				result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Annotation DIRCAB", null, 5, authToken);
		}
		if(dto.getTaskTitle().equals("Traitement Coordonnateur"))
			result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Traitement Coordonnateur", null, 6, authToken);
		if(dto.getTaskTitle().equals("Signature DIRCAB")) {
			if(dto.getMotif() != null && dto.getMotif() != "")
				result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Signature DIRCAB", "Motif Rejet Signature DIRCAB", 7, authToken);
			else
				result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Signature DIRCAB", null, 7, authToken);
		}
		if(dto.getTaskTitle().equals("Envoi du courrier"))
			result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Envoi du courrier", null, 8, authToken);
		if(dto.getTaskTitle().equals("[Rejet] Initiation"))
			result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Rejet Initiation", null, 14, authToken);
		if(dto.getTaskTitle().equals("[Rejet] Réception du courrier"))
			result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Rejet Réception du courrier", null, 17, authToken);
		if(dto.getTaskTitle().equals("[Rejet] Traitement DIRCAB"))
			result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Rejet Traitement DIRCAB", null, 18, authToken);
		if(dto.getTaskTitle().equals("[Rejet] Annotation PM"))
			result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Rejet Annotation PM", null, 9, authToken);
		if(dto.getTaskTitle().equals("[Rejet] Traitement Coordonnateur"))
			result = ged.sendCorrespondanceDircab(opentextUrl, dto, user.getLogin(), "Rejet Traitement Coordonnateur", null, 12, authToken);
		
		return result;
	}

	@Override
	@Transactional
	public List<CorrespondanceDircabDTO> getAll() {
		List<CorrespondanceDircab> list = CorrespondanceDao.findAll();
		List<CorrespondanceDircabDTO> dtos = CorrespondanceDTOConverter.convertFromDataBeanList(list);

		return dtos;
	}
	
	@Override
	@Transactional
	public int getCurrentCountByEntity(String term) {
		return CorrespondanceDao.getCurrentCountByEntity(term);
	}
	
	@Override
	@Transactional
	public int getCurrentCount() {
		return CorrespondanceDao.getCurrentCount();
	}
	
	@Override
	@Transactional
	public int getCompletedCount() {
		return CorrespondanceDao.getCompletedCount();
	}
	
	@Override
	@Transactional
	public int getRejectedCount() {
		return CorrespondanceDao.getRejectedCount();
	}
	
	@Override
	@Transactional
	public int getCurrentCountByProfile() {
		SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
		SecProfileDTO profile = secProfileService.load(user.getSecProfileId());
		return CorrespondanceDao.getCurrentCountByProfile(profile.getPerformerName());
	}
	
	@Override
	@Transactional
	public List<Object> getCurrentCountByYear(int year) {
		return CorrespondanceDao.getCurrentCountByYear(year);
	}
	
	@Override
	@Transactional
	public List<Object> getCompletedCountByYear(int year) {
		return CorrespondanceDao.getCompletedCountByYear(year);
	}
	
	@Override
	@Transactional
	public int getCurrentNotOverdueClassiqueCount() {
		return CorrespondanceDao.getCurrentNotOverdueClassiqueCount();
	}
	
	@Override
	@Transactional
	public int getCurrentOverdueClassiqueCount() {
		return CorrespondanceDao.getCurrentOverdueClassiqueCount();
	}
	
	@Override
	@Transactional
	public int getCompletedClassiqueCount() {
		return CorrespondanceDao.getCompletedClassiqueCount();
	}

	@Override
	public void downloadAttachment(long dataId, HttpServletResponse response) throws ParserConfigurationException {
		String authToken = ged.authentication(opentextUrl, opentextLogin, opentextPassword);
		ged.downloadFile(response, opentextUrl, dataId, authToken);
	}
	
	public ResponseEntity<byte[]> streamDocument(long dataId) {
	    String authToken = ged.authentication(opentextUrl, opentextLogin, opentextPassword);
	    try {
            ByteArrayOutputStream outputStream = ged.downloadDocument(opentextUrl, dataId, authToken);
            byte[] data = outputStream.toByteArray();
            
            String contentType = getMimeTypeFromData(outputStream);
            
            return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header("Content-Disposition", "inline; filename=\"document-" + dataId + "\"")
                .body(data);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(("Erreur lors de la récupération du document: " + e.getMessage()).getBytes());
        }
	}
	
	private String getMimeTypeFromData(ByteArrayOutputStream outputStream) {
	    // Convertir le ByteArrayOutputStream en byte array pour l'analyse
	    byte[] data = outputStream.toByteArray();
	    
	    // Vérifier s'il y a suffisamment de données pour l'analyse
	    if (data == null || data.length < 4) {
	        return "application/octet-stream";
	    }
	    
	    // Vérifier les signatures de fichiers communes
	    
	    // PDF: commence par %PDF (25 50 44 46)
	    if (data.length >= 4 && 
	        data[0] == 0x25 && 
	        data[1] == 0x50 && 
	        data[2] == 0x44 && 
	        data[3] == 0x46) {
	        return "application/pdf";
	    }
	    
	    // JPEG: commence par FF D8 FF
	    if (data.length >= 3 && 
	        (data[0] & 0xFF) == 0xFF && 
	        (data[1] & 0xFF) == 0xD8 && 
	        (data[2] & 0xFF) == 0xFF) {
	        return "image/jpeg";
	    }
	    
	    // PNG: commence par 89 50 4E 47 0D 0A 1A 0A
	    if (data.length >= 8 && 
	        (data[0] & 0xFF) == 0x89 && 
	        data[1] == 0x50 && 
	        data[2] == 0x4E && 
	        data[3] == 0x47 && 
	        data[4] == 0x0D && 
	        data[5] == 0x0A && 
	        data[6] == 0x1A && 
	        data[7] == 0x0A) {
	        return "image/png";
	    }
	    
	    // GIF: commence par GIF87a (47 49 46 38 37 61) ou GIF89a (47 49 46 38 39 61)
	    if (data.length >= 6 && 
	        data[0] == 0x47 && 
	        data[1] == 0x49 && 
	        data[2] == 0x46 && 
	        data[3] == 0x38 && 
	        (data[4] == 0x37 || data[4] == 0x39) && 
	        data[5] == 0x61) {
	        return "image/gif";
	    }
	    
	    // ZIP, DOCX, XLSX, PPTX, etc. (commence par PK)
	    if (data.length >= 4 && 
	        (data[0] & 0xFF) == 0x50 && 
	        (data[1] & 0xFF) == 0x4B && 
	        (data[2] & 0xFF) == 0x03 && 
	        (data[3] & 0xFF) == 0x04) {
	        // Vérification basique du contenu pour différencier les types Office
	        // Pour une détection plus précise, il faudrait analyser le contenu du ZIP
	        return "application/zip";
	    }
	    
	    // Document Microsoft Word (.doc)
	    if (data.length >= 8 && 
	        (data[0] & 0xFF) == 0xD0 && 
	        (data[1] & 0xFF) == 0xCF && 
	        (data[2] & 0xFF) == 0x11 && 
	        (data[3] & 0xFF) == 0xE0) {
	        return "application/msword";
	    }
	    
	    // Texte brut (détection basique)
	    boolean isText = true;
	    int checkLength = Math.min(data.length, 1000); // Vérifier les 1000 premiers octets
	    for (int i = 0; i < checkLength; i++) {
	        // Si un caractère n'est pas imprimable et n'est pas un retour à la ligne ou une tabulation
	        if ((data[i] < 0x20 || data[i] > 0x7E) && 
	            data[i] != 0x0A && // LF
	            data[i] != 0x0D && // CR
	            data[i] != 0x09) { // Tab
	            isText = false;
	            break;
	        }
	    }
	    if (isText) {
	        // Vérifier si c'est potentiellement du XML/HTML
	        String sample = new String(data, 0, Math.min(data.length, 500), StandardCharsets.UTF_8).trim();
	        if (sample.startsWith("<?xml") || sample.startsWith("<html") || sample.startsWith("<!DOCTYPE html")) {
	            if (sample.contains("<html") || sample.contains("<HTML")) {
	                return "text/html";
	            }
	            return "application/xml";
	        }
	        return "text/plain";
	    }
	    
	    // Si aucun format n'est identifié, retourner le type générique
	    return "application/octet-stream";
	}
	
	private StreamingOutput convertToStreamingOutput(final ByteArrayOutputStream outputStream) {
	    return output -> {
	        try {
	            outputStream.writeTo(output);
	            output.flush();
	            outputStream.close();
	        } catch (IOException e) {
	            throw new RuntimeException(e);
	        }
	    };
	}
	
//	private StreamingOutput convertToStreamingOutput(OutputStream outputStream) {
//	    // Vérification que l'OutputStream n'est pas null
//	    if (outputStream == null) {
//	        throw new IllegalArgumentException("OutputStream ne peut pas être null");
//	    }
//	    
//	    // Création du StreamingOutput qui va utiliser les données de l'OutputStream
//	    return new StreamingOutput() {
//	        @Override
//	        public void write(OutputStream os) throws IOException {
//	            try {
//	                // Si c'est un ByteArrayOutputStream, on peut facilement récupérer les données
//	                if (outputStream instanceof ByteArrayOutputStream) {
//	                    byte[] data = ((ByteArrayOutputStream) outputStream).toByteArray();
//	                    os.write(data);
//	                } 
//	                // Si c'est un autre type d'OutputStream, on ne peut pas récupérer les données déjà écrites
//	                // Cette partie serait à adapter selon le type spécifique d'OutputStream
//	                else {
//	                    throw new IllegalArgumentException("Seul ByteArrayOutputStream est supporté pour la conversion");
//	                }
//	                
//	                os.flush();
//	            } catch (IOException e) {
//	                System.out.println(e.getMessage());
//	            }
//	        }
//	    };
//	}
	
}
