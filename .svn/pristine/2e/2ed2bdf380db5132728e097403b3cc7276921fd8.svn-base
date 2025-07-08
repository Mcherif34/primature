package ma.brainit.base;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

//import ma.brainit.aman.commun.model.Referentiel;


@Repository("queryDao")
@Scope("prototype")
public class BaseListDaoImpl implements BaseListDao {

	@PersistenceContext
	protected EntityManager entityManager;

	@Override
	public List<ListDTO> findAll(String entity,String field,String ordre) {
		StringBuilder requete = new StringBuilder("select ");
		requete.append("new ma.brainit.base.ListDTO(e.id,e.").append(field).append(") ");
		requete.append("from ");
		requete.append(entity);
		requete.append(" e");
		requete.append(" order by e.");
		requete.append(field);
		requete.append(" ");
		requete.append(StringUtils.upperCase(ordre));
		TypedQuery<ListDTO> query = this.entityManager.createQuery(requete.toString(),ListDTO.class);
		return query.getResultList();
	}

	@Override
	public List<ListDTO> findAll(String entity,String field,String fieldOrdre,String ordre) {
		StringBuilder requete = new StringBuilder("select ");
		requete.append("new ma.brainit.base.ListDTO(e.id,e.").append(field).append(") ");
		requete.append("from ");
		requete.append(entity);
		requete.append(" e");
		requete.append(" order by e.");
		requete.append(fieldOrdre);
		requete.append(" ");
		requete.append(StringUtils.upperCase(ordre));
		TypedQuery<ListDTO> query = this.entityManager.createQuery(requete.toString(),ListDTO.class);
		return query.getResultList();
	}

	@Override
	public List<ListDTO> findAll(String entity, String field, String filtreChamp, String filtreValeur,
			String fieldOrdre, String ordre) {
		StringBuilder requete = new StringBuilder("select ");
		requete.append("new ma.brainit.base.ListDTO(e.id,e.").append(field).append(") ");
		requete.append("from ");
		requete.append(entity);
		requete.append(" e");
		if(filtreChamp != null && filtreValeur != null){
			requete.append("  where e.").append(filtreChamp).append(" = ").append(filtreValeur);
		}
		requete.append(" order by e.");
		requete.append(fieldOrdre);
		requete.append(" ");
		requete.append(StringUtils.upperCase(ordre));
		TypedQuery<ListDTO> query = this.entityManager.createQuery(requete.toString(),ListDTO.class);
		return query.getResultList();
	}

	@Override
	public List<ListDTO> getReferentielValues(Long colonneId) {
		StringBuilder requete = new StringBuilder("select ");
		requete.append("new ma.brainit.base.ListDTO(e.id,e.valeurc,e.valeurn").append(") ");
		requete.append("from ");
		//requete.append(Referentiel.class.getName());
		requete.append(" e");
		requete.append(" where e.colonne.id = ").append(colonneId);
		requete.append(" order by e.valeurc ASC,e.valeurn ASC");
		TypedQuery<ListDTO> query = this.entityManager.createQuery(requete.toString(),ListDTO.class);
		return query.getResultList();
	}

	@Override
	public List<ListDTO> getReferentielValues(String entite, String colonne) {
		StringBuilder requete = new StringBuilder("select ");
		requete.append("new ma.brainit.base.ListDTO(e.id,e.designation").append(") ");
		requete.append("from ");
		//requete.append(Referentiel.class.getName());
		requete.append(" e");
		requete.append(" where e.colonne.entite.entite = '").append(entite).append("'");
		requete.append(" and e.colonne.colonne = '").append(colonne).append("'");
		requete.append(" order by e.designation ASC");
		TypedQuery<ListDTO> query = this.entityManager.createQuery(requete.toString(),ListDTO.class);
		return query.getResultList();
	}
	


	@Override
	public List<ListDTO> getReferentielValues(Long entite, String colonne) {
		StringBuilder requete = new StringBuilder("select ");
		requete.append("new ma.brainit.base.ListDTO(e,e.id,e.valeurc,e.valeurn").append(") ");
		requete.append("from ");
		//requete.append(Referentiel.class.getName());
		requete.append(" e");
		requete.append(" where e.colonne.entite.id = ").append(entite).append("");
		requete.append(" and e.colonne.colonne = '").append(colonne).append("'");
		requete.append(" order by e.valeurc ASC,e.valeurn ASC");
		TypedQuery<ListDTO> query = this.entityManager.createQuery(requete.toString(),ListDTO.class);
		return query.getResultList();
	}

	@Override
	public String getLibelle(String entity, String field, Long id) {
		StringBuilder query = new StringBuilder("select o.");
		query.append(field).append(" from ").append(entity).append(" o where o.id = :id");
		return String.valueOf(entityManager.createQuery(query.toString(), Object.class).setParameter("id", id).getSingleResult());
	}
	
	@Override
	public Double getAmount(String queryString) {
		StringBuilder query = new StringBuilder(queryString);
		String amount = String.valueOf(entityManager.createQuery(query.toString(), Object.class).getSingleResult());
		if(amount == "null")
			return (double) 0;
		else
			return Double.parseDouble(amount);
	}

	@Override
	public <T> T getObjectById(Class<T> clazz,Long id) {
		return entityManager.find(clazz, id);
	}

	@Override
	public Object save(Object entityObject) {
		entityManager.persist(entityObject);
		return entityObject;
	}

}
