package ma.brainit.base;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.apache.commons.lang.math.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

import ma.brainit.aman.administration.actions.SearchParam;

/**
 * Implementation de l'interface PaginatorDao
 * 
 * @author iliassb
 * 
 * @param <VEntity>
 *            La VEntity à paginer
 * @param <PK>
 *            La classe de la clé primaire
 *            
 * @version 2.0.0
 */
@Repository("paginatorDao")
@Scope("prototype")
public class BasePaginatorImpl<VEntity, PK> implements BasePaginatorDao<VEntity, PK> {

	protected Class<VEntity> entityClass;

	@PersistenceContext
	protected EntityManager entityManager;

	/**
	 * @see BasePaginatorDao.getPage
	 */
	@Override
	public List<VEntity> getPaginator(int page, int limit,String sort,String direction,List<SearchParam> searchParams, String conditionSupplementaire) {
		StringBuilder requete = new StringBuilder("select e from ");
		requete.append(entityClass.getName());
		requete.append(" e");
		if (StringUtils.isNotEmpty(conditionSupplementaire)) {
			requete.append(" ").append(conditionSupplementaire).append(" ");
		}else{
			requete.append(" where e IS NOT NULL ");
		}
		setParamNames(requete,searchParams);
		if (StringUtils.isNotEmpty(sort)) {
			
			if(sort.endsWith("St")){
				sort = sort.substring(0, sort.length() - 2);
			}
			
			requete.append(" order by e.");
			requete.append(sort);
			requete.append(" ");
			requete.append(StringUtils.upperCase(direction));
		}

		TypedQuery<VEntity> query = this.entityManager.createQuery(requete.toString(), entityClass);

		setParamValues(query,searchParams);

		if(limit > 0) {
			query.setFirstResult(((page-1)*limit));
			query.setMaxResults(limit);
		}
		return query.getResultList();
	}
	
	@Override
	public List<VEntity> getInvoicePaginator(int page, int limit,String sort,String direction,List<SearchParam> searchParams, String conditionSupplementaire) {
		StringBuilder requete = new StringBuilder("SELECT t FROM CourrierFacture t INNER JOIN (SELECT VolumeID, MAX(VersionNum) AS MaxVersionNum FROM CourrierFacture t GROUP BY VolumeID) mv ON t.VolumeID = mv.VolumeID AND t.VersionNum = mv.MaxVersionNum");
//		requete.append(entityClass.getName());
//		requete.append(" t INNER JOIN (SELECT VolumeID, MAX(VersionNum) AS MaxVersionNum FROM ");
//		requete.append(entityClass.getName());
//		requete.append(" GROUP BY VolumeID) mv ON t.VolumeID = mv.VolumeID AND t.VersionNum = mv.MaxVersionNum");
		if (StringUtils.isNotEmpty(conditionSupplementaire)) {
			requete.append(" ").append(conditionSupplementaire).append(" ");
		}else{
			requete.append(" where t IS NOT NULL ");
		}
		setParamNames(requete,searchParams);
		if(StringUtils.isNotEmpty(sort)) {
			if(sort.endsWith("St")){
				sort = sort.substring(0, sort.length() - 2);
			}
			requete.append(" order by t.");
			requete.append(sort);
			requete.append(" ");
			requete.append(StringUtils.upperCase(direction));
		}

		TypedQuery<VEntity> query = this.entityManager.createQuery(requete.toString(), entityClass);

		setParamValues(query,searchParams);

		if(limit > 0) {
			query.setFirstResult(((page-1)*limit));
			query.setMaxResults(limit);
		}
		return query.getResultList();
	}

	/**
	 * @see BasePaginatorDao.count
	 */
	@Override
	public Long count(List<SearchParam> searchParams, String conditionSupplementaire) {
		StringBuilder requete = new StringBuilder("select e from ");
		requete.append(entityClass.getName());
		requete.append(" e");
		if (StringUtils.isNotEmpty(conditionSupplementaire)) {
//			if(conditionSupplementaire.contains("e.marche.id = -1")){
//				conditionSupplementaire = conditionSupplementaire.replace("e.marche.id = -1", "e.marche.nature = 'E'");
//			}
//			else if(conditionSupplementaire.contains("e.marche.id = -2")){
//				conditionSupplementaire = conditionSupplementaire.replace("e.marche.id = -2", "e.marche.nature = 'T'");
//			}
			requete.append(" ").append(conditionSupplementaire).append(" ");
		}else{
			requete.append(" where e IS NOT NULL ");
		}
		setParamNames(requete,searchParams);
		requete.append(" order by e.id DESC");

		TypedQuery<VEntity> query = entityManager.createQuery(requete.toString(),entityClass);
		setParamValues(query, searchParams);
		int nombre = 0;
		try {
			List<VEntity> list = query.getResultList();
			nombre = list.size();
		} catch (Exception e) {
			// TODO: handle exception
		}

		return new Long(nombre);
	}
	
	@Override
	public Long invoiceCount(List<SearchParam> searchParams, String conditionSupplementaire) {
		StringBuilder requete = new StringBuilder("SELECT t FROM CourrierFacture t INNER JOIN (SELECT VolumeID, MAX(VersionNum) AS MaxVersionNum FROM CourrierFacture t GROUP BY VolumeID) mv ON t.VolumeID = mv.VolumeID AND t.VersionNum = mv.MaxVersionNum");
//		requete.append(entityClass.getName());
//		requete.append(" ");
		
		if (StringUtils.isNotEmpty(conditionSupplementaire)) {
			requete.append(" ").append(conditionSupplementaire).append(" ");
		}else{
			requete.append(" where t IS NOT NULL ");
		}
		setParamNames(requete,searchParams);
		requete.append(" order by t.id DESC");

		TypedQuery<VEntity> query = entityManager.createQuery(requete.toString(),entityClass);
		setParamValues(query, searchParams);
		int nombre = 0;
		try {
			List<VEntity> list = query.getResultList();
			nombre = list.size();
		} catch (Exception e) {
			// TODO: handle exception
		}

		return new Long(nombre);
	}

	@Override
	public Double getSumFieldForList(String field,String sort,String direction,List<SearchParam> searchParams, String conditionSupplementaire) {
		StringBuilder requete = new StringBuilder("select new java.lang.Double(SUM(e.").append(field).append("))");
		requete.append(" from ");
		requete.append(entityClass.getName());
		requete.append(" e");
		if (StringUtils.isNotEmpty(conditionSupplementaire)) {
//			if(conditionSupplementaire.contains("e.marche.id = -1")){
//				conditionSupplementaire = conditionSupplementaire.replace("e.marche.id = -1", "e.marche.nature = 'E'");
//			}
//			else if(conditionSupplementaire.contains("e.marche.id = -2")){
//				conditionSupplementaire = conditionSupplementaire.replace("e.marche.id = -2", "e.marche.nature = 'T'");
//			}
			requete.append(" ").append(conditionSupplementaire).append(" ");
		}else{
			requete.append(" where e IS NOT NULL ");
		}
		setParamNames(requete,searchParams);
		if (StringUtils.isNotEmpty(sort)) {
			requete.append(" order by e.");
			requete.append(sort);
			requete.append(" ");
			requete.append(StringUtils.upperCase(direction));
		}

		TypedQuery<Double> query = this.entityManager.createQuery(requete.toString(), Double.class);

		setParamValues(query,searchParams);

		return query.getSingleResult();
	}

	private void setParamNames(StringBuilder requette,List<SearchParam> searchParams){
		if(searchParams != null && searchParams.size()>0){
			int i=1;
			for(SearchParam param:searchParams){
				if(StringUtils.equalsIgnoreCase(param.getOper(), "Decimal") || StringUtils.equalsIgnoreCase(param.getOper(), "BigDecimal") ){
					requette.append(" and e.").append(param.getName()).append("");
					if(StringUtils.contains(param.getValue(), ">")){
						param.setValue(StringUtils.remove(param.getValue(), ">"));
						requette.append(" > ");
					}else if(StringUtils.contains(param.getValue(), "<")){
						param.setValue(StringUtils.remove(param.getValue(), "<"));
						requette.append(" < ");
					}else if(StringUtils.contains(param.getValue(), "=")){
						param.setValue(StringUtils.remove(param.getValue(), "="));
						requette.append(" = ");
					}else if(StringUtils.contains(param.getValue(), ",")){
						requette.append(" in ");
					}
					else{
						requette.append(" = ");
					}
					requette.append(" ?").append(i).append("");
				}else if (StringUtils.equalsIgnoreCase(param.getOper(), "Date") ){
					requette.append(" and e.").append(param.getName()).append(" between ");
					requette.append(" ?").append(i).append("98 and ?").append(i).append("99 ");
				}else if (StringUtils.equalsIgnoreCase(param.getOper(), "Boolean") ){
					requette.append(" and e.").append(param.getName()).append(" is ?").append(i).append(" ");
				}
				else{
					if(StringUtils.contains(param.getName(),"valeur")){
						String paramName1 = StringUtils.replace(param.getName(), "valeur", "valeurc");
						String paramName2 = StringUtils.replace(param.getName(), "valeur", "valeurn");
						requette.append(" and ( e.").append(paramName1).append(" like ?").append(i).append(" ");
						requette.append(" or e.").append(paramName2).append(" like ?").append(i).append(" ) ");
					}else{
						requette.append(" and upper(e.").append(param.getName()).append(")")
						.append("")
						.append(" like upper(?").append(i).append(") ");
					}
				}
				i++;
			}
		}
	}

	private void setParamValues(TypedQuery query,List<SearchParam> searchParams){
		if(searchParams != null && searchParams.size()>0){
			int i=1;
			for(SearchParam param:searchParams){
				if(StringUtils.equalsIgnoreCase(param.getOper(), "Decimal")){
					if(StringUtils.contains(param.getValue(), ",")){
						List<Long> paramsList = new ArrayList<Long>();
						String[] parts = param.getValue().split(",");
						for (String part : parts) {
							paramsList.add(new Long(part));
						}
						query.setParameter(i,paramsList);
					}
					else{
						query.setParameter(i,new Long(param.getValue()));
					}
				}else if( StringUtils.contains(param.getOper(), "BigDecimal")){
					query.setParameter(i,new BigDecimal(param.getValue().replace(" ", "")));
				}else if( StringUtils.contains(param.getOper(), "Date")){
					String[] champsDate;
					String valeur = param.getValue();
					if (!StringUtils.contains(valeur, '-')) {
						champsDate = new String[2];
						champsDate[0] = StringUtils.trimToEmpty(valeur);
						champsDate[1] = champsDate[0];
					} else {
						champsDate = StringUtils.split(valeur, '-');
						champsDate[0] = StringUtils.trimToEmpty(champsDate[0]);
						champsDate[1] = StringUtils.trimToEmpty(champsDate[1]);
					}
					Date[] dates = new Date[2];
					try {
						dates[0] = DateUtils.parseDate(champsDate[0], DATE_PATTERNS);
					} catch (ParseException e) {
						e.printStackTrace();
					}
					try {
						dates[1] = DateUtils.parseDate(champsDate[1], DATE_PATTERNS);
					} catch (ParseException e) {
						e.printStackTrace();
					}
					query.setParameter(i+"98",dates[0]);
					query.setParameter(i+"99",dates[1]);
				}else if( StringUtils.contains(param.getOper(), "Boolean")){
					query.setParameter(i,new Boolean(param.getValue()));
				}else{
					query.setParameter(i,"%"+String.valueOf(param.getValue())+"%" );
				}
				i++;
			}
		}
	}


	@Override
	public List<VEntity> getPage(int first, int max, String critere,
			String ordre, Map<String, Object> filtre) {
		StringBuilder requete = new StringBuilder("from ");
		requete.append(entityClass.getName());
		requete.append(" e");
		// requete.append(constructFiltrerRequestFromFiltre(filtre));
		Map<String, Object> requeteElementsBuffer = constructFiltrerRequestFromFiltre(
				requete, filtre);
		if (StringUtils.isNotEmpty(critere)) {
			requete.append(" order by e.");
			requete.append(critere);
			requete.append(" ");
			requete.append(StringUtils.upperCase(ordre));
		}

		TypedQuery<VEntity> query = this.entityManager.createQuery(
				requete.toString(), entityClass);
		for (Entry<String, Object> requeteElement : requeteElementsBuffer
				.entrySet()) {
			query.setParameter(requeteElement.getKey(),
					requeteElement.getValue());
		}
		query.setFirstResult(first);
		query.setMaxResults(max);
		return query.getResultList();
	}

	/**
	 * @see BasePaginatorDao.count
	 */
	@Override
	public Long count() {
		return count(null, null);
	}

	/**
	 * @see BasePaginatorDao.setEntityClass
	 */
	@Override
	public void setEntityClass(Class<VEntity> entityClass) {
		this.entityClass = entityClass;
	}

	/**
	 * @see BasePaginatorDao.filtrerPaginator
	 */
	@Override
	public void filtrerPaginator(String typeOp, HashMap<String, Map<String, String>> filtre, String valeur)
	{
		if(filtre!=null)
		{
			Map<String, String> espace = new HashMap<String, String>();
			espace.put("espace", " ");
			filtre.put("espace", espace);
		}
		else{

			filtre =new HashMap<String, Map<String, String>>();
		}
		Map<String, String> critere = new HashMap<String, String>();
		critere.put("operateurfiltre", typeOp);
		critere.put("valeur", valeur);
		filtre.put("critere", critere);
	}

	/**
	 * @see BasePaginatorDao.getById
	 */
	@Override
	public VEntity getById(PK id) {
		VEntity entite = null;
		StringBuilder requete = new StringBuilder();
		requete.append("from ").append(entityClass.getName())
		.append(" e where e.id = :id");
		TypedQuery<VEntity> query = entityManager.createQuery(
				requete.toString(), entityClass);
		query.setParameter("id", id);
		List<VEntity> tmpListe = query.getResultList();
		if (tmpListe != null && tmpListe.size() > 0) {
			entite = tmpListe.get(0);
		}
		return entite;
	}

	private Map<String, Object> constructFiltrerRequestFromFiltre(StringBuilder requete, Map<String, Object> filtre) {
		Map<String, Object> requeteElements = new HashMap<String, Object>();
		return requeteElements;
	}

	private void processStringOperateurInFilter(StringBuilder requete,
			Map<String, Object> requeteElements, String champsAFiltrerAvec,
			Map<String, String> mapFiltrePourLeChampsActif) {
		String valeur = mapFiltrePourLeChampsActif.get("valeur").toString();
		String resultValue;
		String index2 = valeur.substring(1, 2);
		if(!index2.equals("=")) {
			String index1 = valeur.substring(0, 1);
			String newIndex1 = valeur.substring(0, 1)+" ";
			resultValue = valeur.replace(index1, newIndex1);
		}
		else resultValue = valeur;
		String operateur = resultValue.substring(0, 2);
		String value;
		if(resultValue.substring(2).equals(""))
			value = "0";
		else
			value = resultValue.substring(2);

		requete.append(" "+operateur+" ");
		requete.append(":value");
		requete.append(")");
		requeteElements.put("value", new BigDecimal(value.replace(" ", "").replace(",", ".")));


	}

	static final String[] DATE_PATTERNS = { "dd/MM/yyyy" };

}
