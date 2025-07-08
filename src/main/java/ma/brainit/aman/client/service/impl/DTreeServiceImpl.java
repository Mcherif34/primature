package ma.brainit.aman.client.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.administration.actions.SearchParam;
import ma.brainit.aman.client.dao.DTreeDao;
import ma.brainit.aman.client.dto.DTreeDTO;
import ma.brainit.aman.client.dto.converters.DTreeDTOConverter;
import ma.brainit.aman.client.model.DTree;
import ma.brainit.aman.client.service.DTreeService;
import ma.brainit.aman.webservice.GedService;
import ma.brainit.base.BasePaginatorDao;
import ma.brainit.base.BaseTable;
import ma.brainit.base.utils.Util;

@Service
@Transactional
public class DTreeServiceImpl implements DTreeService {

	@Autowired
	private DTreeDTOConverter DTreeDTOConverter;

	@Autowired
	private BasePaginatorDao<DTree, Long> paginatorDao;

	@Autowired
	private DTreeDao DTreeDao;

	@Override
	public String getPage(Integer page, Integer limit, String sort, String direction, String search) {
		StringBuilder condition = new StringBuilder("");
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams  = DTreeDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(DTree.class);
		List<DTree> list = paginatorDao.getPaginator(page, limit,sort,direction,searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<DTreeDTO> dtos = DTreeDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<DTreeDTO>(dtos,totalCount));
	}

	@Override
	@Transactional
	public DTreeDTO save(DTreeDTO dto) {
		DTree entity = DTreeDTOConverter.convertFromDTO(dto);
		entity = DTreeDao.save(entity);

		return DTreeDTOConverter.convertFromDataBean(entity);
	}

	@Override
	@Transactional
	public DTreeDTO load(Long id) {
		DTree entity = DTreeDao.findOne(id);
		return DTreeDTOConverter.convertFromDataBean(entity);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		DTreeDao.delete(id);
	}

	@Override
	@Transactional
	public List<DTreeDTO> getAll() {
		List<DTree> list = DTreeDao.findAll();
		List<DTreeDTO> dtos = DTreeDTOConverter.convertFromDataBeanList(list);

		return dtos;
	}

}
