package ma.brainit.aman.client.model;

import javax.persistence.*;

@Entity
@Table(name = "EXPEDITEUR")
public class Expediteur {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name="id")
	private Long id;
    
    @Column(name = "Code", columnDefinition = "NVARCHAR")
    private String code;
    
    @Column(name = "Nom", columnDefinition = "NVARCHAR")
    private String nom;
    
    
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
