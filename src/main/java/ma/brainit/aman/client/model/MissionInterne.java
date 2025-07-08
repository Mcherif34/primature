package ma.brainit.aman.client.model;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "V_MISSION_INTERNE")
public class MissionInterne {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Référence_courrier", columnDefinition = "NVARCHAR")
    private String referenceCourrier;
    
    @Column(name = "DataID")
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "VolumeID")
	private WSubWork wSubWork;
    
    @Column(name = "VersionNum")
    private Long versionNum;
    
    @Column(name = "Seq")
    private Long seq;
    
    @Column(name = "RowSeqNum")
    private Integer rowSeqNum;
    
    @Column(name = "IterationNum")
    private Integer iterationNum;
    
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name = "Date_d_enregistrement", columnDefinition = "DATETIME")
	private Date dateEnregistrement;
    
    @Column(name = "Objet", columnDefinition = "NVARCHAR")
    private String objet;
    
    @Column(name = "Initiation", columnDefinition = "NVARCHAR")
    private String initiation;
    
    @Column(name = "Transmission_DIRCOM", columnDefinition = "NVARCHAR")
    private String transmissionDircom;
    
    @Column(name = "Instructions_DIRCAB", columnDefinition = "NVARCHAR")
    private String instructionsDircab;
    
    @Column(name = "Préparation_SOM", columnDefinition = "NVARCHAR")
    private String preparationSom;
    
    @Column(name = "Visa_Conseiller", columnDefinition = "NVARCHAR")
    private String visaConseiller;
    
    @Column(name = "Transféré_au", columnDefinition = "NVARCHAR")
    private String transfereAu;
    
    @Column(name = "Visa_SG_DIRCAB", columnDefinition = "NVARCHAR")
    private String visaSgDircab;
    
    @Column(name = "Signature_PM", columnDefinition = "NVARCHAR")
    private String signaturePm;
    
    @Column(name = "Transfert_SG", columnDefinition = "NVARCHAR")
    private String transfertSg;
    
    @Column(name = "Rejet_Initiation", columnDefinition = "NVARCHAR")
    private String rejetInitiation;
    
    @Column(name = "Rejet_Transmission_DIRCOM", columnDefinition = "NVARCHAR")
    private String rejetTransmissionDircom;
    
    @Column(name = "Rejet_Instructions_DIRCAB", columnDefinition = "NVARCHAR")
    private String rejetInstructionsDircab;
    
    @Column(name = "Rejet_Préparation_SOM", columnDefinition = "NVARCHAR")
    private String rejetPreparationSom;
    
    @Column(name = "Rejet_Visa_Conseiller", columnDefinition = "NVARCHAR")
    private String rejetVisaConseiller;

    @Column(name = "Rejet_Visa_SG_DIRCAB", columnDefinition = "NVARCHAR")
    private String rejetVisaSgDircab;

    @Column(name = "Rejet_Signature_PM", columnDefinition = "NVARCHAR")
    private String rejetSignaturePm;

    @Column(name = "Motif_Rejet_Transmission_DIRCOM", columnDefinition = "NVARCHAR")
    private String motifRejetTransmissionDircom;
    
    @Column(name = "Motif_Rejet_Instructions_DIRCAB", columnDefinition = "NVARCHAR")
    private String motifRejetInstructionsDircab;
    
    @Column(name = "Motif_Rejet_Préparation_SOM", columnDefinition = "NVARCHAR")
    private String motifRejetPreparationSom;
    
    @Column(name = "Motif_Rejet_Visa_Conseiller", columnDefinition = "NVARCHAR")
    private String motifRejetVisaConseiller;
    
    @Column(name = "Motif_Rejet_Visa_SG_DIRCAB", columnDefinition = "NVARCHAR")
    private String motifRejetVisaSgDircab;
    
    @Column(name = "Motif_Rejet_Signature_PM", columnDefinition = "NVARCHAR")
    private String motifRejetSignaturePm;
    
    @Column(name = "Motif_Rejet_Transfert_SG", columnDefinition = "NVARCHAR")
    private String motifRejetTransfertSg;
        
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name = "SubWorkTask_DateReady", columnDefinition = "DATETIME")
	private Date taskDateReady;
    
    @Column(name = "SubWorkTask_Title", columnDefinition = "NVARCHAR")
    private String taskTitle;
    
    @Column(name = "Work_Status", columnDefinition = "SMALLINT")
    private Integer status;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SubWorkTask_PerformerID")
    private Performer performer;
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public WSubWork getwSubWork() {
		return wSubWork;
	}

	public void setwSubWork(WSubWork wSubWork) {
		this.wSubWork = wSubWork;
	}

	public Long getVersionNum() {
		return versionNum;
	}

	public void setVersionNum(Long versionNum) {
		this.versionNum = versionNum;
	}

	public Long getSeq() {
		return seq;
	}

	public void setSeq(Long seq) {
		this.seq = seq;
	}

	public Integer getRowSeqNum() {
		return rowSeqNum;
	}

	public void setRowSeqNum(Integer rowSeqNum) {
		this.rowSeqNum = rowSeqNum;
	}

	public Integer getIterationNum() {
		return iterationNum;
	}

	public void setIterationNum(Integer iterationNum) {
		this.iterationNum = iterationNum;
	}

	public Date getDateEnregistrement() {
		return dateEnregistrement;
	}

	public void setDateEnregistrement(Date dateEnregistrement) {
		this.dateEnregistrement = dateEnregistrement;
	}

	public String getObjet() {
		return objet;
	}

	public void setObjet(String objet) {
		this.objet = objet;
	}

	public String getReferenceCourrier() {
		return referenceCourrier;
	}

	public void setReferenceCourrier(String referenceCourrier) {
		this.referenceCourrier = referenceCourrier;
	}

	public String getSignaturePm() {
		return signaturePm;
	}

	public void setSignaturePm(String signaturePm) {
		this.signaturePm = signaturePm;
	}

	public Date getTaskDateReady() {
		return taskDateReady;
	}

	public void setTaskDateReady(Date taskDateReady) {
		this.taskDateReady = taskDateReady;
	}

	public String getTaskTitle() {
		return taskTitle;
	}

	public void setTaskTitle(String taskTitle) {
		this.taskTitle = taskTitle;
	}

	public Performer getPerformer() {
		return performer;
	}

	public void setPerformer(Performer performer) {
		this.performer = performer;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getRejetInitiation() {
		return rejetInitiation;
	}

	public void setRejetInitiation(String rejetInitiation) {
		this.rejetInitiation = rejetInitiation;
	}

	public String getInitiation() {
		return initiation;
	}

	public void setInitiation(String initiation) {
		this.initiation = initiation;
	}

	public String getTransfertSg() {
		return transfertSg;
	}

	public void setTransfertSg(String transfertSg) {
		this.transfertSg = transfertSg;
	}

	public String getMotifRejetTransfertSg() {
		return motifRejetTransfertSg;
	}

	public void setMotifRejetTransfertSg(String motifRejetTransfertSg) {
		this.motifRejetTransfertSg = motifRejetTransfertSg;
	}

	public String getRejetSignaturePm() {
		return rejetSignaturePm;
	}

	public void setRejetSignaturePm(String rejetSignaturePm) {
		this.rejetSignaturePm = rejetSignaturePm;
	}

	public String getMotifRejetSignaturePm() {
		return motifRejetSignaturePm;
	}

	public void setMotifRejetSignaturePm(String motifRejetSignaturePm) {
		this.motifRejetSignaturePm = motifRejetSignaturePm;
	}

	public String getTransmissionDircom() {
		return transmissionDircom;
	}

	public void setTransmissionDircom(String transmissionDircom) {
		this.transmissionDircom = transmissionDircom;
	}

	public String getInstructionsDircab() {
		return instructionsDircab;
	}

	public void setInstructionsDircab(String instructionsDircab) {
		this.instructionsDircab = instructionsDircab;
	}

	public String getPreparationSom() {
		return preparationSom;
	}

	public void setPreparationSom(String preparationSom) {
		this.preparationSom = preparationSom;
	}

	public String getVisaConseiller() {
		return visaConseiller;
	}

	public void setVisaConseiller(String visaConseiller) {
		this.visaConseiller = visaConseiller;
	}

	public String getTransfereAu() {
		return transfereAu;
	}

	public void setTransfereAu(String transfereAu) {
		this.transfereAu = transfereAu;
	}

	public String getVisaSgDircab() {
		return visaSgDircab;
	}

	public void setVisaSgDircab(String visaSgDircab) {
		this.visaSgDircab = visaSgDircab;
	}

	public String getRejetTransmissionDircom() {
		return rejetTransmissionDircom;
	}

	public void setRejetTransmissionDircom(String rejetTransmissionDircom) {
		this.rejetTransmissionDircom = rejetTransmissionDircom;
	}

	public String getRejetInstructionsDircab() {
		return rejetInstructionsDircab;
	}

	public void setRejetInstructionsDircab(String rejetInstructionsDircab) {
		this.rejetInstructionsDircab = rejetInstructionsDircab;
	}

	public String getRejetPreparationSom() {
		return rejetPreparationSom;
	}

	public void setRejetPreparationSom(String rejetPreparationSom) {
		this.rejetPreparationSom = rejetPreparationSom;
	}

	public String getRejetVisaConseiller() {
		return rejetVisaConseiller;
	}

	public void setRejetVisaConseiller(String rejetVisaConseiller) {
		this.rejetVisaConseiller = rejetVisaConseiller;
	}

	public String getRejetVisaSgDircab() {
		return rejetVisaSgDircab;
	}

	public void setRejetVisaSgDircab(String rejetVisaSgDircab) {
		this.rejetVisaSgDircab = rejetVisaSgDircab;
	}

	public String getMotifRejetTransmissionDircom() {
		return motifRejetTransmissionDircom;
	}

	public void setMotifRejetTransmissionDircom(String motifRejetTransmissionDircom) {
		this.motifRejetTransmissionDircom = motifRejetTransmissionDircom;
	}

	public String getMotifRejetInstructionsDircab() {
		return motifRejetInstructionsDircab;
	}

	public void setMotifRejetInstructionsDircab(String motifRejetInstructionsDircab) {
		this.motifRejetInstructionsDircab = motifRejetInstructionsDircab;
	}

	public String getMotifRejetPreparationSom() {
		return motifRejetPreparationSom;
	}

	public void setMotifRejetPreparationSom(String motifRejetPreparationSom) {
		this.motifRejetPreparationSom = motifRejetPreparationSom;
	}

	public String getMotifRejetVisaConseiller() {
		return motifRejetVisaConseiller;
	}

	public void setMotifRejetVisaConseiller(String motifRejetVisaConseiller) {
		this.motifRejetVisaConseiller = motifRejetVisaConseiller;
	}

	public String getMotifRejetVisaSgDircab() {
		return motifRejetVisaSgDircab;
	}

	public void setMotifRejetVisaSgDircab(String motifRejetVisaSgDircab) {
		this.motifRejetVisaSgDircab = motifRejetVisaSgDircab;
	}

}
