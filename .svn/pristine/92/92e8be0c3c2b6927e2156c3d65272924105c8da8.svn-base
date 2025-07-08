package ma.brainit.aman.client.dto;

import java.io.File;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import ma.brainit.aman.client.model.CourrierFacture;
import ma.brainit.aman.commun.dto.JsonDateDeserializer;
import ma.brainit.aman.commun.dto.JsonDateSerializer;
import ma.brainit.aman.commun.dto.JsonShortDateSerializer;
import ma.brainit.base.annotations.View;

public class CourrierFactureDTO extends CourrierFacture {

	private static final long serialVersionUID = 1L;
	private Long wSubWorkId;
	private Date wSubWorkDateInitiated;
	private Date wSubWorkDateCompleted;
	private String taskTitle;
	private String performer;
	
	private List<DocumentDTO> documents;
	
    @Override
    @View(attribut="id")
    public Long getId() {
        return super.getId();
    }
    
    @Override
    @View(attribut="versionNum")
    public Long getVersionNum() {
        return super.getVersionNum();
    }
    
    @Override
    @View(attribut="seq")
    public Long getSeq() {
        return super.getSeq();
    }
    
    @Override
    @View(attribut="rowSeqNum")
    public Integer getRowSeqNum() {
        return super.getRowSeqNum();
    }
    
    @Override
    @View(attribut="iterationNum")
    public Integer getIterationNum() {
        return super.getIterationNum();
    }
    
    @Override
    @View(attribut="refExpediteur")
    public String getRefExpediteur() {
        return super.getRefExpediteur();
    }
    
    @Override
    @View(attribut="recuPar")
    public Long getRecuPar() {
        return super.getRecuPar();
    }
    
    @Override
    @View(attribut="expediteur")
    public String getExpediteur() {
        return super.getExpediteur();
    }

    @Override
	@JsonSerialize(using=JsonShortDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "dateReception")
	public Date getDateReception() {
		return super.getDateReception();
	}
    
    @Override
	@JsonSerialize(using=JsonShortDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "dateEnregistrement")
	public Date getDateEnregistrement() {
		return super.getDateEnregistrement();
	}
    
	@Override
    @View(attribut="typeCourrier")
    public String getTypeCourrier() {
        return super.getTypeCourrier();
    }
    
    @Override
    @View(attribut="objet")
    public String getObjet() {
        return super.getObjet();
    }
    
    @Override
    @View(attribut="refArriveeBoc")
    public String getRefArriveeBoc() {
        return super.getRefArriveeBoc();
    }
    
    @Override
    @View(attribut="numBcContrat")
    public String getNumBcContrat() {
        return super.getNumBcContrat();
    }
    
    @Override
    @View(attribut="numFacture")
    public String getNumFacture() {
        return super.getNumFacture();
    }
    
    @Override
    @View(attribut="montantFacture")
    public Double getMontantFacture() {
        return super.getMontantFacture();
    }
    
    @Override
    @View(attribut="elementFacturation")
    public String getElementFacturation() {
        return super.getElementFacturation();
    }
    
    @Override
    @View(attribut="nombrePj")
    public String getNombrePj() {
        return super.getNombrePj();
    }
    
    @Override
	@JsonSerialize(using=JsonShortDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "dateFacture")
	public Date getDateFacture() {
		return super.getDateFacture();
	}
    
    @Override
	@JsonSerialize(using=JsonShortDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "dateDecompte")
	public Date getDateDecompte() {
		return super.getDateDecompte();
	}
    
    @Override
	@JsonSerialize(using=JsonShortDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "dateBonReception")
	public Date getDateBonReception() {
		return super.getDateBonReception();
	}
    
    @Override
	@JsonSerialize(using=JsonShortDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "dateValidation")
	public Date getDateValidation() {
		return super.getDateValidation();
	}
    
    @Override
    @View(attribut="delaiPaiement")
    public Long getDelaiPaiement() {
        return super.getDelaiPaiement();
    }
    
    @Override
    @View(attribut="finMois")
    public Integer getFinMois() {
        return super.getFinMois();
    }
    
    @Override
    @View(attribut="rejetCc")
    public Integer getRejetCc() {
        return super.getRejetCc();
    }
    
    @Override
    @View(attribut="motifRejetCc")
    public String getMotifRejetCc() {
        return super.getMotifRejetCc();
    }
    
    @Override
    @View(attribut="rejetRc")
    public Integer getRejetRc() {
        return super.getRejetRc();
    }
    
    @Override
    @View(attribut="motifRejetRc")
    public String getMotifRejetRc() {
        return super.getMotifRejetRc();
    }

    @Override
    @View(attribut="validationCc")
    public Integer getValidationCc() {
        return super.getValidationCc();
    }
    
    @Override
    @View(attribut="motifValidationCc")
    public String getMotifValidationCc() {
        return super.getMotifValidationCc();
    }
    
    @Override
    @View(attribut="numDecompte")
    public String getNumDecompte() {
        return super.getNumDecompte();
    }
    
    @Override
    @View(attribut="devise")
    public String getDevise() {
        return super.getDevise();
    }
    
    @Override
    @View(attribut="formeJuridique")
    public String getFormeJuridique() {
        return super.getFormeJuridique();
    }
    
    @Override
    @View(attribut="attestationRegularite")
    public String getAttestationRegularite() {
        return super.getAttestationRegularite();
    }
    
    @Override
	@JsonSerialize(using=JsonShortDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "datePrevisPaiement")
	public Date getDatePrevisPaiement() {
		return super.getDatePrevisPaiement();
	}
    
    @Override
    @View(attribut="nature")
    public String getNature() {
        return super.getNature();
    }
    
    @View(entity = "wSubWork", attribut = "id")
	public Long getwSubWorkId() {
		return wSubWorkId;
	}

	public void setwSubWorkId(Long wSubWorkId) {
		this.wSubWorkId = wSubWorkId;
	}

	@JsonSerialize(using=JsonShortDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(entity = "wSubWork", attribut = "subWorkDateInitiated")
    public Date getwSubWorkDateInitiated() {
		return wSubWorkDateInitiated;
	}

	public void setwSubWorkDateInitiated(Date wSubWorkDateInitiated) {
		this.wSubWorkDateInitiated = wSubWorkDateInitiated;
	}

	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(entity = "wSubWork", attribut = "subWorkDateCompleted")
    public Date getwSubWorkDateCompleted() {
		return wSubWorkDateCompleted;
	}

	public void setwSubWorkDateCompleted(Date wSubWorkDateCompleted) {
		this.wSubWorkDateCompleted = wSubWorkDateCompleted;
	}

	public String getTaskTitle() {
		return taskTitle;
	}

	public void setTaskTitle(String taskTitle) {
		this.taskTitle = taskTitle;
	}

	public String getPerformer() {
		return performer;
	}

	public void setPerformer(String performer) {
		this.performer = performer;
	}

	public List<DocumentDTO> getDocuments() {
		return documents;
	}

	public void setDocuments(List<DocumentDTO> documents) {
		this.documents = documents;
	}
    
}
