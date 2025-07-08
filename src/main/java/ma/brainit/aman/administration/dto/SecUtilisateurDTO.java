package ma.brainit.aman.administration.dto;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import ma.brainit.base.annotations.View;
import ma.brainit.aman.administration.model.SecUtilisateur;
import ma.brainit.aman.commun.dto.JsonDateDeserializer;
import ma.brainit.aman.commun.dto.JsonDateSerializer;

public class SecUtilisateurDTO extends SecUtilisateur {

	private static final long serialVersionUID = 1L;

	private String nvPassword;
	private String nvPasswordConfirmation;
	private List<SecProfileDTO> secProfileDTOs;
	private List<SecUtilisateurAuthoriteDTO> secUtilisateurAuthoriteDTOs;
	private List<Long> idSecProfiles;
	private Long secProfileId;
	private String secProfileCode;
	private String secProfileIntitule;
	private String phone;
	
	@Override
	@View(attribut = "id")
	public Long getId() {
		return super.getId();
	}

	@Override
	@View(attribut = "login")
	public String getLogin() {
		return super.getLogin();
	}

	@Override
	@View(attribut = "nom")
	public String getNom() {
		return super.getNom();
	}

	@Override
	@View(attribut = "prenom")
	public String getPrenom() {
		return super.getPrenom();
	}
	
	@Override
	@View(attribut = "fonction")
	public String getFonction() {
		return super.getFonction();
	}

	@Override
	@View(attribut = "password")
	public String getPassword() {
		return super.getPassword();
	}

	@Override
	@View(attribut = "email")
	public String getEmail() {
		return super.getEmail();
	}
	
	@Override
	@View(attribut = "token")
	public String getToken() {
		return super.getToken();
	}

	@Override
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "lastConnection")
	public Date getLastConnection() {
		return super.getLastConnection();
	}
	
	@Override
	@View(attribut = "actif")
	public Boolean getActif() {
		return super.getActif();
	}
	
	@Override
	@View(attribut = "module")
	public String getModule() {
		return super.getModule();
	}

	public String getNvPassword() {
		return nvPassword;
	}

	public void setNvPassword(String nvPassword) {
		this.nvPassword = nvPassword;
	}
	
	public String getNvPasswordConfirmation() {
		return nvPasswordConfirmation;
	}

	public void setNvPasswordConfirmation(String nvPasswordConfirmation) {
		this.nvPasswordConfirmation = nvPasswordConfirmation;
	}

	public List<SecProfileDTO> getSecProfileDTOs() {
		return secProfileDTOs;
	}

	public void setSecProfileDTOs(List<SecProfileDTO> secProfileDTOs) {
		this.secProfileDTOs = secProfileDTOs;
	}
	
	public List<SecUtilisateurAuthoriteDTO> getSecUtilisateurAuthoriteDTOs() {
		return secUtilisateurAuthoriteDTOs;
	}

	public void setSecUtilisateurAuthoriteDTOs(List<SecUtilisateurAuthoriteDTO> secUtilisateurAuthoriteDTOs) {
		this.secUtilisateurAuthoriteDTOs = secUtilisateurAuthoriteDTOs;
	}

	public List<Long> getIdSecProfiles() {
		return idSecProfiles;
	}

	public void setIdSecProfiles(List<Long> idSecProfiles) {
		this.idSecProfiles = idSecProfiles;
	}
	
	@Override
	public Set<GrantedAuthority> getAuthorities() {
		return super.getAuthorities();
	}

	@View(entity = "secProfile", attribut = "id")
	public Long getSecProfileId() {
		return secProfileId;
	}

	public void setSecProfileId(Long secProfileId) {
		this.secProfileId = secProfileId;
	}
	
	@View(entity = "secProfile", attribut = "code")
	public String getSecProfileCode() {
		return secProfileCode;
	}

	public void setSecProfileCode(String secProfileCode) {
		this.secProfileCode = secProfileCode;
	}

	@View(entity = "secProfile", attribut = "intitule")
	public String getSecProfileIntitule() {
		return secProfileIntitule;
	}

	public void setSecProfileIntitule(String secProfileIntitule) {
		this.secProfileIntitule = secProfileIntitule;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
}