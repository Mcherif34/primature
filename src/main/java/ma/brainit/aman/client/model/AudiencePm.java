package ma.brainit.aman.client.model;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "V_AUDIENCE_PM")
public class AudiencePm {
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
    
    @Column(name = "Traitement Protocole", columnDefinition = "NVARCHAR")
    private String traitementProtocole;
    
    @Column(name = "Annotation_PM", columnDefinition = "NVARCHAR")
    private String annotationPm;

    @Column(name = "Transfert_SG", columnDefinition = "NVARCHAR")
    private String transfertSg;
    
    @Column(name = "Conseiller_technique")
    private Long conseillerTechnique;

    @Column(name = "Traitement_Conseiller", columnDefinition = "NVARCHAR")
    private String traitementConseiller;

    @Column(name = "Validation_SG", columnDefinition = "NVARCHAR")
    private String validationSg;
    
    @Column(name = "Validation_PM", columnDefinition = "NVARCHAR")
    private String validationPm;
    
    @Column(name = "Transfert_DIRCAB", columnDefinition = "NVARCHAR")
    private String transfertDircab;
    
    @Column(name = "Organisation_Protocole", columnDefinition = "NVARCHAR")
    private String organisationProtocole;
    
    @Column(name = "Couverture_DIRCOM", columnDefinition = "NVARCHAR")
    private String couvertureDircom;
    
    @Column(name = "Organisation_DIRCAB", columnDefinition = "NVARCHAR")
    private String organisationDircab;
    
    @Column(name = "Vérification_Coordonnateur", columnDefinition = "NVARCHAR")
    private String verificationCoordonnateur;
    
    @Column(name = "Transfert_DIRCAB_ADJ", columnDefinition = "NVARCHAR")
    private String transfertDircabAdj;
    
    @Column(name = "Consultation_PM", columnDefinition = "NVARCHAR")
    private String consultationPm;
    
    @Column(name = "Annotation_SG", columnDefinition = "NVARCHAR")
    private String annotationSg;
    
    @Column(name = "Préparation_Conseiller", columnDefinition = "NVARCHAR")
    private String preparationConseiller;
    
    @Column(name = "Instructions", columnDefinition = "NVARCHAR")
    private String instructions;
    
    @Column(name = "Rejet_Initiation", columnDefinition = "NVARCHAR")
    private String rejetInitiation;
    
    @Column(name = "Rejet_Réception_du_courrier", columnDefinition = "NVARCHAR")
    private String rejetReceptionCourrier;
    
    @Column(name = "Rejet_Transfert_SG", columnDefinition = "NVARCHAR")
    private String rejetTransfertSg;
    
    @Column(name = "Rejet_Traitement_Conseiller", columnDefinition = "NVARCHAR")
    private String rejetTraitementConseiller;
    
    @Column(name = "Rejet_Validation_SG", columnDefinition = "NVARCHAR")
    private String rejetValidationSg;
    
    @Column(name = "Rejet_Validation_PM", columnDefinition = "NVARCHAR")
    private String rejetValidationPm;
    
    @Column(name = "Rejet_Transfert_DIRCAB", columnDefinition = "NVARCHAR")
    private String rejetTransfertDircab;
    
    @Column(name = "Rejet_Organisation_Protocole", columnDefinition = "NVARCHAR")
    private String rejetOrganisationProtocole;
    
    @Column(name = "Rejet_Organisation_DIRCAB", columnDefinition = "NVARCHAR")
    private String rejetOrganisationDircab;

    @Column(name = "Rejet_Vérification_Coordonnateur", columnDefinition = "NVARCHAR")
    private String rejetVerificationCoordonnateur;
    
    @Column(name = "Rejet_Transfert_DIRCAB_ADJ", columnDefinition = "NVARCHAR")
    private String rejetTransfertDircabAdj;
    
    @Column(name = "Rejet_Annotation_SG", columnDefinition = "NVARCHAR")
    private String rejetAnnotationSg;
    
    @Column(name = "Rejet_Préparation_Conseiller", columnDefinition = "NVARCHAR")
    private String rejetPreparationConseiller;
    
    @Column(name = "Motif_Rejet_Courrier", columnDefinition = "NVARCHAR")
    private String motifRejetCourrier;

    @Column(name = "Motif_Rejet_Traitement_Protocole", columnDefinition = "NVARCHAR")
    private String motifRejetTraitementProtocole;

    @Column(name = "Motif_Rejet_Traitement_Conseiller", columnDefinition = "NVARCHAR")
    private String motifRejetTraitementConseiller;
    
    @Column(name = "Motif_Rejet_Validation_SG", columnDefinition = "NVARCHAR")
    private String motifRejetValidationSg;
    
    @Column(name = "Motif_Rejet_Validation_PM", columnDefinition = "NVARCHAR")
    private String motifRejetValidationPm;
    
    @Column(name = "Motif_Rejet_Transfert_DIRCAB", columnDefinition = "NVARCHAR")
    private String motifRejetTransfertDircab;
    
    @Column(name = "Motif_Rejet_Organisation_Protocole", columnDefinition = "NVARCHAR")
    private String motifRejetOrganisationProtocole;
    
    @Column(name = "Motif_Rejet_Couverture_DIRCOM", columnDefinition = "NVARCHAR")
    private String motifRejetCouvertureDircom;
    
    @Column(name = "Motif_Rejet_Vérification_Coordonnateur", columnDefinition = "NVARCHAR")
    private String motifRejetVerificationCoordonnateur;
    
    @Column(name = "Motif_Rejet_Transfert_DIRCAB_ADJ", columnDefinition = "NVARCHAR")
    private String motifRejetTransfertDircabAdj;
    
    @Column(name = "Motif_Rejet_Consultation_PM", columnDefinition = "NVARCHAR")
    private String motifRejetConsultationPm;
    
    @Column(name = "Motif_Rejet_Préparation_Conseiller", columnDefinition = "NVARCHAR")
    private String motifRejetPreparationConseiller;
    
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

	public String getAnnotationPm() {
		return annotationPm;
	}

	public void setAnnotationPm(String annotationPm) {
		this.annotationPm = annotationPm;
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
	
	public String getTraitementConseiller() {
		return traitementConseiller;
	}

	public void setTraitementConseiller(String traitementConseiller) {
		this.traitementConseiller = traitementConseiller;
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
	
	public String getMotifRejetTraitementConseiller() {
		return motifRejetTraitementConseiller;
	}

	public void setMotifRejetTraitementConseiller(String motifRejetTraitementConseiller) {
		this.motifRejetTraitementConseiller = motifRejetTraitementConseiller;
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

	public String getTraitementProtocole() {
		return traitementProtocole;
	}

	public void setTraitementProtocole(String traitementProtocole) {
		this.traitementProtocole = traitementProtocole;
	}

	public String getValidationSg() {
		return validationSg;
	}

	public void setValidationSg(String validationSg) {
		this.validationSg = validationSg;
	}

	public String getValidationPm() {
		return validationPm;
	}

	public void setValidationPm(String validationPm) {
		this.validationPm = validationPm;
	}

	public String getTransfertDircab() {
		return transfertDircab;
	}

	public void setTransfertDircab(String transfertDircab) {
		this.transfertDircab = transfertDircab;
	}

	public String getOrganisationProtocole() {
		return organisationProtocole;
	}

	public void setOrganisationProtocole(String organisationProtocole) {
		this.organisationProtocole = organisationProtocole;
	}

	public String getCouvertureDircom() {
		return couvertureDircom;
	}

	public void setCouvertureDircom(String couvertureDircom) {
		this.couvertureDircom = couvertureDircom;
	}

	public String getOrganisationDircab() {
		return organisationDircab;
	}

	public void setOrganisationDircab(String organisationDircab) {
		this.organisationDircab = organisationDircab;
	}

	public String getTransfertDircabAdj() {
		return transfertDircabAdj;
	}

	public void setTransfertDircabAdj(String transfertDircabAdj) {
		this.transfertDircabAdj = transfertDircabAdj;
	}

	public String getConsultationPm() {
		return consultationPm;
	}

	public void setConsultationPm(String consultationPm) {
		this.consultationPm = consultationPm;
	}

	public String getPreparationConseiller() {
		return preparationConseiller;
	}

	public void setPreparationConseiller(String preparationConseiller) {
		this.preparationConseiller = preparationConseiller;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}

	public String getRejetTransfertSg() {
		return rejetTransfertSg;
	}

	public void setRejetTransfertSg(String rejetTransfertSg) {
		this.rejetTransfertSg = rejetTransfertSg;
	}

	public String getRejetTraitementConseiller() {
		return rejetTraitementConseiller;
	}

	public void setRejetTraitementConseiller(String rejetTraitementConseiller) {
		this.rejetTraitementConseiller = rejetTraitementConseiller;
	}

	public String getRejetValidationSg() {
		return rejetValidationSg;
	}

	public void setRejetValidationSg(String rejetValidationSg) {
		this.rejetValidationSg = rejetValidationSg;
	}

	public String getRejetValidationPm() {
		return rejetValidationPm;
	}

	public void setRejetValidationPm(String rejetValidationPm) {
		this.rejetValidationPm = rejetValidationPm;
	}

	public String getRejetTransfertDircab() {
		return rejetTransfertDircab;
	}

	public void setRejetTransfertDircab(String rejetTransfertDircab) {
		this.rejetTransfertDircab = rejetTransfertDircab;
	}

	public String getRejetOrganisationProtocole() {
		return rejetOrganisationProtocole;
	}

	public void setRejetOrganisationProtocole(String rejetOrganisationProtocole) {
		this.rejetOrganisationProtocole = rejetOrganisationProtocole;
	}

	public String getRejetOrganisationDircab() {
		return rejetOrganisationDircab;
	}

	public void setRejetOrganisationDircab(String rejetOrganisationDircab) {
		this.rejetOrganisationDircab = rejetOrganisationDircab;
	}

	public String getRejetTransfertDircabAdj() {
		return rejetTransfertDircabAdj;
	}

	public void setRejetTransfertDircabAdj(String rejetTransfertDircabAdj) {
		this.rejetTransfertDircabAdj = rejetTransfertDircabAdj;
	}

	public String getRejetAnnotationSg() {
		return rejetAnnotationSg;
	}

	public void setRejetAnnotationSg(String rejetAnnotationSg) {
		this.rejetAnnotationSg = rejetAnnotationSg;
	}

	public String getRejetPreparationConseiller() {
		return rejetPreparationConseiller;
	}

	public void setRejetPreparationConseiller(String rejetPreparationConseiller) {
		this.rejetPreparationConseiller = rejetPreparationConseiller;
	}

	public String getMotifRejetTraitementProtocole() {
		return motifRejetTraitementProtocole;
	}

	public void setMotifRejetTraitementProtocole(String motifRejetTraitementProtocole) {
		this.motifRejetTraitementProtocole = motifRejetTraitementProtocole;
	}

	public String getMotifRejetValidationSg() {
		return motifRejetValidationSg;
	}

	public void setMotifRejetValidationSg(String motifRejetValidationSg) {
		this.motifRejetValidationSg = motifRejetValidationSg;
	}

	public String getMotifRejetValidationPm() {
		return motifRejetValidationPm;
	}

	public void setMotifRejetValidationPm(String motifRejetValidationPm) {
		this.motifRejetValidationPm = motifRejetValidationPm;
	}

	public String getMotifRejetTransfertDircab() {
		return motifRejetTransfertDircab;
	}

	public void setMotifRejetTransfertDircab(String motifRejetTransfertDircab) {
		this.motifRejetTransfertDircab = motifRejetTransfertDircab;
	}

	public String getMotifRejetOrganisationProtocole() {
		return motifRejetOrganisationProtocole;
	}

	public void setMotifRejetOrganisationProtocole(String motifRejetOrganisationProtocole) {
		this.motifRejetOrganisationProtocole = motifRejetOrganisationProtocole;
	}

	public String getMotifRejetCouvertureDircom() {
		return motifRejetCouvertureDircom;
	}

	public void setMotifRejetCouvertureDircom(String motifRejetCouvertureDircom) {
		this.motifRejetCouvertureDircom = motifRejetCouvertureDircom;
	}

	public String getMotifRejetVerificationCoordonnateur() {
		return motifRejetVerificationCoordonnateur;
	}

	public void setMotifRejetVerificationCoordonnateur(String motifRejetVerificationCoordonnateur) {
		this.motifRejetVerificationCoordonnateur = motifRejetVerificationCoordonnateur;
	}

	public String getMotifRejetTransfertDircabAdj() {
		return motifRejetTransfertDircabAdj;
	}

	public void setMotifRejetTransfertDircabAdj(String motifRejetTransfertDircabAdj) {
		this.motifRejetTransfertDircabAdj = motifRejetTransfertDircabAdj;
	}

	public String getMotifRejetConsultationPm() {
		return motifRejetConsultationPm;
	}

	public void setMotifRejetConsultationPm(String motifRejetConsultationPm) {
		this.motifRejetConsultationPm = motifRejetConsultationPm;
	}

	public String getMotifRejetPreparationConseiller() {
		return motifRejetPreparationConseiller;
	}

	public void setMotifRejetPreparationConseiller(String motifRejetPreparationConseiller) {
		this.motifRejetPreparationConseiller = motifRejetPreparationConseiller;
	}

}
