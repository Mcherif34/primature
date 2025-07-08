package ma.brainit.aman.administration.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the SEC_AUTHORITE database table.
 * 
 */
@Entity
@Table(name="SEC_AUTHORITE")
@NamedQuery(name="SecAuthorite.findAll", query="SELECT s FROM SecAuthorite s")
public class SecAuthorite implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(name = "code", columnDefinition = "NVARCHAR")
	private String code;

	@Column(name = "intitule", columnDefinition = "NVARCHAR")
	private String intitule;
	
	
	// bi-directional many-to-one association to Projet
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SEC_ECRAN_ID")
	private SecEcran secEcran;

	//bi-directional many-to-many association to SecProfile
	@ManyToMany(mappedBy="secAuthorites")
	private List<SecProfile> secProfiles;

	public SecAuthorite() {
	}

	public SecAuthorite(Long id) {
		this.id = id;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getIntitule() {
		return this.intitule;
	}

	public void setIntitule(String intitule) {
		this.intitule = intitule;
	}


	public SecEcran getSecEcran() {
		return secEcran;
	}

	public void setSecEcran(SecEcran secEcran) {
		this.secEcran = secEcran;
	}

	public List<SecProfile> getSecProfiles() {
		return this.secProfiles;
	}

	public void setSecProfiles(List<SecProfile> secProfiles) {
		this.secProfiles = secProfiles;
	}

}