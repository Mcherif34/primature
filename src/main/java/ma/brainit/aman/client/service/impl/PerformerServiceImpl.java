package ma.brainit.aman.client.service.impl;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.administration.actions.SearchParam;
import ma.brainit.aman.client.dao.PerformerDao;
import ma.brainit.aman.client.dto.PerformerDTO;
import ma.brainit.aman.client.dto.converters.PerformerDTOConverter;
import ma.brainit.aman.client.model.Performer;
import ma.brainit.aman.client.service.PerformerService;
import ma.brainit.aman.webservice.GedService;
import ma.brainit.base.BasePaginatorDao;
import ma.brainit.base.BaseTable;
import ma.brainit.base.utils.Util;


@Service
@Transactional
public class PerformerServiceImpl implements PerformerService {

	@Autowired
	private PerformerDTOConverter PerformerDTOConverter;

	@Autowired
	private BasePaginatorDao<Performer, Long> paginatorDao;

	@Autowired
	private PerformerDao PerformerDao;


	@Override
	public String getPage(Integer page, Integer limit, String sort, String direction, String search) {
		StringBuilder condition = new StringBuilder("");
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams  = PerformerDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(Performer.class);
		List<Performer> list = paginatorDao.getPaginator(page, limit,sort,direction,searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<PerformerDTO> dtos = PerformerDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<PerformerDTO>(dtos,totalCount));
	}

	@Override
	@Transactional
	public PerformerDTO save(PerformerDTO dto) {
		Performer entity = PerformerDTOConverter.convertFromDTO(dto);
		entity = PerformerDao.save(entity);

		return PerformerDTOConverter.convertFromDataBean(entity);
	}

	@Override
	@Transactional
	public PerformerDTO load(Long id) {
		Performer entity = PerformerDao.findOne(id);
		return PerformerDTOConverter.convertFromDataBean(entity);
	}
	
	@Override
	@Transactional
	public void delete(Long id) {
		PerformerDao.delete(id);
	}

	@Override
	@Transactional
	public List<PerformerDTO> getAll() {
		List<Performer> list = PerformerDao.getAll();
		List<PerformerDTO> dtos = PerformerDTOConverter.convertFromDataBeanList(list);

		return dtos;
	}
	
	@Override
	@Transactional
	public List<PerformerDTO> getAllGroups() {
		List<Performer> list = PerformerDao.getAllGroups();
		List<PerformerDTO> dtos = PerformerDTOConverter.convertFromDataBeanList(list);

		return dtos;
	}

}
