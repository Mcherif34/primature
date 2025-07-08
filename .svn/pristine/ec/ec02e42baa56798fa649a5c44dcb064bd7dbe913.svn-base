package ma.brainit.aman.administration.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.base.BasePaginatorDao;
import ma.brainit.base.BaseTable;
import ma.brainit.base.utils.Util;
import ma.brainit.aman.administration.actions.SearchParam;
import ma.brainit.aman.administration.dao.SecUtilisateurAuthoriteDao;
import ma.brainit.aman.administration.dto.SecUtilisateurAuthoriteDTO;
import ma.brainit.aman.administration.dto.converters.SecUtilisateurAuthoriteDTOConverter;
import ma.brainit.aman.administration.model.SecUtilisateurAuthorite;
import ma.brainit.aman.administration.model.SecUtilisateurAuthoritePK;
import ma.brainit.aman.administration.service.SecUtilisateurAuthoriteService;


@Service
@Transactional
public class SecUtilisateurAuthoriteServiceImpl implements SecUtilisateurAuthoriteService {

	@Autowired
	private SecUtilisateurAuthoriteDTOConverter secUtilisateurAuthoriteDTOConverter;
	
	@Autowired
	private BasePaginatorDao<SecUtilisateurAuthorite, Long> paginatorDao;
	
	@Autowired
	private SecUtilisateurAuthoriteDao secUtilisateurAuthoriteDao;
	
	
	@Override
	public String getPage(Integer page, Integer limit, String sort, String direction, String search) {
		StringBuilder condition = new StringBuilder("");
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams  = secUtilisateurAuthoriteDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(SecUtilisateurAuthorite.class);
		List<SecUtilisateurAuthorite> list = paginatorDao.getPaginator(page, limit,sort,direction,searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<SecUtilisateurAuthoriteDTO> dtos = secUtilisateurAuthoriteDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<SecUtilisateurAuthoriteDTO>(dtos,totalCount));
	}
	
	@Override
	public String getPageByUtilisateur(Integer page, Integer limit, String sort, String direction, String search, Long secUtilisateurId) {
		StringBuilder condition = new StringBuilder("");
		condition.append("join e.secUtilisateur u where u.id = ").append(secUtilisateurId);
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams  = secUtilisateurAuthoriteDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(SecUtilisateurAuthorite.class);
		List<SecUtilisateurAuthorite> list = paginatorDao.getPaginator(page, limit,sort,direction,searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<SecUtilisateurAuthoriteDTO> dtos = secUtilisateurAuthoriteDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<SecUtilisateurAuthoriteDTO>(dtos,totalCount));
	}
	
	@Override
	@Transactional
	public SecUtilisateurAuthoriteDTO save(SecUtilisateurAuthoriteDTO dto) {
		SecUtilisateurAuthorite entity = secUtilisateurAuthoriteDTOConverter.convertFromDTO(dto);
		entity = secUtilisateurAuthoriteDao.save(entity);
		return secUtilisateurAuthoriteDTOConverter.convertFromDataBean(entity);
	}

	@Override
	@Transactional
	public SecUtilisateurAuthoriteDTO load(SecUtilisateurAuthoritePK id) {	
		SecUtilisateurAuthorite entity = secUtilisateurAuthoriteDao.findOne(id);
		return secUtilisateurAuthoriteDTOConverter.convertFromDataBean(entity);
	}

	@Override
	@Transactional
	public void delete(SecUtilisateurAuthoritePK id) {
		secUtilisateurAuthoriteDao.delete(id);
	}
	
	@Override
	@Transactional
	public List<SecUtilisateurAuthoriteDTO> getAll() {
		
		List<SecUtilisateurAuthorite> list = secUtilisateurAuthoriteDao.findAll();
		List<SecUtilisateurAuthoriteDTO> dtos = secUtilisateurAuthoriteDTOConverter.convertFromDataBeanList(list);
		
		return dtos;
	}

	@Override
	public List<Long> getAuthoritesIdByUtilisateur(Long secUtilisateurId) {
		// TODO Auto-generated method stub
		return null;
	}
	

	
}
