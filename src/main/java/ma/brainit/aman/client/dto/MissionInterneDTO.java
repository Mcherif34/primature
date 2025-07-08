package ma.brainit.aman.client.dto;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import ma.brainit.aman.client.model.MissionInterne;
import ma.brainit.aman.commun.dto.JsonDateDeserializer;
import ma.brainit.aman.commun.dto.JsonDateSerializer;
import ma.brainit.aman.commun.dto.JsonShortDateSerializer;
import ma.brainit.base.annotations.View;

public class MissionInterneDTO extends MissionInterne {

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
    @View(attribut="transmissionDircom")
    public String getTransmissionDircom() {
        return super.getTransmissionDircom();
    }
    
    @Override
    @View(attribut="instructionsDircab")
    public String getInstructionsDircab() {
        return super.getInstructionsDircab();
    }
    
    @Override
    @View(attribut="preparationSom")
    public String getPreparationSom() {
        return super.getPreparationSom();
    }
    
    @Override
    @View(attribut="visaConseiller")
    public String getVisaConseiller() {
        return super.getVisaConseiller();
    }
    
    @Override
    @View(attribut="transfereAu")
    public String getTransfereAu() {
        return super.getTransfereAu();
    }
    
    @Override
    @View(attribut="visaSgDircab")
    public String getVisaSgDircab() {
        return super.getVisaSgDircab();
    }
    
    @Override
    @View(attribut="signaturePm")
    public String getSignaturePm() {
        return super.getSignaturePm();
    }
    
    @Override
    @View(attribut="transfertSg")
    public String getTransfertSg() {
        return super.getTransfertSg();
    }
    
    @Override
    @View(attribut="rejetInitiation")
    public String getRejetInitiation() {
        return super.getRejetInitiation();
    }
    
    @Override
    @View(attribut="rejetTransmissionDircom")
    public String getRejetTransmissionDircom() {
        return super.getRejetTransmissionDircom();
    }
    
    @Override
    @View(attribut="rejetInstructionsDircab")
    public String getRejetInstructionsDircab() {
        return super.getRejetInstructionsDircab();
    }
    
    @Override
    @View(attribut="rejetPreparationSom")
    public String getRejetPreparationSom() {
        return super.getRejetPreparationSom();
    }
    
    @Override
    @View(attribut="rejetVisaConseiller")
    public String getRejetVisaConseiller() {
        return super.getRejetVisaConseiller();
    }
    
    @Override
    @View(attribut="rejetVisaSgDircab")
    public String getRejetVisaSgDircab() {
        return super.getRejetVisaSgDircab();
    }
    
    @Override
    @View(attribut="rejetSignaturePm")
    public String getRejetSignaturePm() {
        return super.getRejetSignaturePm();
    }
    
    @Override
    @View(attribut="motifRejetTransmissionDircom")
    public String getMotifRejetTransmissionDircom() {
        return super.getMotifRejetTransmissionDircom();
    }
    
    @Override
    @View(attribut="motifRejetInstructionsDircab")
    public String getMotifRejetInstructionsDircab() {
        return super.getMotifRejetInstructionsDircab();
    }
    
    @Override
    @View(attribut="motifRejetPreparationSom")
    public String getMotifRejetPreparationSom() {
        return super.getMotifRejetPreparationSom();
    }
    
    @Override
    @View(attribut="motifRejetVisaConseiller")
    public String getMotifRejetVisaConseiller() {
        return super.getMotifRejetVisaConseiller();
    }
    
    @Override
    @View(attribut="motifRejetVisaSgDircab")
    public String getMotifRejetVisaSgDircab() {
        return super.getMotifRejetVisaSgDircab();
    }
    @Override
    @View(attribut="motifRejetSignaturePm")
    public String getMotifRejetSignaturePm() {
        return super.getMotifRejetSignaturePm();
    }
    
    @Override
    @View(attribut="motifRejetTransfertSg")
    public String getMotifRejetTransfertSg() {
        return super.getMotifRejetTransfertSg();
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
