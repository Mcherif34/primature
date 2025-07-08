package ma.brainit.aman.administration.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;


@Embeddable
public class SecUtilisateurAuthoritePK implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="sec_utilisateur_id")
	private Long secUtilisateurId;
	
	@Column(name="sec_authorite_id")
	private Long secAuthoriteId;


	public SecUtilisateurAuthoritePK() {
		super();
	}
	
	public SecUtilisateurAuthoritePK(Long secUtilisateurId, Long secAuthoriteId) {
		super();
		this.secUtilisateurId = secUtilisateurId;
		this.secAuthoriteId = secAuthoriteId;
	}

	
	public Long getSecUtilisateurId() {
		return secUtilisateurId;
	}
	public void setSecUtilisateurId(Long secUtilisateurId) {
		this.secUtilisateurId = secUtilisateurId;
	}

	public Long getSecAuthoriteId() {
		return secAuthoriteId;
	}
	public void setSecAuthoriteId(Long secAuthoriteId) {
		this.secAuthoriteId = secAuthoriteId;
	}
	
	@Override
	public int hashCode() {
		return super.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		return super.equals(obj);
	}
	
	
}