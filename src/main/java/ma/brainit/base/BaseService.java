package ma.brainit.base;

import java.util.List;

import org.springframework.ui.Model;

public interface BaseService<T,ID> {

	void initializeForm(Model model);

	public void saveOrUpdate(T entity);
	
	public List<T> getAll();
	
	public T get(T id);
	
	public void add(T entity);
	
	public void update(T entity);
	
	public void remove(T entity);

	Iterable<T> findAll();

	T save(T json);

	T findOne(ID id);

	void delete(ID id);
	
}
