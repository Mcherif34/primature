package ma.brainit.base;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import ma.brainit.aman.administration.actions.SearchParam;

/**
 * Couche DAO du paginator des vues (entité et dto)
 * 
 * @author iliassb
 * 
 * @param <VEntity>
 *            Les Ventity (dto et entité)
 * @param <PK>
 *            La classe de la clé primitive
 * 
 * @version 2.0.0
 */
public interface BasePaginatorDao<VEntity, PK> {
	/**
	 * Liste des VEntity à paginer
	 * 
	 * @param first
	 *            la position du premier enregistrement à demander selon l'ordre
	 *            de pagination
	 * @param max
	 *            la position du dernier élement relatif à la position du
	 *            premier
	 * @param critere
	 *            le critère de tri
	 * @param ordre
	 *            l'ordre du tri
	 * @param filtre
	 *            le filtre qui peux ne pas être null en cas de recherche
	 * @return La liste des entités satisfaisant les critères
	 */
	List<VEntity> getPage(int first, int max, String critere, String ordre,
			Map<String, Object> filtre);

	/**
	 * Compter le nombre total des VEntity
	 * 
	 * @return le nombre total des VEntity
	 */
	Long count();

	/**
	 * Compter le nombre total des VEntity correspondant au filtre de recherche
	 * fourni
	 * 
	 * @param filtre
	 *            Le filtre
	 * @return le nombre total des VEntity correspondant au filtre de recherche
	 *         fourni
	 */
	/**
	 * 
	 * ajoute un filtre au moment de la pagination 
	 * 
	 * @param type operation : eq ou dbw ou startWith ou like 
	 *            Le filtre
	 * @param le filtre a effectué
	 * @param la valeur 
	 *         fourni
	 */
     void filtrerPaginator(String typeOp, HashMap<String, Map<String, String>> filtre, String valeur);
	/**
	 * Pour injecter la classe de l'entité à paginer
	 * 
	 * @param entityClass
	 *            La classe de l'éntité à paginer
	 */
	void setEntityClass(Class<VEntity> entityClass);

	/**
	 * Méthode pour chercher une VEntity par son ID
	 * 
	 * @param id
	 *            l'id de la VEntity
	 * @return le résultat de recherche
	 */
	@Deprecated
	VEntity getById(PK id);

	List<VEntity> getPaginator(int page, int limit, String sort, String direction, List<SearchParam> searchParams, String conditionSupplementaire);
	
	List<VEntity> getInvoicePaginator(int page, int limit, String sort, String direction, List<SearchParam> searchParams, String conditionSupplementaire);

	Long count(List<SearchParam> searchParams, String conditionSupplementaire);
	
	Long invoiceCount(List<SearchParam> searchParams, String conditionSupplementaire);

	Double getSumFieldForList(String field, String sort, String direction, List<SearchParam> searchParams,
			String conditionSupplementaire);

}
