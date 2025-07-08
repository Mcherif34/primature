package ma.brainit.aman.administration.dto;

import java.util.List;

import ma.brainit.base.annotations.View;
import ma.brainit.aman.administration.dto.SecUtilisateurDTO;
import ma.brainit.aman.administration.model.SecProfile;

public class SecProfileDTO extends SecProfile {

	private static final long serialVersionUID = 1L;
	private List<SecAuthoriteDTO> secAuthoriteDTOs;
	private List<Long> idSecAuthorites;
	private List<SecUtilisateurDTO> secUtilisateurDTOs;
	private Long performerId;
	private String performerName;
	
	@Override
	@View(attribut = "id")
	public Long getId() {
		return super.getId();
	}

	@Override
	@View(attribut = "code")
	public String getCode() {
		return super.getCode();
	}

	@Override
	@View(attribut = "intitule")
	public String getIntitule() {
		return super.getIntitule();
	}
	
	@Override
	@View(attribut = "module")
	public String getModule() {
		return super.getModule();
	}

	public List<SecAuthoriteDTO> getSecAuthoriteDTOs() {
		return secAuthoriteDTOs;
	}

	public void setSecAuthoriteDTOs(List<SecAuthoriteDTO> secAuthoriteDTOs) {
		this.secAuthoriteDTOs = secAuthoriteDTOs;
	}

	public List<Long> getIdSecAuthorites() {
		return idSecAuthorites;
	}

	public void setIdSecAuthorites(List<Long> idSecAuthorites) {
		this.idSecAuthorites = idSecAuthorites;
	}

	public List<SecUtilisateurDTO> getSecUtilisateurDTOs() {
		return secUtilisateurDTOs;
	}

	public void setSecUtilisateurDTOs(List<SecUtilisateurDTO> secUtilisateurDTOs) {
		this.secUtilisateurDTOs = secUtilisateurDTOs;
	}

	@View(entity = "performer", attribut = "id")
	public Long getPerformerId() {
		return performerId;
	}

	public void setPerformerId(Long performerId) {
		this.performerId = performerId;
	}

	@View(entity = "performer", attribut = "name")
	public String getPerformerName() {
		return performerName;
	}

	public void setPerformerName(String performerName) {
		this.performerName = performerName;
	}

}
