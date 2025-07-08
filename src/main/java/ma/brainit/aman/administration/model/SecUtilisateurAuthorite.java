package ma.brainit.aman.administration.model;

import java.io.Serializable;

import javax.persistence.*;


@Entity
@Table(name="SEC_UTILISATEUR_AUTHORITE")
public class SecUtilisateurAuthorite implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private SecUtilisateurAuthoritePK id;

	
	@Column(name="on_mail")
	private Boolean onMail;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="sec_utilisateur_id",insertable=false,updatable=false)
	private SecUtilisateur secUtilisateur;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="sec_authorite_id",insertable=false,updatable=false)
	private SecAuthorite secAuthorite;


	
	public SecUtilisateurAuthorite() {
		super();
	}
	
	public SecUtilisateurAuthorite(SecUtilisateurAuthoritePK id) {
		super();
		this.id = id;
	}
	
	

	public SecUtilisateurAuthoritePK getId() {
		return this.id;
	}
	public void setId(SecUtilisateurAuthoritePK id) {
		this.id = id;
	}


	
	public Boolean getOnMail() {
		return onMail;
	}

	public void setOnMail(Boolean onMail) {
		this.onMail = onMail;
	}

	public SecUtilisateur getSecUtilisateur() {
		return secUtilisateur;
	}
	public void setSecUtilisateur(SecUtilisateur secUtilisateur) {
		this.secUtilisateur = secUtilisateur;
	}

	public SecAuthorite getSecAuthorite() {
		return secAuthorite;
	}
	public void setSecAuthorite(SecAuthorite secAuthorite) {
		this.secAuthorite = secAuthorite;
	}

	
}