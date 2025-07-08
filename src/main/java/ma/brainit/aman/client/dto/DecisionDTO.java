package ma.brainit.aman.client.dto;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import ma.brainit.aman.client.model.Decision;
import ma.brainit.aman.commun.dto.JsonDateDeserializer;
import ma.brainit.aman.commun.dto.JsonDateSerializer;
import ma.brainit.aman.commun.dto.JsonShortDateSerializer;
import ma.brainit.base.annotations.View;

public class DecisionDTO extends Decision {

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
    @View(attribut="referenceDecision")
    public String getReferenceDecision() {
        return super.getReferenceDecision();
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
    @View(attribut="transfertSg")
    public String getTransfertSg() {
        return super.getTransfertSg();
    }
    
    @Override
    @View(attribut="verificationCoordonnateur")
    public String getVerificationCoordonnateur() {
        return super.getVerificationCoordonnateur();
    }
    
    @Override
    @View(attribut="visaSg")
    public String getVisaSg() {
        return super.getVisaSg();
    }
    
    @Override
    @View(attribut="signaturePm")
    public String getSignaturePm() {
        return super.getSignaturePm();
    }
    
    @Override
    @View(attribut="priseChargeRh")
    public String getPriseChargeRh() {
        return super.getPriseChargeRh();
    }
    
    @Override
    @View(attribut="rejetInitiation")
    public String getRejetInitiation() {
        return super.getRejetInitiation();
    }
    
    @Override
    @View(attribut="rejetTransfertSg")
    public String getRejetTransfertSg() {
        return super.getRejetTransfertSg();
    }
    
    @Override
    @View(attribut="rejetVerificationCoordonnateur")
    public String getRejetVerificationCoordonnateur() {
        return super.getRejetVerificationCoordonnateur();
    }
    
    @Override
    @View(attribut="rejetVisaSg")
    public String getRejetVisaSg() {
        return super.getRejetVisaSg();
    }
    
    @Override
    @View(attribut="rejetSignaturePm")
    public String getRejetSignaturePm() {
        return super.getRejetSignaturePm();
    }
    
    @Override
    @View(attribut="motifRejetTransfertSg")
    public String getMotifRejetTransfertSg() {
        return super.getMotifRejetTransfertSg();
    }
    
    @Override
    @View(attribut="motifRejetVerificationCoordonnateur")
    public String getMotifRejetVerificationCoordonnateur() {
        return super.getMotifRejetVerificationCoordonnateur();
    }
    
    @Override
    @View(attribut="motifRejetVisaSg")
    public String getMotifRejetVisaSg() {
        return super.getMotifRejetVisaSg();
    }
    
    @Override
    @View(attribut="motifRejetSignaturePm")
    public String getMotifRejetSignaturePm() {
        return super.getMotifRejetSignaturePm();
    }
    
    @Override
    @View(attribut="motifRejetPriseChargeRh")
    public String getMotifRejetPriseChargeRh() {
        return super.getMotifRejetPriseChargeRh();
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
