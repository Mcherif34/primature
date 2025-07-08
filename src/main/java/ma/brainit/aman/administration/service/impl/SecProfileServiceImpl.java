package ma.brainit.aman.administration.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.base.BasePaginatorDao;
import ma.brainit.base.BaseTable;
import ma.brainit.base.utils.Util;
import ma.brainit.aman.administration.actions.SearchParam;
import ma.brainit.aman.administration.dao.SecProfileDao;
import ma.brainit.aman.administration.dao.SecUtilisateurDao;
import ma.brainit.aman.administration.dto.SecProfileDTO;
import ma.brainit.aman.administration.dto.converters.SecProfileDTOConverter;
import ma.brainit.aman.administration.model.SecProfile;
import ma.brainit.aman.administration.model.SecUtilisateur;
import ma.brainit.aman.administration.service.SecProfileService;
import ma.brainit.aman.administration.service.SecUtilisateurService;

@Service
@Transactional(readOnly = true)
public class SecProfileServiceImpl implements SecProfileService {

	static Logger logger = LoggerFactory.getLogger(SecProfileServiceImpl.class);

	@Autowired
	private SecProfileDao secProfileDao;

	@Autowired
	private BasePaginatorDao<SecProfile, Long> paginatorDao;

	@Autowired
	private SecProfileDTOConverter secProfileDTOConverter;
	
	@Autowired
	private SecUtilisateurService secUtilisateurServices;
	
	@Autowired
	private SecUtilisateurDao secUtilisateurDao;

	@Override
	@Transactional
	public SecProfileDTO save(SecProfileDTO dto) {
		SecProfile entity = secProfileDTOConverter.convertFromDTO(dto);
		secProfileDao.save(entity);
		dto = secProfileDTOConverter.convertFromDataBean(entity);
		return dto;
	}
	


	@Override
	public SecProfileDTO load(Long id) {
		SecProfile entity = secProfileDao.findOne(id);
		if(entity == null)
			return null;
		return secProfileDTOConverter.convertFromDataBean(entity);
	}
	
	@Override
	public SecProfileDTO loadByPerformer(Long id) {
		SecProfile entity = secProfileDao.getByPerformer(id);
		if(entity == null)
			return null;
		return secProfileDTOConverter.convertFromDataBean(entity);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		secProfileDao.delete(id);
	}

	@Override
	public List<SecProfileDTO> findAll() {
		return secProfileDTOConverter.convertFromDataBeanList(secProfileDao.findAll());
	}

	@Override
	public List<SecProfileDTO> getAllConseillers() {
		return secProfileDTOConverter.convertFromDataBeanList(secProfileDao.getAllConseillers());
	}
	
	@Override
	public String getPaginator(Integer page, Integer limit, String sort, String direction, String search) {
		StringBuilder condition = new StringBuilder("WHERE e.performer IS NOT NULL");
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams = secProfileDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(SecProfile.class);
		List<SecProfile> list = paginatorDao.getPaginator(page, limit, sort, direction, searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<SecProfileDTO> dtos = secProfileDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<SecProfileDTO>(dtos, totalCount));
	}
	
	@Override
	public List<String> getModulesByUser(Long userId) {
		return secProfileDao.getModulesByUser(userId);
	}
	
}