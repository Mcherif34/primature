package ma.brainit.aman.administration.service;

import java.io.IOException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import ma.brainit.base.utils.Util;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import ma.brainit.aman.administration.model.SecUtilisateur;

@Component("customAuthenticationProvider")
public class CustomAuthenticationProvider implements AuthenticationProvider {

	@Autowired
	private SecUtilisateurService secUtilisateurService;
	
	@Value("${opentext.otdsUrl}")
	private String opentextOtdsUrl;

	@Override
	public Authentication authenticate(final Authentication authentication) throws AuthenticationException {
		SecUtilisateur utilisateur = new SecUtilisateur();
		utilisateur.setLogin(authentication.getName());
		utilisateur.setPassword(authentication.getCredentials().toString());
		SecUtilisateur user = secUtilisateurService.findUserByLogin(utilisateur.getLogin());
		if (user != null) {
			String password = Util.encryptPassword(utilisateur.getLogin(), utilisateur.getPassword());
			if (user.getPassword().equalsIgnoreCase(password) && user.getActif()) {
				if (StringUtils.isBlank(user.getToken())) {
					secUtilisateurService.setLastConnection(user);
					return new UsernamePasswordAuthenticationToken(user, authentication, user.getAuthorities());
				} else {
					throw new CredentialsExpiredException("");
				}
			} else {
				String message = "Incorrect credentials.";
				throw new BadCredentialsException("Unable to sign in. " + message);
			}
		} else {
			String message = "Incorrect username.error";
			throw new BadCredentialsException("Unable to sign in. " + message);
		}
	}
	
	/*@Override
	public Authentication authenticate(final Authentication authentication) throws AuthenticationException {
		SecUtilisateur utilisateur = new SecUtilisateur();
		utilisateur.setLogin(authentication.getName());
		utilisateur.setPassword(authentication.getCredentials().toString());
		SecUtilisateur user = secUtilisateurService.findUserByLogin(utilisateur.getLogin());
		if (user != null) {
			OkHttpClient client = new OkHttpClient().newBuilder().build();
			MediaType mediaType = MediaType.parse("application/json");
			RequestBody body = RequestBody.create(mediaType, "{\"user_name\":\""+utilisateur.getLogin()+"\",\"password\":\""+utilisateur.getPassword()+"\"}");
			Request request = new Request.Builder()
				.url(opentextOtdsUrl+"/ot-authws/v1/authentication/credentials")
				.method("POST", body)
				.addHeader("Content-Type", "application/json")
				.build();
			try {
				Response response = client.newCall(request).execute();
				if(response.code() == 200) {
					secUtilisateurService.setLastConnection(user);
					return new UsernamePasswordAuthenticationToken(user, authentication, user.getAuthorities());
				}  else {
					String message = "Incorrect credentials.";
					throw new BadCredentialsException("Unable to sign in. " + message);
				}
			} catch (IOException e) {
				e.printStackTrace();
				String message = "Incorrect credentials.";
				throw new BadCredentialsException("Unable to sign in. " + message);
			}
		} else {
			String message = "Incorrect username.error";
			throw new BadCredentialsException("Unable to sign in. " + message);
		}
	}*/

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

	public static String sha1(String password) {
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-1");
			byte[] hash = md.digest(password.getBytes());
			BigInteger bi = new BigInteger(1, hash);
			return String.format("%0" + (hash.length << 1) + "x", bi);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return null;
	}
}