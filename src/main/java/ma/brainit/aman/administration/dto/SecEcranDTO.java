package ma.brainit.aman.administration.dto;

import java.util.List;

import ma.brainit.base.annotations.View;
import ma.brainit.aman.administration.model.SecEcran;

public class SecEcranDTO extends SecEcran {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long secModuleId;
	private String secMooduleLibelle;
	private List<SecAuthoriteDTO> secAuthoriteDTOs;
	private List<Long> idSecAuthorites;

	@Override
	@View(attribut = "id")
	public Long getId() {
		return super.getId();
	}

	@Override
	@View(attribut = "ecran")
	public String getEcran() {
		return super.getEcran();
	}
	
	@Override
	@View(attribut = "libelle")
	public String getLibelle() {
		return super.getLibelle();
	}

	@View(entity = "secModule", attribut = "id")
	public Long getSecModuleId() {
		return secModuleId;
	}

	public void setSecModuleId(Long secModuleId) {
		this.secModuleId = secModuleId;
	}

	@View(entity = "secModule", attribut = "module")
	public String getSecMooduleLibelle() {
		return secMooduleLibelle;
	}

	public void setSecMooduleLibelle(String secMooduleLibelle) {
		this.secMooduleLibelle = secMooduleLibelle;
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

}
