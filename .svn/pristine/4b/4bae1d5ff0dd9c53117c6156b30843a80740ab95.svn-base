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
import ma.brainit.aman.administration.dao.SecModuleDao;
import ma.brainit.aman.administration.dto.SecModuleDTO;
import ma.brainit.aman.administration.dto.converters.SecModuleDTOConverter;
import ma.brainit.aman.administration.model.SecModule;
import ma.brainit.aman.administration.service.SecModuleService;

@Service
@Transactional(readOnly = true)
public class SecModuleServiceImpl implements SecModuleService {

	static Logger logger = LoggerFactory.getLogger(SecModuleServiceImpl.class);

	@Autowired
	private SecModuleDao secModuleDao;

	@Autowired
	private BasePaginatorDao<SecModule, Long> paginatorDao;

	@Autowired
	private SecModuleDTOConverter secModuleDTOConverter;

	@Override
	@Transactional
	public SecModuleDTO save(SecModuleDTO dto) {
		SecModule entity = secModuleDTOConverter.convertFromDTO(dto);
		secModuleDao.save(entity);
		dto = secModuleDTOConverter.convertFromDataBean(entity);
		return dto;
	}

	@Override
	public SecModuleDTO load(Long id) {
		SecModule entity = secModuleDao.findOne(id);
		return secModuleDTOConverter.convertFromDataBean(entity);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		secModuleDao.delete(id);
	}

	@Override
	public List<SecModuleDTO> findAll() {
		return secModuleDTOConverter.convertFromDataBeanList(secModuleDao.findAll());
	}

	@Override
	public String getPaginator(Integer page, Integer limit, String sort, String direction, String search) {
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams = secModuleDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(SecModule.class);
		List<SecModule> list = paginatorDao.getPaginator(page, limit, sort, direction, searchParams, null);
		Long totalCount = paginatorDao.count(searchParams, null);
		List<SecModuleDTO> dtos = secModuleDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<SecModuleDTO>(dtos, totalCount));
	}

}