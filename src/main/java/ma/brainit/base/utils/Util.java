package ma.brainit.base.utils;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;

import ma.brainit.aman.administration.actions.SearchParam;

public class Util {

	private static final String CHARS = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ234567890";
	public final static String OK = Util.toJson("SUCCESS");
	private static final String DATE_FORMAT = "dd/MM/yyyy";
	private static final String DATE_TIME_FORMAT = "dd/MM/yyyy HH:mm:ss";

	public static String toJson(Object data)
	{
		ObjectMapper mapper=new ObjectMapper();
		StringBuilder builder=new StringBuilder();
		try {
			builder.append(mapper.writeValueAsString(data));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return builder.toString();
	}

	public static String objectToJson(Object object) {
		final ObjectMapper mapper = new ObjectMapper();
		String out = "";
		try {
			out = mapper.writeValueAsString(object);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return out.toString();
	}

	public static <T> T fromJSON(final TypeReference<T> type,
			final String jsonPacket) {
		T data = null;

		try {
			data = new ObjectMapper().readValue(jsonPacket, type);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return data;
	}

	public static List<SearchParam> fromSearchParamsJSON(String jsonStrings) {
		ObjectMapper mapper = new ObjectMapper();
		TypeFactory typeFactory  = mapper.getTypeFactory();
		List<SearchParam> someClassList  = null;
		if(jsonStrings != null && jsonStrings.length() > 2 &&  StringUtils.isNotEmpty(StringUtils.deleteWhitespace(jsonStrings))){
			try {
				someClassList = mapper.readValue(jsonStrings, typeFactory.constructCollectionType(List.class, SearchParam.class));
			} catch (JsonParseException e) {
				e.printStackTrace();
			} catch (JsonMappingException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return someClassList;
	}

	public static String getToken(int length) {
		StringBuilder token = new StringBuilder(length);
		Random random = new Random();
		for (int i = 0; i < length; i++) {
			token.append(CHARS.charAt(random.nextInt(CHARS.length())));
		}
		return token.toString();
	}

	/**
	 * Generat an expiration date (using for token validation)
	 * @author eljemli
	 * @param daysDelay
	 * @return
	 * @throws ParseException
	 */
	public static Date getTokenExpiration(int daysDelay){
		Calendar c= null; 
		//		try { 
		////			c = DateUtil.getToday();
		//		} catch (ParseException e) {
		//			c = Calendar.getInstance();
		//			c.setTime(new Date());
		//		}
		c.add(Calendar.DATE, daysDelay);
		return c.getTime();
	}

	public static String encryptPassword(String username,String password){
		ShaPasswordEncoder shaPasswordEncoder = new ShaPasswordEncoder();
		return shaPasswordEncoder.encodePassword(password,new StringBuilder("AUDAKEY").append(username).toString());
	}

	public static String getCode(Integer integer, String constant) {
		NumberFormat nf = NumberFormat.getInstance();
		nf.setMinimumIntegerDigits(5);
		nf.setGroupingUsed(false);
		String numberAsString = nf.format(integer);
		String cle = constant;
		return cle +"-"+numberAsString;
	}



	public static String listToStringIn(List<Integer> list) {
		StringBuilder result = new StringBuilder("");
		for(Integer item:list){
			result.append(item).append(",");
		}
		result.setLength(result.length() - 1);
		return result.toString();
	}

	public static Integer getAnneeObtention(String v_annee){
		Integer annee = null;
		if(v_annee!=null && !StringUtils.isEmpty(v_annee) && v_annee.split("/").length >1  &&v_annee.split("/")[1]!=null  && !StringUtils.isEmpty(v_annee.split("/")[1])){
			annee = Integer.valueOf(v_annee.split("/")[1]);
		}
		return annee;
	}


	public static String capitalize(final String line) {
		return Character.toUpperCase(line.charAt(0)) + line.substring(1);
	}

	public static String getStringDate(Date date) {
		if (new SimpleDateFormat("HH:mm:ss").format(date).equals("00:00:00")) {
			return getStringDate(date, DATE_FORMAT);
		}else {
			return getStringDateTime(date);
		}
			
	}
	
	public static String getStringDateTime(Date date) {
		return getStringDate(date, DATE_TIME_FORMAT);
	}


	public static String getStringDate(Date date, String formatDate) {
		String stringDate = null;
		if (date != null) {
			SimpleDateFormat format = new SimpleDateFormat(formatDate);
			stringDate = format.format(date);
		}
		return stringDate;
	}

	public static BigDecimal getBigDecimal(Object value) {
		BigDecimal ret = null;
		if (value != null) {
			if (value instanceof BigDecimal) {
				ret = (BigDecimal) value;
			} else if (value instanceof String) {
				ret = new BigDecimal((String) value);
			} else if (value instanceof BigInteger) {
				ret = new BigDecimal((BigInteger) value);
			} else if (value instanceof Number) {
				ret = new BigDecimal(((Number) value).doubleValue());
			} else if (value instanceof Boolean) {
				ret = new BigDecimal(value.equals(true) ? 1 : 0);
			} else {
				throw new ClassCastException("Not possible to coerce [" + value + "] from class " + value.getClass()
						+ " into a BigDecimal.");
			}
		}
		return ret;
	}
}