package ma.brainit.base;

import java.util.List;

public interface BaseListDao{

	List<ListDTO> findAll(String entity, String field, String ordre);

	List<ListDTO> findAll(String entity, String field, String fieldOrdre, String ordre);

	List<ListDTO> findAll(String entite, String field, String filtreChamp, String filtreValeur, String fieldOrdre,
			String ordre);

	List<ListDTO> getReferentielValues(Long colonneId);

	List<ListDTO> getReferentielValues(String entite, String colonne);
	
	Double getAmount(String query);
	
	String getLibelle(String entity, String field, Long id);

	<T> T getObjectById(Class<T> clazz, Long id);

	Object save(Object entityObject);

	List<ListDTO> getReferentielValues(Long entite, String colonne);

}
