package ma.brainit.aman.administration.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

/**
 * The persistent class for the ECRAN database table.
 * 
 */
@Entity
@Table(name = "SEC_ECRAN")
@NamedQuery(name = "SecEcran.findAll", query = "SELECT e FROM SecEcran e")
public class SecEcran implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(name = "ecran", columnDefinition = "NVARCHAR")
	private String ecran;
	
	@Column(name = "libelle", columnDefinition = "NVARCHAR")
	private String libelle;

	// bi-directional many-to-one association to Projet
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SEC_MODULE_ID")
	private SecModule secModule;

	@OneToMany(mappedBy = "secEcran")
	@OrderBy("intitule ASC")
	private List<SecAuthorite> secAuthorites;

	public SecEcran() {
	}
	
	public SecEcran(Long id) {
		this.id = id;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEcran() {
		return ecran;
	}

	public void setEcran(String ecran) {
		this.ecran = ecran;
	}
	
	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public SecModule getSecModule() {
		return secModule;
	}

	public void setSecModule(SecModule secModule) {
		this.secModule = secModule;
	}

	public List<SecAuthorite> getSecAuthorites() {
		return secAuthorites;
	}

	public void setSecAuthorites(List<SecAuthorite> secAuthorites) {
		this.secAuthorites = secAuthorites;
	}

}