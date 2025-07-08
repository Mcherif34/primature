package ma.brainit.base.utils;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

public class FlexibleDateParser {
	private List<ThreadLocal<SimpleDateFormat>> threadLocals = new  ArrayList<ThreadLocal<SimpleDateFormat>>();

	public FlexibleDateParser(List<String> formats, final TimeZone tz){
		threadLocals.clear();
		for (final String format : formats) {
			ThreadLocal<SimpleDateFormat> dateFormatTL = new ThreadLocal<SimpleDateFormat>() {
				protected SimpleDateFormat initialValue() {
					SimpleDateFormat sdf = new SimpleDateFormat(format);
					sdf.setTimeZone(tz); 
					sdf.setLenient(false);
					return sdf;
				}
			};
			threadLocals.add(dateFormatTL);
		}       
	}

	public Date parseDate(String dateStr) {
		Date result = null;
		fetch :for (ThreadLocal<SimpleDateFormat> tl : threadLocals) {
				SimpleDateFormat sdf = tl.get();
				try {
					result = sdf.parse(dateStr);
				} catch (java.text.ParseException e) {

				}
				if(result != null) break fetch;
		}
		return result;
	}       
}
