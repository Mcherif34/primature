package ma.brainit.aman.client.dto;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import ma.brainit.aman.client.model.AudienceSg;
import ma.brainit.aman.commun.dto.JsonDateDeserializer;
import ma.brainit.aman.commun.dto.JsonDateSerializer;
import ma.brainit.aman.commun.dto.JsonShortDateSerializer;
import ma.brainit.base.annotations.View;

public class AudienceSgDTO extends AudienceSg {

	private static final long serialVersionUID = 1L;
	private Long wSubWorkId;
	private Date wSubWorkDateInitiated;
	private Date wSubWorkDateCompleted;
	private Long performerId;
	private String performerName;
	private String motif;
	
	private List<MultipartFile> documents;
	
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
    @View(attribut="referenceExpediteur")
    public String getReferenceExpediteur() {
        return super.getReferenceExpediteur();
    }
    
    @Override
    @View(attribut="expediteur")
    public String getExpediteur() {
        return super.getExpediteur();
    }

    @Override
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "dateReception")
	public Date getDateReception() {
		return super.getDateReception();
	}
    
    @Override
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "dateEnregistrement")
	public Date getDateEnregistrement() {
		return super.getDateEnregistrement();
	}
    
    @Override
    @View(attribut="objet")
    public String getObjet() {
        return super.getObjet();
    }
    
    @Override
    @View(attribut="initiation")
    public String getInitiation() {
        return super.getInitiation();
    }
    
    @Override
    @View(attribut="receptionCourrier")
    public String getReceptionCourrier() {
        return super.getReceptionCourrier();
    }
    
    @Override
    @View(attribut="annotationSg")
    public String getAnnotationSg() {
        return super.getAnnotationSg();
    }
    
    @Override
    @View(attribut="verificationCoordonnateur")
    public String getVerificationCoordonnateur() {
        return super.getVerificationCoordonnateur();
    }
    
    @Override
    @View(attribut="validationSg")
    public String getValidationSg() {
        return super.getValidationSg();
    }
    
    @Override
    @View(attribut="conseillerTechnique")
    public Long getConseillerTechnique() {
        return super.getConseillerTechnique();
    }
    
    @Override
    @View(attribut="preparationConseiller")
    public String getPreparationConseiller() {
        return super.getPreparationConseiller();
    }
    
    @Override
    @View(attribut="transfertSg")
    public String getTransfertSg() {
        return super.getTransfertSg();
    }
    
    @Override
    @View(attribut="consultationPm")
    public String getConsultationPm() {
        return super.getConsultationPm();
    }
    
    @Override
    @View(attribut="rejetInitiation")
    public String getRejetInitiation() {
        return super.getRejetInitiation();
    }
    
    @Override
    @View(attribut="rejetReceptionCourrier")
    public String getRejetReceptionCourrier() {
        return super.getRejetReceptionCourrier();
    }
    
    @Override
    @View(attribut="rejetAnnotationSg")
    public String getRejetAnnotationSg() {
        return super.getRejetAnnotationSg();
    }
    
    @Override
    @View(attribut="rejetVerificationCoordonnateur")
    public String getRejetVerificationCoordonnateur() {
        return super.getRejetVerificationCoordonnateur();
    }
    
    @Override
    @View(attribut="rejetValidationSg")
    public String getRejetValidationSg() {
        return super.getRejetValidationSg();
    }
    
    @Override
    @View(attribut="rejetPreparationConseiller")
    public String getRejetPreparationConseiller() {
        return super.getRejetPreparationConseiller();
    }
    
    @Override
    @View(attribut="rejetTransfertSg")
    public String getRejetTransfertSg() {
        return super.getRejetTransfertSg();
    }
    
    @Override
    @View(attribut="motifRejetCourrier")
    public String getMotifRejetCourrier() {
        return super.getMotifRejetCourrier();
    }
    
    @Override
    @View(attribut="motifRejetAnnotationSg")
    public String getMotifRejetAnnotationSg() {
        return super.getMotifRejetAnnotationSg();
    }
    
    @Override
    @View(attribut="motifRejetVerificationCoordonnateur")
    public String getMotifRejetVerificationCoordonnateur() {
        return super.getMotifRejetVerificationCoordonnateur();
    }
    
    @Override
    @View(attribut="motifRejetValidationSg")
    public String getMotifRejetValidationSg() {
        return super.getMotifRejetValidationSg();
    }
    
    @Override
    @View(attribut="motifRejetPreparationConseiller")
    public String getMotifRejetPreparationConseiller() {
        return super.getMotifRejetPreparationConseiller();
    }
    
    @Override
    @View(attribut="motifRejetTransfertSg")
    public String getMotifRejetTransfertSg() {
        return super.getMotifRejetTransfertSg();
    }
    
    @Override
    @View(attribut="motifRejetConsultationPm")
    public String getMotifRejetConsultationPm() {
        return super.getMotifRejetConsultationPm();
    }
    
    @Override
    @View(attribut="referenceCourrier")
    public String getReferenceCourrier() {
        return super.getReferenceCourrier();
    }
    
    @Override
	@JsonSerialize(using=JsonDateSerializer.class)
	@JsonDeserialize(using=JsonDateDeserializer.class)
	@View(attribut = "taskDateReady")
	public Date getTaskDateReady() {
		return super.getTaskDateReady();
	}
    
    @Override
    @View(attribut="taskTitle")
    public String getTaskTitle() {
        return super.getTaskTitle();
    }
    
    @Override
    @View(attribut="status")
    public Integer getStatus() {
        return super.getStatus();
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
	
	@View(entity = "performer", attribut = "id")
	public Long getPerformerId() {
		return performerId;
	}

	public void setPerformerId(Long performerId) {
		this.performerId = performerId;
	}

	@View(entity = "performer", attribut = "name")
	public String getPerformerName() {
		return performerName;
	}

	public void setPerformerName(String performerName) {
		this.performerName = performerName;
	}

	public List<MultipartFile> getDocuments() {
		return documents;
	}

	public void setDocuments(List<MultipartFile> documents) {
		this.documents = documents;
	}

	public String getMotif() {
		return motif;
	}

	public void setMotif(String motif) {
		this.motif = motif;
	}
	
}
