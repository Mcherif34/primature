package ma.brainit.aman.administration.dto;

import ma.brainit.base.annotations.View;
import ma.brainit.aman.administration.model.SecAuthorite;

public class SecAuthoriteDTO extends SecAuthorite {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long secEcranId;
	private String secEcranLibelle;

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
	

	@View(entity = "secEcran", attribut = "id")
	public Long getSecEcranId() {
		return secEcranId;
	}

	public void setSecEcranId(Long secEcranId) {
		this.secEcranId = secEcranId;
	}

	@View(entity = "secEcran", attribut = "ecran")
	public String getSecEcranLibelle() {
		return secEcranLibelle;
	}

	public void setSecEcranLibelle(String secEcranLibelle) {
		this.secEcranLibelle = secEcranLibelle;
	}

}
