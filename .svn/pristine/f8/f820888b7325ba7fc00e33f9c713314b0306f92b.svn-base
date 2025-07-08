package ma.brainit.aman.client.dto;

import java.io.File;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import ma.brainit.aman.client.model.Courrier;
import ma.brainit.base.annotations.View;

public class CourrierDTO extends Courrier {

private static final long serialVersionUID = 1L;
	
	private MultipartFile document;
	
	private String refExpediteur;
	private String expediteur;
	private @DateTimeFormat(pattern="yyyy-MM-dd") Date dateReception;
	private @DateTimeFormat(pattern="yyyy-MM-dd") Date dateEnregistrement;
	private String typeCourrier;
	private String refArriveeBoc;
	private String numBcContrat;
	private String numFacture;
	private String montantFacture;
	private String elementFacturation;
	private String objet;
	private String nombrePj;
	private @DateTimeFormat(pattern="yyyy-MM-dd") Date dateFacture;
	private @DateTimeFormat(pattern="yyyy-MM-dd") Date dateDecompte;
	private Long recuParID;
	
    @Override
    @View(attribut="id")
    public Long getId() {
        return super.getId();
    }

    @Override
    @View(attribut="type")
    public String getType() {
        return super.getType();
    }

    @Override
    @View(attribut="sequence")
    public Long getSequence() {
        return super.getSequence();
    }
    
    @Override
    @View(attribut="month")
    public Integer getMonth() {
        return super.getMonth();
    }
    
    @Override
    @View(attribut="year")
    public Integer getYear() {
        return super.getYear();
    }

	public String getRefExpediteur() {
		return refExpediteur;
	}

	public void setRefExpediteur(String refExpediteur) {
		this.refExpediteur = refExpediteur;
	}

	public String getExpediteur() {
		return expediteur;
	}

	public void setExpediteur(String expediteur) {
		this.expediteur = expediteur;
	}

	public Date getDateReception() {
		return dateReception;
	}

	public void setDateReception(Date dateReception) {
		this.dateReception = dateReception;
	}

	public Date getDateEnregistrement() {
		return dateEnregistrement;
	}

	public void setDateEnregistrement(Date dateEnregistrement) {
		this.dateEnregistrement = dateEnregistrement;
	}

	public String getTypeCourrier() {
		return typeCourrier;
	}

	public void setTypeCourrier(String typeCourrier) {
		this.typeCourrier = typeCourrier;
	}

	public String getRefArriveeBoc() {
		return refArriveeBoc;
	}

	public void setRefArriveeBoc(String refArriveeBoc) {
		this.refArriveeBoc = refArriveeBoc;
	}

	public String getNumBcContrat() {
		return numBcContrat;
	}

	public void setNumBcContrat(String numBcContrat) {
		this.numBcContrat = numBcContrat;
	}

	public String getNumFacture() {
		return numFacture;
	}

	public void setNumFacture(String numFacture) {
		this.numFacture = numFacture;
	}

	public String getMontantFacture() {
		return montantFacture;
	}

	public void setMontantFacture(String montantFacture) {
		this.montantFacture = montantFacture;
	}

	public String getElementFacturation() {
		return elementFacturation;
	}

	public void setElementFacturation(String elementFacturation) {
		this.elementFacturation = elementFacturation;
	}

	public String getObjet() {
		return objet;
	}

	public void setObjet(String objet) {
		this.objet = objet;
	}

	public String getNombrePj() {
		return nombrePj;
	}

	public void setNombrePj(String nombrePj) {
		this.nombrePj = nombrePj;
	}

	public Date getDateFacture() {
		return dateFacture;
	}

	public void setDateFacture(Date dateFacture) {
		this.dateFacture = dateFacture;
	}

	public Date getDateDecompte() {
		return dateDecompte;
	}

	public void setDateDecompte(Date dateDecompte) {
		this.dateDecompte = dateDecompte;
	}

	public Long getRecuParID() {
		return recuParID;
	}

	public void setRecuParID(Long recuParID) {
		this.recuParID = recuParID;
	}

	public MultipartFile getDocument() {
		return document;
	}

	public void setDocument(MultipartFile document) {
		this.document = document;
	}
	
}
