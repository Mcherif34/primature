package ma.brainit.aman.client.model;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "V_DECISION")
public class Decision {
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

    @Column(name = "Référence_décision", columnDefinition = "NVARCHAR")
    private String referenceDecision;
    
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name = "Date_d_enregistrement", columnDefinition = "DATETIME")
	private Date dateEnregistrement;
    
    @Column(name = "Objet", columnDefinition = "NVARCHAR")
    private String objet;
    
    @Column(name = "Initiation", columnDefinition = "NVARCHAR")
    private String initiation;
    
    @Column(name = "Transfert_SG", columnDefinition = "NVARCHAR")
    private String transfertSg;
    
    @Column(name = "Vérification_Coordonnateur", columnDefinition = "NVARCHAR")
    private String verificationCoordonnateur;
    
    @Column(name = "Visa_SG", columnDefinition = "NVARCHAR")
    private String visaSg;
    
    @Column(name = "Signature_PM", columnDefinition = "NVARCHAR")
    private String signaturePm;
    
    @Column(name = "Prise_en_charge_RH")
    private String priseChargeRh;
    
    @Column(name = "Rejet_Initiation", columnDefinition = "NVARCHAR")
    private String rejetInitiation;
    
    @Column(name = "Rejet_Transfert_SG", columnDefinition = "NVARCHAR")
    private String rejetTransfertSg;

    @Column(name = "Rejet_Vérification_Coordonnateur", columnDefinition = "NVARCHAR")
    private String rejetVerificationCoordonnateur;

    @Column(name = "Rejet_Visa_SG", columnDefinition = "NVARCHAR")
    private String rejetVisaSg;

    @Column(name = "Rejet_Signature_PM", columnDefinition = "NVARCHAR")
    private String rejetSignaturePm;

    @Column(name = "Motif_Rejet_Transfert_SG", columnDefinition = "NVARCHAR")
    private String motifRejetTransfertSg;
    
    @Column(name = "Motif_Rejet_Vérification_Coordonnateur", columnDefinition = "NVARCHAR")
    private String motifRejetVerificationCoordonnateur;

    @Column(name = "Motif_Rejet_Visa_SG", columnDefinition = "NVARCHAR")
    private String motifRejetVisaSg;
    
    @Column(name = "Motif_Rejet_Signature_PM", columnDefinition = "NVARCHAR")
    private String motifRejetSignaturePm;
    
    @Column(name = "Motif_Rejet_Prise_en_charge_RH", columnDefinition = "NVARCHAR")
    private String motifRejetPriseChargeRh;
    
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

	public String getVerificationCoordonnateur() {
		return verificationCoordonnateur;
	}

	public void setVerificationCoordonnateur(String verificationCoordonnateur) {
		this.verificationCoordonnateur = verificationCoordonnateur;
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

	public String getRejetVerificationCoordonnateur() {
		return rejetVerificationCoordonnateur;
	}

	public void setRejetVerificationCoordonnateur(String rejetVerificationCoordonnateur) {
		this.rejetVerificationCoordonnateur = rejetVerificationCoordonnateur;
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

	public String getReferenceDecision() {
		return referenceDecision;
	}

	public void setReferenceDecision(String referenceDecision) {
		this.referenceDecision = referenceDecision;
	}

	public String getVisaSg() {
		return visaSg;
	}

	public void setVisaSg(String visaSg) {
		this.visaSg = visaSg;
	}

	public String getPriseChargeRh() {
		return priseChargeRh;
	}

	public void setPriseChargeRh(String priseChargeRh) {
		this.priseChargeRh = priseChargeRh;
	}

	public String getRejetTransfertSg() {
		return rejetTransfertSg;
	}

	public void setRejetTransfertSg(String rejetTransfertSg) {
		this.rejetTransfertSg = rejetTransfertSg;
	}

	public String getRejetVisaSg() {
		return rejetVisaSg;
	}

	public void setRejetVisaSg(String rejetVisaSg) {
		this.rejetVisaSg = rejetVisaSg;
	}

	public String getRejetSignaturePm() {
		return rejetSignaturePm;
	}

	public void setRejetSignaturePm(String rejetSignaturePm) {
		this.rejetSignaturePm = rejetSignaturePm;
	}

	public String getMotifRejetVerificationCoordonnateur() {
		return motifRejetVerificationCoordonnateur;
	}

	public void setMotifRejetVerificationCoordonnateur(String motifRejetVerificationCoordonnateur) {
		this.motifRejetVerificationCoordonnateur = motifRejetVerificationCoordonnateur;
	}

	public String getMotifRejetVisaSg() {
		return motifRejetVisaSg;
	}

	public void setMotifRejetVisaSg(String motifRejetVisaSg) {
		this.motifRejetVisaSg = motifRejetVisaSg;
	}

	public String getMotifRejetSignaturePm() {
		return motifRejetSignaturePm;
	}

	public void setMotifRejetSignaturePm(String motifRejetSignaturePm) {
		this.motifRejetSignaturePm = motifRejetSignaturePm;
	}

	public String getMotifRejetPriseChargeRh() {
		return motifRejetPriseChargeRh;
	}

	public void setMotifRejetPriseChargeRh(String motifRejetPriseChargeRh) {
		this.motifRejetPriseChargeRh = motifRejetPriseChargeRh;
	}

}
