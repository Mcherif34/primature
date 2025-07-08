package ma.brainit.base.exceptions;


import java.rmi.ServerException;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import ma.brainit.base.utils.Util;

@ControllerAdvice
public class ExceptionHandlingController {

	static Logger logger = LoggerFactory.getLogger(ExceptionHandlingController.class);
	
//
	@ExceptionHandler(NoHandlerFoundException.class)
	public String handle(Exception ex) {
		logger.error(ex.getMessage());
		return "errors/404";//this is view name
	}
	
	@ExceptionHandler(value = { AccessDeniedException.class })
	public String notAutorised(Exception ex) {
		
		return "errors/404";//this is view name
	}
	

	@ExceptionHandler(ServerException.class)
	public String server(Exception ex) {
		logger.error(ex.getMessage());
		return "errors/500";
	}
//
	@ExceptionHandler(value = { RuntimeException.class })
	protected ResponseEntity<String> handleConflict(RuntimeException ex) {
		logger.error("Erreur :"+ex.getMessage()+ex.getLocalizedMessage());
		return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(value = { CustomGenericException.class })
	protected ResponseEntity<String> hundleCustom(CustomGenericException ex) {
		if(ex != null && StringUtils.isNotBlank( ex.getErrCode() )){
			 return ResponseEntity
			            .status(HttpStatus.BAD_REQUEST)
			            .body(Util.objectToJson(ex.getErrMsg()));
		}else{
			 return ResponseEntity
			            .status(HttpStatus.BAD_REQUEST)
			            .body(Util.objectToJson(ex.getErrMsg()));
		}
		
	}
	
	
	@ExceptionHandler(Exception.class)
	public String exception(Exception ex) {
		logger.error(ex.getMessage());
		return "errors/500";//this is view name
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public  ResponseEntity<String> validationException(MethodArgumentNotValidException ex) {
		 return ResponseEntity
		            .status(HttpStatus.NOT_ACCEPTABLE)
		            .body(Util.objectToJson("Veuillez remplir tous les champs obligatoires"));
	}
	

}