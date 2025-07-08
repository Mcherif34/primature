package ma.brainit.aman.client.model;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "V_TITULARISATION")
public class Titularisation {
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

    @Column(name = "Référence_expéditeur", columnDefinition = "NVARCHAR")
    private String referenceExpediteur;
    
    @Column(name = "Expéditeur", columnDefinition = "NVARCHAR")
    private String expediteur;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Date_de_réception", columnDefinition = "DATETIME")
	private Date dateReception;
    
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name = "Date_d_enregistrement", columnDefinition = "DATETIME")
	private Date dateEnregistrement;
    
    @Column(name = "Objet", columnDefinition = "NVARCHAR")
    private String objet;
    
    @Column(name = "Initiation", columnDefinition = "NVARCHAR")
    private String initiation;
    
    @Column(name = "Réception_du_courrier", columnDefinition = "NVARCHAR")
    private String receptionCourrier;
    
    @Column(name = "Transfert_SG", columnDefinition = "NVARCHAR")
    private String transfertSg;
    
    @Column(name = "Vérification_Assistant_Conseiller", columnDefinition = "NVARCHAR")
    private String verificationAssistantConseiller;
    
    @Column(name = "Visa_Conseiller", columnDefinition = "NVARCHAR")
    private String visaConseiller;
    
    @Column(name = "Transfert_Assistant_Conseiller", columnDefinition = "NVARCHAR")
    private String transfertAssistantConseiller;

    @Column(name = "Signature_PM", columnDefinition = "NVARCHAR")
    private String signaturePm;
    
    @Column(name = "Vérification_Conseiller", columnDefinition = "NVARCHAR")
    private String verificationConseiller;
    
    @Column(name = "Transfert_DIRCAB", columnDefinition = "NVARCHAR")
    private String transfertDircab;
    
    @Column(name = "Envoi_DIRCAB_ADJ", columnDefinition = "NVARCHAR")
    private String envoiDircabAdj;
    
    @Column(name = "Codification_SGG", columnDefinition = "NVARCHAR")
    private String codificationSgg;
    
    @Column(name = "Rejet_Initiation", columnDefinition = "NVARCHAR")
    private String rejetInitiation;
    
    @Column(name = "Rejet_Réception_du_courrier", columnDefinition = "NVARCHAR")
    private String rejetReceptionCourrier;
    
    @Column(name = "Rejet_Transfert_SG", columnDefinition = "NVARCHAR")
    private String rejetTransfertSg;
    
    @Column(name = "Rejet_Vérification_Assistant_Conseiller", columnDefinition = "NVARCHAR")
    private String rejetVerificationAssistantConseiller;
    
    @Column(name = "Rejet_Visa_Conseiller", columnDefinition = "NVARCHAR")
    private String rejetVisaConseiller;
    
    @Column(name = "Rejet_Transfert_Assistant_Conseiller", columnDefinition = "NVARCHAR")
    private String rejetTransfertAssistantConseiller;
    
    @Column(name = "Rejet_Signature_PM", columnDefinition = "NVARCHAR")
    private String rejetSignaturePm;
    
    @Column(name = "Rejet_Vérification_Conseiller", columnDefinition = "NVARCHAR")
    private String rejetVerificationConseiller;
    
    @Column(name = "Rejet_Transfert_DIRCAB", columnDefinition = "NVARCHAR")
    private String rejetTransfertDircab;
    
    @Column(name = "Rejet_Envoi_DIRCAB_ADJ", columnDefinition = "NVARCHAR")
    private String rejetEnvoiDircabAdj;
    
    @Column(name = "Motif_Rejet_Courrier", columnDefinition = "NVARCHAR")
    private String motifRejetCourrier;

    @Column(name = "Motif_Rejet_Transfert_SG", columnDefinition = "NVARCHAR")
    private String motifRejetTransfertSg;
    
    @Column(name = "Motif_Rejet_Vérification_Assistant_Conseiller", columnDefinition = "NVARCHAR")
    private String motifRejetVerificationAssistantConseiller;
    
    @Column(name = "Motif_Rejet_Visa_Conseiller", columnDefinition = "NVARCHAR")
    private String motifRejetVisaConseiller;
    
    @Column(name = "Motif_Rejet_Transfert_Assistant_Conseiller", columnDefinition = "NVARCHAR")
    private String motifRejetTransfertAssistantConseiller;
    
    @Column(name = "Motif_Rejet_Signature_PM", columnDefinition = "NVARCHAR")
    private String motifRejetSignaturePm;
    
    @Column(name = "Motif_Rejet_Vérification_Conseiller", columnDefinition = "NVARCHAR")
    private String motifRejetVerificationConseiller;
    
    @Column(name = "Motif_Rejet_Transfert_DIRCAB", columnDefinition = "NVARCHAR")
    private String motifRejetTransfertDircab;
    
    @Column(name = "Motif_Rejet_Envoi_DIRCAB_ADJ", columnDefinition = "NVARCHAR")
    private String motifRejetEnvoiDircabAdj;
    
    @Column(name = "Motif_Rejet_Codification_SGG", columnDefinition = "NVARCHAR")
    private String motifRejetCodificationSgg;
    
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

	public String getReferenceExpediteur() {
		return referenceExpediteur;
	}

	public void setReferenceExpediteur(String referenceExpediteur) {
		this.referenceExpediteur = referenceExpediteur;
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

	public String getRejetReceptionCourrier() {
		return rejetReceptionCourrier;
	}

	public void setRejetReceptionCourrier(String rejetReceptionCourrier) {
		this.rejetReceptionCourrier = rejetReceptionCourrier;
	}

	public String getMotifRejetCourrier() {
		return motifRejetCourrier;
	}

	public void setMotifRejetCourrier(String motifRejetCourrier) {
		this.motifRejetCourrier = motifRejetCourrier;
	}

	public String getInitiation() {
		return initiation;
	}

	public void setInitiation(String initiation) {
		this.initiation = initiation;
	}

	public String getReceptionCourrier() {
		return receptionCourrier;
	}

	public void setReceptionCourrier(String receptionCourrier) {
		this.receptionCourrier = receptionCourrier;
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

	public String getVerificationAssistantConseiller() {
		return verificationAssistantConseiller;
	}

	public void setVerificationAssistantConseiller(String verificationAssistantConseiller) {
		this.verificationAssistantConseiller = verificationAssistantConseiller;
	}

	public String getVisaConseiller() {
		return visaConseiller;
	}

	public void setVisaConseiller(String visaConseiller) {
		this.visaConseiller = visaConseiller;
	}

	public String getTransfertAssistantConseiller() {
		return transfertAssistantConseiller;
	}

	public void setTransfertAssistantConseiller(String transfertAssistantConseiller) {
		this.transfertAssistantConseiller = transfertAssistantConseiller;
	}

	public String getVerificationConseiller() {
		return verificationConseiller;
	}

	public void setVerificationConseiller(String verificationConseiller) {
		this.verificationConseiller = verificationConseiller;
	}

	public String getTransfertDircab() {
		return transfertDircab;
	}

	public void setTransfertDircab(String transfertDircab) {
		this.transfertDircab = transfertDircab;
	}

	public String getEnvoiDircabAdj() {
		return envoiDircabAdj;
	}

	public void setEnvoiDircabAdj(String envoiDircabAdj) {
		this.envoiDircabAdj = envoiDircabAdj;
	}

	public String getCodificationSgg() {
		return codificationSgg;
	}

	public void setCodificationSgg(String codificationSgg) {
		this.codificationSgg = codificationSgg;
	}

	public String getRejetTransfertSg() {
		return rejetTransfertSg;
	}

	public void setRejetTransfertSg(String rejetTransfertSg) {
		this.rejetTransfertSg = rejetTransfertSg;
	}

	public String getRejetVerificationAssistantConseiller() {
		return rejetVerificationAssistantConseiller;
	}

	public void setRejetVerificationAssistantConseiller(String rejetVerificationAssistantConseiller) {
		this.rejetVerificationAssistantConseiller = rejetVerificationAssistantConseiller;
	}

	public String getRejetVisaConseiller() {
		return rejetVisaConseiller;
	}

	public void setRejetVisaConseiller(String rejetVisaConseiller) {
		this.rejetVisaConseiller = rejetVisaConseiller;
	}

	public String getRejetTransfertAssistantConseiller() {
		return rejetTransfertAssistantConseiller;
	}

	public void setRejetTransfertAssistantConseiller(String rejetTransfertAssistantConseiller) {
		this.rejetTransfertAssistantConseiller = rejetTransfertAssistantConseiller;
	}

	public String getRejetSignaturePm() {
		return rejetSignaturePm;
	}

	public void setRejetSignaturePm(String rejetSignaturePm) {
		this.rejetSignaturePm = rejetSignaturePm;
	}

	public String getRejetVerificationConseiller() {
		return rejetVerificationConseiller;
	}

	public void setRejetVerificationConseiller(String rejetVerificationConseiller) {
		this.rejetVerificationConseiller = rejetVerificationConseiller;
	}

	public String getRejetTransfertDircab() {
		return rejetTransfertDircab;
	}

	public void setRejetTransfertDircab(String rejetTransfertDircab) {
		this.rejetTransfertDircab = rejetTransfertDircab;
	}

	public String getRejetEnvoiDircabAdj() {
		return rejetEnvoiDircabAdj;
	}

	public void setRejetEnvoiDircabAdj(String rejetEnvoiDircabAdj) {
		this.rejetEnvoiDircabAdj = rejetEnvoiDircabAdj;
	}

	public String getMotifRejetVerificationAssistantConseiller() {
		return motifRejetVerificationAssistantConseiller;
	}

	public void setMotifRejetVerificationAssistantConseiller(String motifRejetVerificationAssistantConseiller) {
		this.motifRejetVerificationAssistantConseiller = motifRejetVerificationAssistantConseiller;
	}

	public String getMotifRejetVisaConseiller() {
		return motifRejetVisaConseiller;
	}

	public void setMotifRejetVisaConseiller(String motifRejetVisaConseiller) {
		this.motifRejetVisaConseiller = motifRejetVisaConseiller;
	}

	public String getMotifRejetTransfertAssistantConseiller() {
		return motifRejetTransfertAssistantConseiller;
	}

	public void setMotifRejetTransfertAssistantConseiller(String motifRejetTransfertAssistantConseiller) {
		this.motifRejetTransfertAssistantConseiller = motifRejetTransfertAssistantConseiller;
	}

	public String getMotifRejetSignaturePm() {
		return motifRejetSignaturePm;
	}

	public void setMotifRejetSignaturePm(String motifRejetSignaturePm) {
		this.motifRejetSignaturePm = motifRejetSignaturePm;
	}

	public String getMotifRejetVerificationConseiller() {
		return motifRejetVerificationConseiller;
	}

	public void setMotifRejetVerificationConseiller(String motifRejetVerificationConseiller) {
		this.motifRejetVerificationConseiller = motifRejetVerificationConseiller;
	}

	public String getMotifRejetTransfertDircab() {
		return motifRejetTransfertDircab;
	}

	public void setMotifRejetTransfertDircab(String motifRejetTransfertDircab) {
		this.motifRejetTransfertDircab = motifRejetTransfertDircab;
	}

	public String getMotifRejetEnvoiDircabAdj() {
		return motifRejetEnvoiDircabAdj;
	}

	public void setMotifRejetEnvoiDircabAdj(String motifRejetEnvoiDircabAdj) {
		this.motifRejetEnvoiDircabAdj = motifRejetEnvoiDircabAdj;
	}

	public String getMotifRejetCodificationSgg() {
		return motifRejetCodificationSgg;
	}

	public void setMotifRejetCodificationSgg(String motifRejetCodificationSgg) {
		this.motifRejetCodificationSgg = motifRejetCodificationSgg;
	}

}
