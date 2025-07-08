package ma.brainit.aman.commun.dto;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.TimeZone;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import ma.brainit.base.utils.FlexibleDateParser;

@Component
public class JsonDateDeserializer extends JsonDeserializer<Date>{

	@Override
	public Date deserialize(JsonParser jsonParser, DeserializationContext ctxt) throws IOException, JsonProcessingException {
		Date result = null;
		FlexibleDateParser format = new FlexibleDateParser(Arrays.asList(new String[] {"dd/MM/yyyy","yyyy-MM-dd'T'HH:mm:ss.SSS'Z'","yyyy-MM-dd'T'HH:mm:ssX" }) ,TimeZone.getTimeZone("Africa/Casablanca"));
		String date = jsonParser.getText();
		result =  format.parseDate(date);
		return result;
	}

}