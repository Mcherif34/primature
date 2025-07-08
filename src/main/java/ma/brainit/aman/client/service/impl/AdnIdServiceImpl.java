package ma.brainit.aman.client.service.impl;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.administration.actions.SearchParam;
import ma.brainit.aman.client.dao.AdnIdDao;
import ma.brainit.aman.client.dto.AdnIdDTO;
import ma.brainit.aman.client.dto.converters.AdnIdDTOConverter;
import ma.brainit.aman.client.model.AdnId;
import ma.brainit.aman.client.service.AdnIdService;
import ma.brainit.aman.webservice.GedService;
import ma.brainit.base.BasePaginatorDao;
import ma.brainit.base.BaseTable;
import ma.brainit.base.utils.Util;


@Service
@Transactional
public class AdnIdServiceImpl implements AdnIdService {

	@Autowired
	private AdnIdDTOConverter AdnIdDTOConverter;

	@Autowired
	private BasePaginatorDao<AdnId, Long> paginatorDao;

	@Autowired
	private AdnIdDao AdnIdDao;


	@Override
	public String getPage(Integer page, Integer limit, String sort, String direction, String search) {
		StringBuilder condition = new StringBuilder("");
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams  = AdnIdDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(AdnId.class);
		List<AdnId> list = paginatorDao.getPaginator(page, limit,sort,direction,searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<AdnIdDTO> dtos = AdnIdDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<AdnIdDTO>(dtos,totalCount));
	}

	@Override
	@Transactional
	public AdnIdDTO save(AdnIdDTO dto) {
		AdnId entity = AdnIdDTOConverter.convertFromDTO(dto);
		entity = AdnIdDao.save(entity);

		return AdnIdDTOConverter.convertFromDataBean(entity);
	}

	@Override
	@Transactional
	public AdnIdDTO load(Long id) {
		AdnId entity = AdnIdDao.findOne(id);
		return AdnIdDTOConverter.convertFromDataBean(entity);
	}
	
	@Override
	@Transactional
	public void delete(Long id) {
		AdnIdDao.delete(id);
	}
	
	@Override
	@Transactional
	public AdnIdDTO getMaxAdnId() {
		AdnId entity = AdnIdDao.getMaxAdnId();
		return AdnIdDTOConverter.convertFromDataBean(entity);
	}

}
