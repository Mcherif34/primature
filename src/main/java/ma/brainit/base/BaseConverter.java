package ma.brainit.base;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang3.StringUtils;

import ma.brainit.aman.administration.actions.SearchParam;
import ma.brainit.base.annotations.View;
import ma.brainit.base.utils.DateUtil;
import ma.brainit.base.utils.Util;

//TODO utiliser le design pattern template
public abstract class BaseConverter<Entity, DTO> {

	private Class<Entity> typeArgumentClass;
	private Map<String,String> fieldsMatching;//Fields Mathcing <entity,dto>

	/**
	 * La méthode à implémenter pour convertir une seule entité à son équivalent
	 * DTO
	 * 
	 * @param entity
	 *            l'entité d'éntrée
	 * @return Le DTO converti.
	 */
	public abstract DTO convertFromDataBean(Entity entity);

	/**
	 * Méthode pour convertir une liste d'entité à une liste de DTO
	 * 
	 * @param databeanList
	 *            La liste d'entité
	 * @return La liste des DTOs
	 */
	public List<DTO> convertFromDataBeanList(List<Entity> databeanList) {
		List<DTO> dtoList = new ArrayList<DTO>();
		for (Entity e : databeanList) {
			dtoList.add(convertEntityToDTO(e));
		}
		return dtoList;
	}

	/**
	 * Méthode à implementer pour convertir du DTO vers l'entité
	 * 
	 * @param dto
	 *            Le dto à convertir
	 * @return L'entité équivalente
	 */
	public abstract Entity convertFromDTO(DTO dto);

	/**
	 * Méthode pour convertir une liste de DTO à la liste d'entité équivalent
	 * 
	 * @param dtos
	 *            la liste des dtos
	 * @return la liste des entités
	 */
	public List<Entity> convertFromDtoList(List<DTO> dtos) {
		List<Entity> entities = new ArrayList<Entity>();
		for (DTO dto : dtos) {
			entities.add(convertFromDTO(dto));
		}
		return entities;
	}

	//	public List<Entity> convertFromDtoList(List<DTO> dtos) {
	//		List<Entity> entities = new ArrayList<Entity>();
	//		for (DTO dto : dtos) {
	//			try {
	//				ParameterizedType superClass = (ParameterizedType) getClass().getGenericSuperclass();
	//				Class<Entity> type = (Class<Entity>) superClass.getActualTypeArguments()[0];
	//				Entity entitie = type.newInstance();
	//				PropertyUtils.setProperty(entitie,"id",PropertyUtils.getProperty(dto,"id"));
	//				entities.add(entitie);
	//			} catch (IllegalAccessException e) {
	//				e.printStackTrace();
	//			} catch (InstantiationException e) {
	//				// TODO Auto-generated catch block
	//				e.printStackTrace();
	//			} catch (InvocationTargetException e) {
	//				// TODO Auto-generated catch block
	//				e.printStackTrace();
	//			} catch (NoSuchMethodException e) {
	//				// TODO Auto-generated catch block
	//				e.printStackTrace();
	//			}
	//		}
	//		return entities;
	//	}

	public void loadFieldsMatching() {
		fieldsMatching = new HashMap<String,String>();
		DTO dto = null;
		Entity entity = null;
		ParameterizedType superClass = (ParameterizedType) getClass().getGenericSuperclass();
		Class<DTO> type = (Class<DTO>) superClass.getActualTypeArguments()[1];
		Class<Entity> entityType = (Class<Entity>) superClass.getActualTypeArguments()[0];
		try {
			dto = type.newInstance();
			entity = entityType.newInstance();
			for (Method getter : dto.getClass().getDeclaredMethods()) {
				String fieldName = getFieldIfGetterMethod(getter);
				if(StringUtils.isNotEmpty(fieldName) &&  getter.getAnnotation(View.class) != null){
					String annotEntity = getter.getAnnotation(View.class).entity() != null ? getter.getAnnotation(View.class).entity() : "";//Get Entity name
					String annotAttribut = getter.getAnnotation(View.class).attribut();
					if(StringUtils.isNotEmpty(annotEntity) && annotEntity.length()>3){
						fieldsMatching.put(annotEntity+"."+annotAttribut, fieldName);
					}else{
						fieldsMatching.put(annotAttribut, fieldName);
					}
				}
			}
		} catch (InstantiationException e) {
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		}
	}

	public void stParams(List<SearchParam> searchParams) {
		if(searchParams != null && searchParams.size() > 0){ 
			for (SearchParam param : searchParams) {
				String name = param.getName();
				String value = param.getValue();
				if(name.endsWith("St")){
					param.setName(name.substring(0, name.length() - 2));
					if(StringUtils.equalsIgnoreCase(value, "oui")){
						param.setValue("true");
					}
					else if(StringUtils.equalsIgnoreCase(value, "non")){
						param.setValue("false");
					}
				}
			}
		}
	}
	
	@SuppressWarnings("unchecked")
	public String convertSortParamToEntity(String sortParam){
		if(fieldsMatching==null || (fieldsMatching != null && fieldsMatching.size()==0)){
			loadFieldsMatching();
		}
		String param = null;
		if(sortParam !=null && StringUtils.isNotEmpty(sortParam) ){
			param = getKeysByValue(fieldsMatching,sortParam);
		}
		return param;
	}
	
	@SuppressWarnings("unchecked")
	public List<SearchParam> convertSearchParamToEntity(String searchParam){
		List<SearchParam> params = Util.fromSearchParamsJSON(searchParam);
		stParams(params);
		ParameterizedType superClass = (ParameterizedType) getClass().getGenericSuperclass();
		Class<DTO> classDTO = (Class<DTO>) superClass.getActualTypeArguments()[1];
		if(fieldsMatching==null || (fieldsMatching != null && fieldsMatching.size()==0)){
			loadFieldsMatching();
		}
		if(params != null && params.size()>0){
			for(SearchParam param:params){
				if(param.getValue() !=null && StringUtils.isNotEmpty(param.getValue()) ){
					String entry = getKeysByValue(fieldsMatching,param.getName());
					String value = param.getValue();
					Method method = null;
					try{
						method = classDTO.getMethod("get"+StringUtils.capitalize(param.getName()));
					} catch (NoSuchMethodException e) {
						e.printStackTrace();
					}
					Class<?> types = method != null ? method.getReturnType() : null;
					String operateur = types != null ? getTypeFromClassName(types.getName()) : "String";
					param.setValue(value);
					param.setOper(operateur);
					param.setName(entry != null ? entry.toString() : param.getName()); // Cas Entite et Cas View
				}
			}
		}
		return params;
	}

	public static String getTypeFromClassName(String className){
		String type = "String";
		if(StringUtils.contains(className, "BigDecimal")){
			type = "BigDecimal";
		}else if(StringUtils.contains(className, "Decimal") || StringUtils.contains(className, "Long")){
			type = "Decimal";
		}else if(StringUtils.contains(className, "Date")){
			type = "Date";
		}else if(StringUtils.contains(className, "Boolean")){
			type = "Boolean";
		}
		return type;
	}

	public static <T, E> T getKeysByValue(Map<T, E> map, E value) {
		return map.entrySet()
				.stream()
				.filter(entry -> Objects.equals(entry.getValue(), value))
				.map(Map.Entry::getKey).findFirst()
				.orElse(null);

	}
	/**
	 * Liste contenant le mapping entre les champs du dto et leur équivalent
	 * dans les champs des entités
	 */
	protected final Map<String, String> DTO_TO_MODEL_MAP = new HashMap<String, String>();

	@SuppressWarnings("unchecked")
	protected DTO convertEntityToDTO(Entity entity){
		if (entity == null) {
			return null;
		}
		DTO dto = null;
		ParameterizedType superClass = (ParameterizedType) getClass().getGenericSuperclass();
		Class<DTO> type = (Class<DTO>) superClass.getActualTypeArguments()[1];
		try {
			dto = type.newInstance();
			for (Method getter : dto.getClass().getDeclaredMethods()) {
				String fieldName = getFieldIfGetterMethod(getter);
				if(StringUtils.isNotEmpty(fieldName) &&  getter.getAnnotation(View.class) != null){
					String annotEntity = getter.getAnnotation(View.class).entity() != null ? getter.getAnnotation(View.class).entity() : "";//Get Entity name
					String annotAttribut = getter.getAnnotation(View.class).attribut();//Get Attribut name
					String annotType= getter.getAnnotation(View.class).type(); //Get Attribut Type
					if(StringUtils.isBlank(annotEntity) && StringUtils.isNotEmpty(annotAttribut)){
						Object getValue = PropertyUtils.getProperty(entity,annotAttribut);
						if(getValue != null && StringUtils.isNotEmpty(annotType) && StringUtils.equalsIgnoreCase(annotType,"date") ){
							String typeField = getter.getReturnType().getSimpleName();
							if(StringUtils.equalsIgnoreCase(typeField, "String")){
								getValue = DateUtil.convertDateToString((Date) getValue);
							}
						}
						if(getValue != null && StringUtils.isNotEmpty(annotType) && StringUtils.equalsIgnoreCase(annotType,"time")){
							getValue = DateUtil.getheure((Date) getValue);
						}
						PropertyUtils.setProperty(dto,fieldName,getValue);
					}else if(checkFieldExist(entity.getClass(), annotEntity)){
						Object fk = PropertyUtils.getProperty(entity, annotEntity);
						if(fk != null){
							PropertyUtils.setProperty(dto,fieldName,PropertyUtils.getProperty(fk,annotAttribut));
						}
					}

				}
			}
		} catch (InstantiationException e) {
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		}
		return dto;
	}


	protected DTO convertEntityToDTO(DTO dto, Entity entity) {
		if (entity == null) {
			return null;
		}
		try {
			for (Field field : dto.getClass().getDeclaredFields()) {
				if(field.getAnnotation(View.class)!=null){
					String annotEntity = field.getAnnotation(View.class).entity();//Get Entity name
					String annotAttribut = field.getAnnotation(View.class).attribut();//Get Attribut name
					String annotType= field.getAnnotation(View.class).type(); //Get Attribut Type
					if(StringUtils.isBlank(annotEntity) && StringUtils.isNotEmpty(annotAttribut)){
						Object getValue = PropertyUtils.getProperty(entity,annotAttribut);
						if(getValue != null && StringUtils.isNotEmpty(annotType) && StringUtils.equalsIgnoreCase(annotType,"date")){
							getValue = DateUtil.convertDateToString((Date) getValue);
						}
						if(getValue != null && StringUtils.isNotEmpty(annotType) && StringUtils.equalsIgnoreCase(annotType,"time")){
							getValue =DateUtil.getheure((Date) getValue);
						}
						PropertyUtils.setProperty(dto,field.getName(),getValue);
					}else{
						Object fk = PropertyUtils.getProperty(entity, annotEntity);
						if(fk != null){
							PropertyUtils.setProperty(dto,field.getName(),PropertyUtils.getProperty(fk,annotAttribut));
						}
					}
				}
			}
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		}
		return dto;
	}


	protected Entity convertDTOToEntity(DTO dto, Entity entity) {
		try {
			for (Method getter : dto.getClass().getDeclaredMethods()) {
				String fieldName = getFieldIfGetterMethod(getter);
				if(StringUtils.isNotEmpty(fieldName) &&  getter.getAnnotation(View.class) != null){
					String annotEntity = getter.getAnnotation(View.class).entity();//Get Entity name
					String annotAttribut = getter.getAnnotation(View.class).attribut();//Get Attribut name
					String annotType= getter.getAnnotation(View.class).type(); //Get Attribut Type
					String annotClass= getter.getAnnotation(View.class).className(); //Get Attribut Type
					if(StringUtils.isBlank(annotEntity) && StringUtils.isNotEmpty(annotAttribut)){
						Object getValue = PropertyUtils.getProperty(dto,annotAttribut);
						if(getValue != null && StringUtils.isNotEmpty(annotType) && StringUtils.equalsIgnoreCase(annotType,"date")){
							getValue = getValue;
							//							getValue = DateUtil.convertStringToDate((String) getValue);
						}
						if(getValue != null && StringUtils.isNotEmpty(annotType) && StringUtils.equalsIgnoreCase(annotType,"time")){
							getValue = DateUtil.convertHourToDate((String) getValue);
						}
						if(getValue != null){
							try {
								Field champ = entity.getClass().getDeclaredField(fieldName);
								if(champ != null){
									PropertyUtils.setProperty(entity,fieldName,getValue);
								}
							} catch (NoSuchFieldException e) {
							}

						}
					}else if(StringUtils.isNotBlank(annotEntity) && StringUtils.equalsIgnoreCase(annotAttribut, "id")){

						Field entityField = null;
						try {
							entityField = entity.getClass().getDeclaredField(annotEntity);
						} catch (NoSuchFieldException e) {
							entityField = entity.getClass().getSuperclass().getDeclaredField(annotEntity);
						}

						Object fk  = Class.forName(entityField.getType().getName()).newInstance();
						if(fk != null && PropertyUtils.getProperty(dto,fieldName) != null){
							PropertyUtils.setProperty(fk,annotAttribut,PropertyUtils.getProperty(dto,fieldName));
						}
						if(fk != null && PropertyUtils.getProperty(dto,fieldName) != null){
							PropertyUtils.setProperty(entity,annotEntity,fk);
						}
					}
				}
			}
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchFieldException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return entity;
	}

	/**
	 * La méthode générique qui se base sur le mapping pour alimenter les champs
	 * du DTO à partir des champs de l'entité
	 * 
	 * @param entity
	 *            l'entité qui sert de base
	 * @param dto
	 *            Le dto à produire
	 */
	protected void mapDataBeanToDTO(Entity entity, DTO dto) {
		for (String dtoField : DTO_TO_MODEL_MAP.keySet()) {
			try {
				PropertyUtils.setProperty(
						dto,
						dtoField,
						PropertyUtils.getProperty(entity,
								DTO_TO_MODEL_MAP.get(dtoField)));
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}


	protected void entityBeanToVo(Entity entity, DTO dto) {
		for (String dtoField : DTO_TO_MODEL_MAP.keySet()) {
			try {
				PropertyUtils.setProperty(dto,dtoField,
						PropertyUtils.getProperty(entity,
								DTO_TO_MODEL_MAP.get(dtoField)));
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	// TODO revoir cette méthode
	/**
	 * La méthode pour initialiser l'association entre les champs du DTO et les
	 * champs de l'entité, cette relation se base sur le fait qu'un champs porte
	 * le même nom dans les deux entités (ce qui peux en découler de la relation
	 * d'héritage), dans le cas d'objet (non primitives), les champs
	 * correspondant doivent être convertis selon le besoin spécifique de chaque
	 * converter dans les méthodes de conversion abstraites
	 * 
	 * @param dtoClass
	 *            La classe du DTO
	 * @param dtosToRemove
	 *            Les champs du DTO à ne pas mapper
	 */
	protected void initConverter(Class<DTO> dtoClass, String[] dtosToRemove) {
		Method[] methodes = dtoClass.getDeclaredMethods();
		for (Method methode : methodes) {
			String field = getFieldIfGetterMethod(methode);
			if (field != null) {
				DTO_TO_MODEL_MAP.put(field, field);
			}
		}
		for (String dtoToRemove : dtosToRemove) {
			DTO_TO_MODEL_MAP.remove(dtoToRemove);
		}
	}

	/**
	 * Même fonctionnement que la méthode initConverter de la même classe, mais
	 * sans suppression
	 * 
	 * @param dtoClass
	 *            la classe du DTO
	 */
	protected void initConverter(Class<DTO> dtoClass) {
		Method[] methodes = dtoClass.getDeclaredMethods();
		for (Method methode : methodes) {
			String field = getFieldIfGetterMethod(methode);
			if (field != null) {
				DTO_TO_MODEL_MAP.put(field, field);
			}
		}
	}

	/**
	 * Méthode permettant d'intialiser la Map du converter en se basant sur les
	 * attributs et non sur les getters
	 * 
	 * @param dtoClass
	 *            La classe du DTO
	 */
	protected void initConverterByField(Class<DTO> dtoClass) {
		Field[] fields = dtoClass.getFields();
		for (Field field : fields) {
			DTO_TO_MODEL_MAP.put(field.getName(), field.getName());
		}
	}

	private String getFieldIfGetterMethod(Method method) {
		String field = null;
		if (method.getName().startsWith("get")
				&& method.getParameterTypes().length == 0
				&& !void.class.equals(method.getReturnType())) {
			field = StringUtils.uncapitalize(method.getName().substring(3));
		} else if (method.getName().startsWith("is")
				&& method.getParameterTypes().length == 0
				&& !void.class.equals(method.getReturnType())) {
			field = StringUtils.uncapitalize(method.getName().substring(2));
		}
		return field;
	}

	private static Boolean checkFieldExist(final Class<?> type,String propertyName) {
		Boolean contains = false;
		Set<String> fields = new HashSet<String>();
		//loop the fields using Java Reflections
		for (Field field : type.getDeclaredFields()) {
			fields.add(field.getName());
		}

		if (fields.contains(propertyName)) {
			contains = true;
		}
		return contains;
	}


}
