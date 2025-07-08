package ma.brainit.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import ma.brainit.aman.administration.model.SecUtilisateur;
import ma.brainit.aman.administration.service.SecUtilisateurService;

@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

	@Autowired
	private SecUtilisateurService secUtilisateurService;
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException authenticationException)
			throws IOException, ServletException {
		if (authenticationException instanceof BadCredentialsException) {
			response.sendRedirect("login/error");
		} else if (authenticationException instanceof CredentialsExpiredException) {
			SecUtilisateur secUtilisateur = secUtilisateurService.findByLogin(request.getParameter("username"));
			response.sendRedirect("changepassword/"+secUtilisateur.getToken());
		} else if (authenticationException instanceof DisabledException) {
			response.sendRedirect("login");
		} else if (authenticationException instanceof LockedException) {
			response.sendRedirect("login");
		}
	}

}
