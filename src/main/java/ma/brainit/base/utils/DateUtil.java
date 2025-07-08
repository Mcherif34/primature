package ma.brainit.base.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.Interval;
import org.joda.time.LocalDate;
import org.joda.time.Period;
import org.joda.time.Years;
import org.springframework.context.i18n.LocaleContextHolder;

/**
 * Date Utility Class used to convert Strings to Dates and Timestamps
 *
 * @author <a href="mailto:matt@raibledesigns.com">Matt Raible</a>
 *         Modified by <a href="mailto:dan@getrolling.com">Dan Kibler </a>
 *         to correct time pattern. Minutes should be mm not MM (MM is month).
 */
public final class DateUtil {
	
	public static final String BUNDLE_KEY = "ApplicationResources";
	
    private static Log log = LogFactory.getLog(DateUtil.class);
    private static final String TIME_PATTERN = "HH:mm";
    public static final String DATE_TIME_PATTERN = "dd/MM/yyyy - HH:mm";
    private static final String HOUR_PATTERN = "HH:mm";

    /**
     * Checkstyle rule: utility classes should not have public constructor
     */
    private DateUtil() {
    }

    /**
     * Return default datePattern (MM/dd/yyyy)
     *
     * @return a string representing the date pattern on the UI
     */
    public static String getDatePattern() {
        Locale locale = LocaleContextHolder.getLocale();
        String defaultDatePattern;
        try {
            defaultDatePattern = ResourceBundle.getBundle(BUNDLE_KEY, locale)
                    .getString("date.format");
        } catch (MissingResourceException mse) {
            defaultDatePattern = "dd/MM/yyyy";
        }

        return defaultDatePattern;
    }
    
    public static String getHeurePattern() {
        Locale locale = LocaleContextHolder.getLocale();
        String defaultDatePattern;
        try {
            defaultDatePattern = ResourceBundle.getBundle(BUNDLE_KEY, locale)
                    .getString("date.format");
        } catch (MissingResourceException mse) {
            defaultDatePattern = "HH'H'mm";
        }

        return defaultDatePattern;
    }
    
    
    
    public static String getDateTimePattern() {
        return DateUtil.getDatePattern() + " HH:mm:ss.S";
    }

    /**
     * This method attempts to convert an Oracle-formatted date
     * in the form dd-MMM-yyyy to mm/dd/yyyy.
     *
     * @param aDate date from database as a string
     * @return formatted string for the ui
     */
    public static String getDate(Date aDate) {
        SimpleDateFormat df;
        String returnValue = "";

        if (aDate != null) {
            df = new SimpleDateFormat(getDatePattern());
            returnValue = df.format(aDate);
        }
        return (returnValue);
    }
    
    public static String getDate(String pattern,Date aDate) {
        SimpleDateFormat df;
        String returnValue = "";

        if (aDate != null) {
            df = new SimpleDateFormat(pattern);
            returnValue = df.format(aDate);
        }
        return (returnValue);
    }
    
    
    public static String getheure(Date aDate) {
        SimpleDateFormat df;
        String returnValue = "";
        if (aDate != null) {
            df = new SimpleDateFormat(getHeurePattern());
            returnValue = df.format(aDate);
        }
        return (returnValue);
    }
    
    
    public static String calculDuree(Date aDate1,Date aDate2) {
    	 SimpleDateFormat df = new SimpleDateFormat(getHeurePattern());
    	Interval interval =
                new Interval(aDate1.getTime(), aDate2.getTime());
 	  Period period = interval.toPeriod();
 	  StringBuilder returnValue = new StringBuilder("").append(period.getHours()).append(":").append(period.getMinutes());
 	String result = "";
 	 SimpleDateFormat dateParser = new SimpleDateFormat("HH:mm");
 	try {
		Date date = dateParser.parse(returnValue.toString());
		 result = df.format(date);
	} catch (ParseException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
        return (result);
    }
    
    
    /**
     * This method generates a string representation of a date/time
     * in the format you specify on input
     *
     * @param aMask the date pattern the string is in
     * @param strDate a string representation of a date
     * @return a converted Date object
     * @throws ParseException when String doesn't match the expected format
     * @see java.text.SimpleDateFormat
     */
    
    public static Date convertStringToDate(String aMask, String strDate)
            throws ParseException {
        SimpleDateFormat df;
        Date date;
        df = new SimpleDateFormat(aMask);

        if (log.isDebugEnabled()) {
            log.debug("converting '" + strDate + "' to date with mask '" + aMask + "'");
        }

        try {
            date = df.parse(strDate);
        } catch (ParseException pe) {
            //log.error("ParseException: " + pe);
            throw new ParseException(pe.getMessage(), pe.getErrorOffset());
        }

        return (date);
    }

    public static Date concateDayWithTime(Date date1, String time)
            throws ParseException {
        Calendar aDate = Calendar.getInstance();
        aDate.setTime(date1);

        Calendar aTime = Calendar.getInstance();
        Date date2 =  convertStringToDate(HOUR_PATTERN,time);
        aTime.setTime(date2);

        Calendar aDateTime = Calendar.getInstance();
        aDateTime.set(Calendar.DAY_OF_MONTH, aDate.get(Calendar.DAY_OF_MONTH));
        aDateTime.set(Calendar.MONTH, aDate.get(Calendar.MONTH));
        aDateTime.set(Calendar.YEAR, aDate.get(Calendar.YEAR));
        aDateTime.set(Calendar.HOUR_OF_DAY, aTime.get(Calendar.HOUR_OF_DAY));
        aDateTime.set(Calendar.MINUTE, aTime.get(Calendar.MINUTE));

        return aDateTime.getTime();
    }
    
    public static Date convertHourToDate(String strDate)
            throws ParseException {
       return convertStringToDate(getHeurePattern(),strDate);
    }

    
    
    /**
     * This method generates a string representation of a date/time
     * in the format you specify on input
     *
     * @param aMask the date pattern the string is in
     * @param strDate a string representation of a date
     * @return a converted Date object
     * @throws ParseException when String doesn't match the expected format
     * @see java.text.SimpleDateFormat
     */
    
    
    /**
     * This method returns the current date time in the format:
     * MM/dd/yyyy HH:MM a
     *
     * @param theTime the current time
     * @return the current date/time
     */
    public static String getTimeNow(Date theTime) {
        return getDateTime(TIME_PATTERN, theTime);
    }
    
    
    public static Date addDays(Date currentDate,Integer nombre) {
           // convert date to calendar
           Calendar c = Calendar.getInstance();
           c.setTime(currentDate);

           c.add(Calendar.DAY_OF_MONTH, 1); //same with c.add(Calendar.DAY_OF_MONTH, 1);

           // convert calendar to date
           Date currentDatePlusOne = c.getTime();
    	return currentDatePlusOne;
    }

    /**
     * This method returns the current date in the format: MM/dd/yyyy
     *
     * @return the current date
     * @throws ParseException when String doesn't match the expected format
     */
    public static Calendar getToday() throws ParseException {
        Date today = new Date();
        SimpleDateFormat df = new SimpleDateFormat(getDatePattern());

        // This seems like quite a hack (date -> string -> date),
        // but it works ;-)
        String todayAsString = df.format(today);
        Calendar cal = new GregorianCalendar();
        cal.setTime(convertStringToDate(todayAsString));

        return cal;
    }

    /**
     * This method generates a string representation of a date's date/time
     * in the format you specify on input
     *
     * @param aMask the date pattern the string is in
     * @param aDate a date object
     * @return a formatted string representation of the date
     * @see java.text.SimpleDateFormat
     */
    public static String getDateTime(String aMask, Date aDate) {
        SimpleDateFormat df = null;
        String returnValue = "";

        if (aDate == null) {
            log.warn("aDate is null!");
        } else {
            df = new SimpleDateFormat(aMask);
            returnValue = df.format(aDate);
        }

        return (returnValue);
    }

    /**
     * This method generates a string representation of a date based
     * on the System Property 'dateFormat'
     * in the format you specify on input
     *
     * @param aDate A date to convert
     * @return a string representation of the date
     */
    public static String convertDateToString(Date aDate) {
        return getDateTime(getDatePattern(), aDate);
    }

    public static String convertDateToString(String pattern, Date aDate) {
        return getDateTime(pattern, aDate);
    }

    
    public static String convertDateToHeureString(Date aDate) {
        return getDateTime(getDatePattern(), aDate);
    }
    
    public static String convertDateToDateHeureString(Date aDate) {
    	return getDateTime( DateUtil.getDatePattern() + " HH:mm", aDate);
    }
    
    /**
     * This method converts a String to a date using the datePattern
     *
     * @param strDate the date to convert (in format MM/dd/yyyy)
     * @return a date object
     * @throws ParseException when String doesn't match the expected format
     */
    public static Date convertStringToDate(final String strDate) throws ParseException {
        return convertStringToDate(getDatePattern(), strDate);
    }
    
    public static int getDiffYears(Date date1, Date date2) {
    	DateTime dt1 = new DateTime(date1);
		DateTime dt2 = new DateTime(date2);
		Years annee = Years.yearsBetween(dt1,dt2);
        return annee.getYears();
    }
    
    
    public static int getAge(Date date1) {
    	DateTime dt1 = new DateTime(date1);
		DateTime dt2 = new DateTime(new Date());
		Years annee = Years.yearsBetween(dt1,dt2);
        return annee.getYears();
    }
    
    public static int getMois(Date date) {
    	Calendar cal = Calendar.getInstance();
    	cal.setTime(date);
    	int month = cal.get(Calendar.MONTH);
    	return (month+1);
    }
    
    public static int getAnnee(Date date1) {
    	Calendar cal = Calendar.getInstance();
    	cal.setTime(date1);
    	int year = cal.get(Calendar.YEAR);
    	return (year);
    }
    
    public static int calculDaysBetweens(Date date1,Date date2) {
    	int days = Days.daysBetween(new LocalDate(date1), new LocalDate(date2)).getDays();
    	return (days);
    }
    
    public static int getAgeEligibilite(Date date1) {
    	Calendar cal = Calendar.getInstance();
		cal.set(Calendar.MONTH, 11); // 11 = december
		cal.set(Calendar.DAY_OF_MONTH, 31); // new years eve
		Date date2 = cal.getTime();
    	DateTime dt1 = new DateTime(date1);
		DateTime dt2 = new DateTime(date2);
		Years annee = Years.yearsBetween(dt1,dt2);
        return annee.getYears();
    }
    
    public static Date getDateByMonthYear(Integer month,Integer year) {
    	Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, year); 
		cal.set(Calendar.MONTH, (month-1)); // 11 = december
		cal.set(Calendar.DAY_OF_MONTH, 1); // new years eve
		Date date = cal.getTime();
        return date;
    }
}
