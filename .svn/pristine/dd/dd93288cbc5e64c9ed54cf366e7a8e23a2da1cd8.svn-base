package ma.brainit.base;

//import ma.brainit.aman.commun.model.Referentiel;

public class ListDTO {

	private Long id;
	private String libelle;
	private String designation;
	
	public ListDTO() {
		super();
	}

	public ListDTO(Long id, Object libelle) {
		super();
		this.id = id;
		this.libelle = libelle != null ? String.valueOf(libelle) : "";
		this.designation = libelle != null ? String.valueOf(libelle) : "";
	}
	
	public ListDTO(Long id, String valeurc,Double valeurn) {
		super();
		this.id = id;
		if(valeurc != null){
			this.libelle = valeurc;
		}else if(valeurn!= null){
			this.libelle = String.valueOf(valeurn);
		}
		this.designation = libelle;
	}
	
	/*public ListDTO(Referentiel ref,Long id, String valeurc,Double valeurn) {
		super();
		this.id = id;
		String valeur = "";
		if(valeurc != null){
			valeur = valeurc;
		}else if(valeurn!= null){
			valeur = String.valueOf(valeurn);
		}
//		String colonne =ref.getColonne() != null ? ref.getColonne().getColonne()  +"/"  : "-/";
//		String entite = (ref.getColonne() != null && ref.getColonne().getEntite() != null ) ? ref.getColonne().getEntite().getEntite() +"/" : "-/";
		
//		this.libelle =entite +colonne+ valeur;
		this.libelle =valeur;
		this.designation =valeur;
	}*/
	
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getLibelle() {
		return libelle;
	}
	
	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	
}
