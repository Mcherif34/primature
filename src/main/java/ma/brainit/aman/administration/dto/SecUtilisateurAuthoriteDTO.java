package ma.brainit.aman.administration.dto;

import ma.brainit.base.annotations.View;
import ma.brainit.aman.administration.model.SecUtilisateurAuthorite;
import ma.brainit.aman.administration.model.SecUtilisateurAuthoritePK;

public class SecUtilisateurAuthoriteDTO extends SecUtilisateurAuthorite {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Long secUtilisateurId;
	private String secUtilisateurLibelle;
	
	private Long secAuthoriteId;
	private String secAuthoriteLibelle;
	
	
	@Override
	@View(attribut="id")
	public SecUtilisateurAuthoritePK getId() {
		return super.getId();
	}
	
	
	@Override
	@View(attribut="onMail")
	public Boolean getOnMail() {
		return super.getOnMail();
	}

	@View(attribut="id",entity="secUtilisateur")
	public Long getSecUtilisateurId() {
		return secUtilisateurId;
	}
	public void setSecUtilisateurId(Long secUtilisateurId) {
		this.secUtilisateurId = secUtilisateurId;
	}
	
	@View(attribut="login",entity="secUtilisateur")
	public String getSecUtilisateurLibelle() {
		return secUtilisateurLibelle;
	}
	public void setSecUtilisateurLibelle(String secUtilisateurLibelle) {
		this.secUtilisateurLibelle = secUtilisateurLibelle;
	}

	
	@View(attribut="id",entity="secAuthorite")
	public Long getSecAuthoriteId() {
		return secAuthoriteId;
	}
	public void setSecAuthoriteId(Long secAuthoriteId) {
		this.secAuthoriteId = secAuthoriteId;
	}

	@View(attribut="intitule",entity="secAuthorite")
	public String getSecAuthoriteLibelle() {
		return secAuthoriteLibelle;
	}
	public void setSecAuthoriteLibelle(String secAuthoriteLibelle) {
		this.secAuthoriteLibelle = secAuthoriteLibelle;
	}
	
	
}
