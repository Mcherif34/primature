package ma.brainit.aman.client.model;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "V_AUDIENCE_SG")
public class AudienceSg {
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
    
    @Column(name = "Annotation_SG", columnDefinition = "NVARCHAR")
    private String annotationSg;
    
    @Column(name = "Vérification_Coordonnateur", columnDefinition = "NVARCHAR")
    private String verificationCoordonnateur;
    
    @Column(name = "Validation_SG", columnDefinition = "NVARCHAR")
    private String validationSg;
    
    @Column(name = "Conseiller_technique")
    private Long conseillerTechnique;
    
    @Column(name = "Préparation_Conseiller", columnDefinition = "NVARCHAR")
    private String preparationConseiller;
    
    @Column(name = "Transfert_SG", columnDefinition = "NVARCHAR")
    private String transfertSg;
    
    @Column(name = "Consultation_PM", columnDefinition = "NVARCHAR")
    private String consultationPm;
    
    @Column(name = "Rejet_Initiation", columnDefinition = "NVARCHAR")
    private String rejetInitiation;
    
    @Column(name = "Rejet_Réception_du_courrier", columnDefinition = "NVARCHAR")
    private String rejetReceptionCourrier;
    
    @Column(name = "Rejet_Annotation_SG", columnDefinition = "NVARCHAR")
    private String rejetAnnotationSg;
    
    @Column(name = "Rejet_Vérification_Coordonnateur", columnDefinition = "NVARCHAR")
    private String rejetVerificationCoordonnateur;
    
    @Column(name = "Rejet_Validation_SG", columnDefinition = "NVARCHAR")
    private String rejetValidationSg;
    
    @Column(name = "Rejet_Préparation_Conseiller", columnDefinition = "NVARCHAR")
    private String rejetPreparationConseiller;
    
    @Column(name = "Rejet_Transfert_SG", columnDefinition = "NVARCHAR")
    private String rejetTransfertSg;
    
    @Column(name = "Motif_Rejet_Courrier", columnDefinition = "NVARCHAR")
    private String motifRejetCourrier;
    
    @Column(name = "Motif_Rejet_Annotation_SG", columnDefinition = "NVARCHAR")
    private String motifRejetAnnotationSg;
    
    @Column(name = "Motif_Rejet_Vérification_Coordonnateur", columnDefinition = "NVARCHAR")
    private String motifRejetVerificationCoordonnateur;
    
    @Column(name = "Motif_Rejet_Validation_SG", columnDefinition = "NVARCHAR")
    private String motifRejetValidationSg;
    
    @Column(name = "Motif_Rejet_Préparation_Conseiller", columnDefinition = "NVARCHAR")
    private String motifRejetPreparationConseiller;
    
    @Column(name = "Motif_Rejet_Transfert_SG", columnDefinition = "NVARCHAR")
    private String motifRejetTransfertSg;
    
    @Column(name = "Motif_Rejet_Consultation_PM", columnDefinition = "NVARCHAR")
    private String motifRejetConsultationPm;
    
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

	public String getAnnotationSg() {
		return annotationSg;
	}

	public void setAnnotationSg(String annotationSg) {
		this.annotationSg = annotationSg;
	}

	public String getVerificationCoordonnateur() {
		return verificationCoordonnateur;
	}

	public void setVerificationCoordonnateur(String verificationCoordonnateur) {
		this.verificationCoordonnateur = verificationCoordonnateur;
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

	public String getRejetVerificationCoordonnateur() {
		return rejetVerificationCoordonnateur;
	}

	public void setRejetVerificationCoordonnateur(String rejetVerificationCoordonnateur) {
		this.rejetVerificationCoordonnateur = rejetVerificationCoordonnateur;
	}

	public String getMotifRejetCourrier() {
		return motifRejetCourrier;
	}

	public void setMotifRejetCourrier(String motifRejetCourrier) {
		this.motifRejetCourrier = motifRejetCourrier;
	}

	public String getMotifRejetAnnotationSg() {
		return motifRejetAnnotationSg;
	}

	public void setMotifRejetAnnotationSg(String motifRejetAnnotationSg) {
		this.motifRejetAnnotationSg = motifRejetAnnotationSg;
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

	public Long getConseillerTechnique() {
		return conseillerTechnique;
	}

	public void setConseillerTechnique(Long conseillerTechnique) {
		this.conseillerTechnique = conseillerTechnique;
	}

	public String getMotifRejetTransfertSg() {
		return motifRejetTransfertSg;
	}

	public void setMotifRejetTransfertSg(String motifRejetTransfertSg) {
		this.motifRejetTransfertSg = motifRejetTransfertSg;
	}

	public String getValidationSg() {
		return validationSg;
	}

	public void setValidationSg(String validationSg) {
		this.validationSg = validationSg;
	}

	public String getPreparationConseiller() {
		return preparationConseiller;
	}

	public void setPreparationConseiller(String preparationConseiller) {
		this.preparationConseiller = preparationConseiller;
	}

	public String getConsultationPm() {
		return consultationPm;
	}

	public void setConsultationPm(String consultationPm) {
		this.consultationPm = consultationPm;
	}

	public String getRejetAnnotationSg() {
		return rejetAnnotationSg;
	}

	public void setRejetAnnotationSg(String rejetAnnotationSg) {
		this.rejetAnnotationSg = rejetAnnotationSg;
	}

	public String getRejetValidationSg() {
		return rejetValidationSg;
	}

	public void setRejetValidationSg(String rejetValidationSg) {
		this.rejetValidationSg = rejetValidationSg;
	}

	public String getRejetPreparationConseiller() {
		return rejetPreparationConseiller;
	}

	public void setRejetPreparationConseiller(String rejetPreparationConseiller) {
		this.rejetPreparationConseiller = rejetPreparationConseiller;
	}

	public String getRejetTransfertSg() {
		return rejetTransfertSg;
	}

	public void setRejetTransfertSg(String rejetTransfertSg) {
		this.rejetTransfertSg = rejetTransfertSg;
	}

	public String getMotifRejetVerificationCoordonnateur() {
		return motifRejetVerificationCoordonnateur;
	}

	public void setMotifRejetVerificationCoordonnateur(String motifRejetVerificationCoordonnateur) {
		this.motifRejetVerificationCoordonnateur = motifRejetVerificationCoordonnateur;
	}

	public String getMotifRejetValidationSg() {
		return motifRejetValidationSg;
	}

	public void setMotifRejetValidationSg(String motifRejetValidationSg) {
		this.motifRejetValidationSg = motifRejetValidationSg;
	}

	public String getMotifRejetPreparationConseiller() {
		return motifRejetPreparationConseiller;
	}

	public void setMotifRejetPreparationConseiller(String motifRejetPreparationConseiller) {
		this.motifRejetPreparationConseiller = motifRejetPreparationConseiller;
	}

	public String getMotifRejetConsultationPm() {
		return motifRejetConsultationPm;
	}

	public void setMotifRejetConsultationPm(String motifRejetConsultationPm) {
		this.motifRejetConsultationPm = motifRejetConsultationPm;
	}

}
