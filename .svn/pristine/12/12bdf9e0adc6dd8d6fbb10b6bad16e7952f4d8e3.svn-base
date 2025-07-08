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
import ma.brainit.aman.administration.dao.SecEcranDao;
import ma.brainit.aman.administration.dto.SecEcranDTO;
import ma.brainit.aman.administration.dto.converters.SecEcranDTOConverter;
import ma.brainit.aman.administration.model.SecEcran;
import ma.brainit.aman.administration.service.SecEcranService;

@Service
@Transactional(readOnly = true)
public class SecEcranServiceImpl implements SecEcranService {

	static Logger logger = LoggerFactory.getLogger(SecEcranServiceImpl.class);

	@Autowired
	private SecEcranDao SecEcranDao;

	@Autowired
	private BasePaginatorDao<SecEcran, Long> paginatorDao;

	@Autowired
	private SecEcranDTOConverter SecEcranDTOConverter;

	@Override
	@Transactional
	public SecEcranDTO save(SecEcranDTO dto) {
		SecEcran entity = SecEcranDTOConverter.convertFromDTO(dto);
		SecEcranDao.save(entity);
		dto = SecEcranDTOConverter.convertFromDataBean(entity);
		return dto;
	}

	@Override
	public SecEcranDTO load(Long id) {
		SecEcran entity = SecEcranDao.findOne(id);
		return SecEcranDTOConverter.convertFromDataBean(entity);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		SecEcranDao.delete(id);
	}

	@Override
	public List<SecEcranDTO> findAll() {
		return SecEcranDTOConverter.convertFromDataBeanList(SecEcranDao.findAll());
	}
	
	@Override
	public List<SecEcranDTO> getByModule(Long moduleId) {
		return SecEcranDTOConverter.convertFromDataBeanList(SecEcranDao.getByModule(moduleId));
	}

	@Override
	public String getPaginator(Integer page, Integer limit, String sort, String direction, String search) {
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams = SecEcranDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(SecEcran.class);
		List<SecEcran> list = paginatorDao.getPaginator(page, limit, sort, direction, searchParams, null);
		Long totalCount = paginatorDao.count(searchParams, null);
		List<SecEcranDTO> dtos = SecEcranDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<SecEcranDTO>(dtos, totalCount));
	}
	
	@Override
	public String getPaginatorByModule(Integer page, Integer limit, String sort, String direction, String search, Long moduleId) {
		StringBuilder condition = new StringBuilder("");
		if(moduleId != null) {
			condition.append("WHERE e.secModule.id = ").append(moduleId);
		}
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams = SecEcranDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(SecEcran.class);
		List<SecEcran> list = paginatorDao.getPaginator(page, limit, sort, direction, searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<SecEcranDTO> dtos = SecEcranDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<SecEcranDTO>(dtos, totalCount));
	}

}