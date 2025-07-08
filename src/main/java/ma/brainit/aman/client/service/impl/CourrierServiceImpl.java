package ma.brainit.aman.client.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.time.LocalDateTime;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.administration.actions.SearchParam;
import ma.brainit.aman.administration.dto.SecUtilisateurDTO;
import ma.brainit.aman.administration.service.SecUtilisateurService;
import ma.brainit.aman.client.dao.AdnIdDao;
import ma.brainit.aman.client.dao.CourrierDao;
import ma.brainit.aman.client.dto.CorrespondanceSgDTO;
import ma.brainit.aman.client.dto.CourrierDTO;
import ma.brainit.aman.client.dto.converters.CourrierDTOConverter;
import ma.brainit.aman.client.model.AdnId;
import ma.brainit.aman.client.model.Courrier;
import ma.brainit.aman.client.service.CourrierService;
import ma.brainit.aman.webservice.GedService;
import ma.brainit.base.BasePaginatorDao;
import ma.brainit.base.BaseTable;
import ma.brainit.base.utils.Util;


@Service
@Transactional
public class CourrierServiceImpl implements CourrierService {

	@Value("${opentext.url}")
	private String opentextUrl;
	
	@Value("${opentext.otdsUrl}")
	private String opentextOtdsUrl;
	
	@Value("${opentext.login}")
	private String opentextLogin;

	@Value("${opentext.password}")
	private String opentextPassword;
	
//	@Value("${opentext.courrierFactureID}")
//	private Long opentextCourrierFactureID;
	
	private GedService ged = new GedService();
	
	@Autowired
	private CourrierDTOConverter courrierDTOConverter;

	@Autowired
	private BasePaginatorDao<Courrier, Long> paginatorDao;

	@Autowired
	private CourrierDao courrierDao;
	
	@Autowired
	private AdnIdDao adnIdDao;

	@Autowired
	private SecUtilisateurService secUtilisateurService;
	
	@Override
	public String getPage(Integer page, Integer limit, String sort, String direction, String search) {
		StringBuilder condition = new StringBuilder("");
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams  = courrierDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(Courrier.class);
		List<Courrier> list = paginatorDao.getPaginator(page, limit,sort,direction,searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<CourrierDTO> dtos = courrierDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<CourrierDTO>(dtos,totalCount));
	}

	@Override
	@Transactional
	public CourrierDTO save(CourrierDTO dto) {
		Courrier entity = courrierDTOConverter.convertFromDTO(dto);
		entity = courrierDao.save(entity);

		return courrierDTOConverter.convertFromDataBean(entity);
	}

	@Override
	@Transactional
	public CourrierDTO load(Long id) {
		Courrier entity = courrierDao.findOne(id);
		return courrierDTOConverter.convertFromDataBean(entity);
	}
	
	@Override
	@Transactional
	public CourrierDTO loadByType(String type) {
		Courrier entity = courrierDao.getByType(type);
		if(entity == null)
			return null;
		return courrierDTOConverter.convertFromDataBean(entity);
	}
	
	@Override
	@Transactional
	public CourrierDTO loadByTypeByYear(String type, Integer year) {
		Courrier entity = courrierDao.getByTypeByYear(type, year);
		if(entity == null)
			return null;
		return courrierDTOConverter.convertFromDataBean(entity);
	}
	
	@Override
	@Transactional
	public CourrierDTO loadByTypeByMonthByYear(String type, Integer month, Integer year) {
		Courrier entity = courrierDao.getByTypeByMonthByYear(type, month, year);
		if(entity == null)
			return null;
		return courrierDTOConverter.convertFromDataBean(entity);
	}

	@Override
	@Transactional
	public String delete(Long id) {
		String authToken = ged.authentication(opentextUrl, opentextLogin, opentextPassword);
		return ged.stopCourrier(opentextUrl, id, authToken);
	}
	
//	@Override
//	@Transactional
//	public String send(CorrespondanceDTO dto) {
//		SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
//		String authToken = ged.authentication(opentextUrl, opentextLogin, opentextPassword);
//		return ged.sendCorrespondance(opentextUrl, dto, user.getLogin(), "Enregistrement", 4, authToken);
//	}

	@Override
	@Transactional
	public List<CourrierDTO> getAll() {
		List<Courrier> list = courrierDao.findAll();
		List<CourrierDTO> dtos = courrierDTOConverter.convertFromDataBeanList(list);

		return dtos;
	}
	
//	@Override
//	@Transactional
//	public String initiateWorkflow(CorrespondanceSgDTO dto) {
//		SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
//		Courrier entity = courrierDao.getByTypeByMonthByYear("COURRIER ARRIVEE", Calendar.getInstance().get(Calendar.MONTH)+1, Calendar.getInstance().get(Calendar.YEAR));
//		Long sequence = entity.getSequence()+1;
//		String reference = "A/"+Calendar.getInstance().get(Calendar.YEAR)+"/"+String.format("%02d", Calendar.getInstance().get(Calendar.MONTH)+1)+"/"+String.format("%03d", sequence);
//		String authToken = ged.authentication(opentextUrl, opentextLogin, opentextPassword);
//		String result = ged.initiateCorrespondance(opentextUrl, opentextCourrierFactureID, dto, user.getLogin(), reference, authToken);
//		if(result == "FAILED") {
//			return result;
//		}
//		entity.setSequence(sequence);
//		courrierDao.save(entity);
//		
//		return reference;
//	}
	
	@Override
	@Transactional
	public String getReference(String type) {
		AdnId adn = adnIdDao.getMaxAdnId();
		Courrier entity = courrierDao.getByTypeByMonthByYear(type, Calendar.getInstance().get(Calendar.MONTH)+1, Calendar.getInstance().get(Calendar.YEAR));
		Long sequence = (long) 1;
		if(entity != null) {
			sequence = adn.getSeqId()+1;
		} else {
			entity = courrierDao.getByType(type);
			entity.setMonth(Calendar.getInstance().get(Calendar.MONTH)+1);
			entity.setYear(Calendar.getInstance().get(Calendar.YEAR));
		}
		String reference = "A/"+Calendar.getInstance().get(Calendar.YEAR)+"/"+String.format("%02d", Calendar.getInstance().get(Calendar.MONTH)+1)+"/"+String.format("%04d", sequence);
		entity.setSequence(sequence);
		
		adn.setSeqId(sequence);
		adn.setAssignDate(new Date());
		
		adnIdDao.save(adn);
		courrierDao.save(entity);
		
		return reference;
	}

}
