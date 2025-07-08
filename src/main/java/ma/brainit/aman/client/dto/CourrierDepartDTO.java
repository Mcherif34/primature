package ma.brainit.aman.client.dto;

import java.io.File;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import ma.brainit.aman.client.model.CourrierDepart;
import ma.brainit.aman.commun.dto.JsonDateDeserializer;
import ma.brainit.aman.commun.dto.JsonDateSerializer;
import ma.brainit.aman.commun.dto.JsonShortDateSerializer;
import ma.brainit.base.annotations.View;

public class CourrierDepartDTO extends CourrierDepart {

	private static final long serialVersionUID = 1L;
	private Long wSubWorkId;
	private Date wSubWorkDateInitiated;
	private Date wSubWorkDateCompleted;
	private String poleEmetteurName;
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
    @View(attribut="refDestinataire")
    public String getRefDestinataire() {
        return super.getRefDestinataire();
    }
    
    @Override
    @View(attribut="destinataire")
    public String getDestinataire() {
        return super.getDestinataire();
    }

    @Override
	@JsonSerialize(using=JsonShortDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "dateDepart")
	public Date getDateDepart() {
		return super.getDateDepart();
	}
    
    @Override
	@JsonSerialize(using=JsonShortDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "dateLivraison")
	public Date getDateLivraison() {
		return super.getDateLivraison();
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
    @View(attribut="observations")
    public String getObservations() {
        return super.getObservations();
    }
    
    @Override
    @View(attribut="refDepartBoc")
    public String getRefDepartBoc() {
        return super.getRefDepartBoc();
    }
    
    @Override
    @View(attribut="nombrePj")
    public String getNombrePj() {
        return super.getNombrePj();
    }
    
    @Override
    @View(attribut="ville")
    public String getVille() {
        return super.getVille();
    }
    
    @Override
    @View(attribut="adresse")
    public String getAdresse() {
        return super.getAdresse();
    }
    
    @Override
    @View(attribut="refRegistrePhysique")
    public String getRefRegistrePhysique() {
        return super.getRefRegistrePhysique();
    }
       
    @Override
    @View(attribut="redacteur")
    public String getRedacteur() {
        return super.getRedacteur();
    }
    
    @Override
    @View(attribut="signataire")
    public String getSignataire() {
        return super.getSignataire();
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
	
	@View(entity = "poleEmetteur", attribut = "name")
	public String getPoleEmetteurName() {
		return poleEmetteurName;
	}

	public void setPoleEmetteurName(String poleEmetteurName) {
		this.poleEmetteurName = poleEmetteurName;
	}
	
	@Override
    @View(attribut="urgence")
    public String getUrgence() {
        return super.getUrgence();
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
