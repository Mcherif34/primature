package ma.brainit.aman.client.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.opentext.livelink.service.docman.Node;

import ma.brainit.aman.administration.actions.SearchParam;
import ma.brainit.aman.client.dao.CourrierDepartDao;
import ma.brainit.aman.client.dao.DTreeDao;
import ma.brainit.aman.client.dao.WSubWorkTaskDao;
import ma.brainit.aman.client.dto.CourrierDepartDTO;
import ma.brainit.aman.client.dto.DocumentDTO;
import ma.brainit.aman.client.dto.converters.CourrierDepartDTOConverter;
import ma.brainit.aman.client.model.CourrierDepart;
import ma.brainit.aman.client.model.WSubWorkTask;
import ma.brainit.aman.client.service.CourrierDepartService;
import ma.brainit.aman.webservice.GedService;
import ma.brainit.base.BasePaginatorDao;
import ma.brainit.base.BaseTable;
import ma.brainit.base.utils.Util;


@Service
@Transactional
public class CourrierDepartServiceImpl implements CourrierDepartService {

	@Value("${opentext.url}")
	private String opentextUrl;
	
	@Value("${opentext.login}")
	private String opentextLogin;

	@Value("${opentext.password}")
	private String opentextPassword;
	
	private GedService ged = new GedService();
	
	@Autowired
	private CourrierDepartDTOConverter CourrierDepartDTOConverter;

	@Autowired
	private BasePaginatorDao<CourrierDepart, Long> paginatorDao;

	@Autowired
	private CourrierDepartDao CourrierDepartDao;
	
	@Autowired
	private WSubWorkTaskDao wSubWorkTaskDao;

	@Autowired
	private DTreeDao dtreeDao;

	@Override
	public String getPage(Integer page, Integer limit, String sort, String direction, String search) {
		StringBuilder condition = new StringBuilder("");
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams  = CourrierDepartDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(CourrierDepart.class);
		List<CourrierDepart> list = paginatorDao.getPaginator(page, limit,sort,direction,searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<CourrierDepartDTO> dtos = CourrierDepartDTOConverter.convertFromDataBeanList(list);
		for(CourrierDepartDTO CourrierDepartDTO : dtos) {
			WSubWorkTask wSubWorkTask = wSubWorkTaskDao.getByWWorkOutgoing(CourrierDepartDTO.getwSubWorkId());
			if(wSubWorkTask != null) {
				CourrierDepartDTO.setTaskTitle(wSubWorkTask.getSubWorkTaskTitle());
				CourrierDepartDTO.setPerformer(wSubWorkTask.getPerformer().getName());
			}
		}
		return Util.toJson(new BaseTable<CourrierDepartDTO>(dtos,totalCount));
	}
	
	@Override
	public String getCurrentPage(Integer page, Integer limit, String sort, String direction, String search) {
		StringBuilder condition = new StringBuilder("WHERE e.wSubWork.subWorkDateCompleted IS NULL");
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams  = CourrierDepartDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(CourrierDepart.class);
		List<CourrierDepart> list = paginatorDao.getPaginator(page, limit,sort,direction,searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<CourrierDepartDTO> dtos = CourrierDepartDTOConverter.convertFromDataBeanList(list);
		for(CourrierDepartDTO CourrierDepartDTO : dtos) {
			WSubWorkTask wSubWorkTask = wSubWorkTaskDao.getByWWorkOutgoing(CourrierDepartDTO.getwSubWorkId());
			if(wSubWorkTask != null) {
				CourrierDepartDTO.setTaskTitle(wSubWorkTask.getSubWorkTaskTitle());
				CourrierDepartDTO.setPerformer(wSubWorkTask.getPerformer().getName());
			}
		}
		return Util.toJson(new BaseTable<CourrierDepartDTO>(dtos,totalCount));
	}
	
	@Override
	public String advancedSearch(Integer page, Integer limit, String sort, String direction, String search, String refDepartBoc, String livraisonDateStart, String livraisonDateEnd, String refDestinataire, String departDateStart, String departDateEnd, String destinataire, String status, String typeCourrier, String objet, String observations, String urgence, String ville, String adresse, String refRegistrePhysique, String redacteur, String signataire) {
		StringBuilder condition = new StringBuilder("WHERE e.id IS NOT NULL");
		if(refDepartBoc != null && !refDepartBoc.equals("NAN")) {
			condition.append(" AND e.refDepartBoc LIKE '%").append(refDepartBoc.toUpperCase().replaceAll("-", "/")).append("%'");
		}
		if(livraisonDateStart != null && !livraisonDateStart.equals("NAN") && livraisonDateEnd != null && !livraisonDateEnd.equals("NAN")) {
			condition.append(" AND e.dateLivraison BETWEEN '").append(livraisonDateStart).append("' AND '").append(livraisonDateEnd).append("'");
		}
		if(refDestinataire != null && !refDestinataire.equals("NAN")) {
			condition.append(" AND e.refDestinataire LIKE '%").append(refDestinataire.toUpperCase().replaceAll("-", "/")).append("%'");
		}
		if(departDateStart != null && !departDateStart.equals("NAN") && departDateEnd != null && !departDateEnd.equals("NAN")) {
			condition.append(" AND e.dateDepart BETWEEN '").append(departDateStart).append("' AND '").append(departDateEnd).append("'");
		}
		if(destinataire != null && !destinataire.equals("NAN") && !destinataire.equals("Choisir une option")) {
			condition.append(" AND e.destinataire LIKE '%").append(destinataire.toUpperCase()).append("%'");
		}
		if(status != null && !status.equals("NAN")) {
			if(status.equals("current")) {
				condition.append(" AND e.wSubWork.subWorkDateCompleted IS NULL");
			}
			if(status.equals("completed")) {
				condition.append(" AND e.wSubWork.subWorkDateCompleted IS NOT NULL");
			}
		}
		if(typeCourrier != null && !typeCourrier.equals("NAN")) {
			condition.append(" AND e.typeCourrier LIKE '%").append(typeCourrier.toUpperCase()).append("%'");
		}
		if(objet != null && !objet.equals("NAN")) {
			condition.append(" AND e.objet LIKE '%").append(objet.toUpperCase()).append("%'");
		}
		if(observations != null && !observations.equals("NAN")) {
			condition.append(" AND e.observations LIKE '%").append(observations.toUpperCase()).append("%'");
		}
		if(urgence != null && !urgence.equals("NAN")) {
			condition.append(" AND e.urgence = '").append(urgence).append("'");
		}
		if(ville != null && !ville.equals("NAN")) {
			condition.append(" AND e.ville LIKE '%").append(ville).append("%'");
		}
		if(adresse != null && !adresse.equals("NAN")) {
			condition.append(" AND e.adresse LIKE '%").append(adresse).append("%'");
		}
		if(refRegistrePhysique != null && !refRegistrePhysique.equals("NAN")) {
			condition.append(" AND e.refRegistrePhysique LIKE '%").append(refRegistrePhysique.toUpperCase().replaceAll("-", "/")).append("%'");
		}
		if(redacteur != null && !redacteur.equals("NAN")) {
			condition.append(" AND e.redacteur LIKE '%").append(redacteur).append("%'");
		}
		if(signataire != null && !signataire.equals("NAN")) {
			condition.append(" AND e.signataire LIKE '%").append(signataire).append("%'");
		}
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams  = CourrierDepartDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(CourrierDepart.class);
		List<CourrierDepart> list = paginatorDao.getPaginator(page, limit,sort,direction,searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<CourrierDepartDTO> dtos = CourrierDepartDTOConverter.convertFromDataBeanList(list);
		for(CourrierDepartDTO CourrierDepartDTO : dtos) {
			WSubWorkTask wSubWorkTask = wSubWorkTaskDao.getByWWorkOutgoing(CourrierDepartDTO.getwSubWorkId());
			if(wSubWorkTask != null) {
				CourrierDepartDTO.setTaskTitle(wSubWorkTask.getSubWorkTaskTitle());
				CourrierDepartDTO.setPerformer(wSubWorkTask.getPerformer().getName());
			}
		}
		return Util.toJson(new BaseTable<CourrierDepartDTO>(dtos,totalCount));
	}

	@Override
	@Transactional
	public CourrierDepartDTO save(CourrierDepartDTO dto) {
		CourrierDepart entity = CourrierDepartDTOConverter.convertFromDTO(dto);
		entity = CourrierDepartDao.save(entity);

		return CourrierDepartDTOConverter.convertFromDataBean(entity);
	}

	@Override
	@Transactional
	public CourrierDepartDTO load(Long id) {
		CourrierDepart entity = CourrierDepartDao.findOne(id);
		CourrierDepartDTO dto = CourrierDepartDTOConverter.convertFromDataBean(entity);
		
		return dto;
	}
	
	@Override
	@Transactional
	public CourrierDepartDTO loadByReference(String reference) {
		CourrierDepartDTO dto = CourrierDepartDTOConverter.convertFromDataBean(CourrierDepartDao.getByReference(reference.replaceAll("-", "/")));
		return dto;
	}
	
	@Override
	@Transactional
	public List<DocumentDTO> loadDocumentsByReference(String reference) {
		CourrierDepart entity = CourrierDepartDao.getByReference(reference.replaceAll("-", "/"));
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
		
		return documents;
	}
	
	@Override
	@Transactional
	public List<DocumentDTO> loadDocumentsByCourrier(Long id) {
		CourrierDepart entity = CourrierDepartDao.findOne(id);
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
	public void delete(Long id) {
		CourrierDepartDao.delete(id);
	}

	@Override
	@Transactional
	public List<CourrierDepartDTO> getAll() {
		List<CourrierDepart> list = CourrierDepartDao.findAll();
		List<CourrierDepartDTO> dtos = CourrierDepartDTOConverter.convertFromDataBeanList(list);

		return dtos;
	}
	
	@Override
	@Transactional
	public int getCurrentDepartCount() {
		return CourrierDepartDao.getCurrentDepartCount();
	}
	
	@Override
	@Transactional
	public List<Object> getCurrentDepartCountByYear(int year) {
		return CourrierDepartDao.getCurrentDepartCountByYear(year);
	}
	
	@Override
	@Transactional
	public List<Object> getCompletedDepartCountByYear(int year) {
		return CourrierDepartDao.getCompletedDepartCountByYear(year);
	}
	
	@Override
	@Transactional
	public int getCurrentNotOverdueDepartCount() {
		return CourrierDepartDao.getCurrentNotOverdueDepartCount();
	}
	
	@Override
	@Transactional
	public int getCurrentOverdueDepartCount() {
		return CourrierDepartDao.getCurrentOverdueDepartCount();
	}
	
	@Override
	@Transactional
	public int getCompletedDepartCount() {
		return CourrierDepartDao.getCompletedDepartCount();
	}

	@Override
	public void downloadAttachment(long dataId, HttpServletResponse response) throws ParserConfigurationException {
		String authToken = ged.authentication(opentextUrl, opentextLogin, opentextPassword);
		ged.downloadFile(response, opentextUrl, dataId, authToken);
	}
}
