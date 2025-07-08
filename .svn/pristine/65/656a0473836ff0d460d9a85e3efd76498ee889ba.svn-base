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
import ma.brainit.aman.administration.dao.SecAuthoriteDao;
import ma.brainit.aman.administration.dto.SecAuthoriteDTO;
import ma.brainit.aman.administration.dto.converters.SecAuthoriteDTOConverter;
import ma.brainit.aman.administration.model.SecAuthorite;
import ma.brainit.aman.administration.service.SecAuthoriteService;

@Service
@Transactional(readOnly = true)
public class SecAuthoriteServiceImpl implements SecAuthoriteService {

	static Logger logger = LoggerFactory.getLogger(SecAuthoriteServiceImpl.class);

	@Autowired
	private SecAuthoriteDao SecAuthoriteDao;

	@Autowired
	private BasePaginatorDao<SecAuthorite, Long> paginatorDao;

	@Autowired
	private SecAuthoriteDTOConverter SecAuthoriteDTOConverter;

	@Override
	@Transactional
	public SecAuthoriteDTO save(SecAuthoriteDTO dto) {
		SecAuthorite entity = SecAuthoriteDTOConverter.convertFromDTO(dto);
		SecAuthoriteDao.save(entity);
		dto = SecAuthoriteDTOConverter.convertFromDataBean(entity);
		return dto;
	}

	@Override
	public SecAuthoriteDTO load(Long id) {
		SecAuthorite entity = SecAuthoriteDao.findOne(id);
		return SecAuthoriteDTOConverter.convertFromDataBean(entity);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		SecAuthoriteDao.delete(id);
	}

	@Override
	public List<SecAuthoriteDTO> findAll() {
		return SecAuthoriteDTOConverter.convertFromDataBeanList(SecAuthoriteDao.findAll());
	}
	
	@Override
	public List<SecAuthoriteDTO> getByScreen(Long moduleId) {
		return SecAuthoriteDTOConverter.convertFromDataBeanList(SecAuthoriteDao.getByScreen(moduleId));
	}

	@Override
	public String getPaginator(Integer page, Integer limit, String sort, String direction, String search) {
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams = SecAuthoriteDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(SecAuthorite.class);
		List<SecAuthorite> list = paginatorDao.getPaginator(page, limit, sort, direction, searchParams, null);
		Long totalCount = paginatorDao.count(searchParams, null);
		List<SecAuthoriteDTO> dtos = SecAuthoriteDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<SecAuthoriteDTO>(dtos, totalCount));
	}
	
	@Override
	public String getPaginatorByScreen(Integer page, Integer limit, String sort, String direction, String search, Long screenId) {
		StringBuilder condition = new StringBuilder("");
		if(screenId != null) {
			condition.append("WHERE e.secEcran.id = ").append(screenId);
		}
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams = SecAuthoriteDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(SecAuthorite.class);
		List<SecAuthorite> list = paginatorDao.getPaginator(page, limit, sort, direction, searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<SecAuthoriteDTO> dtos = SecAuthoriteDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<SecAuthoriteDTO>(dtos, totalCount));
	}

}