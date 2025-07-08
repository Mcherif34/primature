package ma.brainit.aman.administration.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * The persistent class for the MODULE database table.
 * 
 */
@Entity
@Table(name = "SEC_MODULE")
@NamedQuery(name = "SecModule.findAll", query = "SELECT m FROM SecModule m")
public class SecModule implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(name = "module", columnDefinition = "NVARCHAR")
	private String module;
	
	@Column(name = "libelle", columnDefinition = "NVARCHAR")
	private String libelle;

	// bi-directional many-to-one association to Secteur
	@JsonIgnore 
	@OrderBy("ecran ASC")
	@OneToMany(mappedBy = "secModule")
	private List<SecEcran> secEcrans;

	public SecModule() {
		
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getModule() {
		return module;
	}
	
	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public List<SecEcran> getSecEcrans() {
		return secEcrans;
	}

	public void setSecEcrans(List<SecEcran> secEcrans) {
		this.secEcrans = secEcrans;
	}

}