package ma.brainit.aman.client.model;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "V_CORRESPONDANCE_DIRCAB")
public class CorrespondanceDircab {
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
    
    @Column(name = "Traitement_DIRCAB", columnDefinition = "NVARCHAR")
    private String traitementDircab;
    
    @Column(name = "Annotation_PM", columnDefinition = "NVARCHAR")
    private String annotationPm;
    
    @Column(name = "Annotation_DIRCAB", columnDefinition = "NVARCHAR")
    private String annotationDircab;
    
    @Column(name = "Traitement_Coordonnateur", columnDefinition = "NVARCHAR")
    private String traitementCoordonnateur;
    
    @Column(name = "Signature_DIRCAB", columnDefinition = "NVARCHAR")
    private String signatureDircab;
    
    @Column(name = "Rejet_Initiation", columnDefinition = "NVARCHAR")
    private String rejetInitiation;
    
    @Column(name = "Rejet_Réception_du_courrier", columnDefinition = "NVARCHAR")
    private String rejetReceptionCourrier;
    
    @Column(name = "Rejet_Traitement_DIRCAB", columnDefinition = "NVARCHAR")
    private String rejetTraitementDircab;
    
    @Column(name = "Rejet_Annotation_PM", columnDefinition = "NVARCHAR")
    private String rejetAnnotationPm;
    
    @Column(name = "Rejet_Traitement_Coordonnateur", columnDefinition = "NVARCHAR")
    private String rejetTraitementCoordonnateur;
    
    @Column(name = "Envoi_du_courrier", columnDefinition = "NVARCHAR")
    private String envoiCourrier;
    
    @Column(name = "Motif_Rejet_Courrier", columnDefinition = "NVARCHAR")
    private String motifRejetCourrier;
    
    @Column(name = "Motif_Rejet_Traitement_DIRCAB", columnDefinition = "NVARCHAR")
    private String motifRejetTraitementDircab;
    
    @Column(name = "Motif_Rejet_Annotation_PM", columnDefinition = "NVARCHAR")
    private String motifRejetAnnotationPm;
    
    @Column(name = "Motif_Rejet_Annotation_DIRCAB", columnDefinition = "NVARCHAR")
    private String motifRejetAnnotationDircab;
    
    @Column(name = "Motif_Rejet_Signature_DIRCAB", columnDefinition = "NVARCHAR")
    private String motifRejetSignatureDircab;
    
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

	public String getRejetAnnotationPm() {
		return rejetAnnotationPm;
	}

	public void setRejetAnnotationPm(String rejetAnnotationPm) {
		this.rejetAnnotationPm = rejetAnnotationPm;
	}

	public String getRejetTraitementCoordonnateur() {
		return rejetTraitementCoordonnateur;
	}

	public void setRejetTraitementCoordonnateur(String rejetTraitementCoordonnateur) {
		this.rejetTraitementCoordonnateur = rejetTraitementCoordonnateur;
	}

	public String getMotifRejetAnnotationPm() {
		return motifRejetAnnotationPm;
	}

	public void setMotifRejetAnnotationPm(String motifRejetAnnotationPm) {
		this.motifRejetAnnotationPm = motifRejetAnnotationPm;
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

	public String getEnvoiCourrier() {
		return envoiCourrier;
	}

	public void setEnvoiCourrier(String envoiCourrier) {
		this.envoiCourrier = envoiCourrier;
	}

	public String getTraitementDircab() {
		return traitementDircab;
	}

	public void setTraitementDircab(String traitementDircab) {
		this.traitementDircab = traitementDircab;
	}

	public String getAnnotationDircab() {
		return annotationDircab;
	}

	public void setAnnotationDircab(String annotationDircab) {
		this.annotationDircab = annotationDircab;
	}

	public String getTraitementCoordonnateur() {
		return traitementCoordonnateur;
	}

	public void setTraitementCoordonnateur(String traitementCoordonnateur) {
		this.traitementCoordonnateur = traitementCoordonnateur;
	}

	public String getSignatureDircab() {
		return signatureDircab;
	}

	public void setSignatureDircab(String signatureDircab) {
		this.signatureDircab = signatureDircab;
	}

	public String getRejetTraitementDircab() {
		return rejetTraitementDircab;
	}

	public void setRejetTraitementDircab(String rejetTraitementDircab) {
		this.rejetTraitementDircab = rejetTraitementDircab;
	}

	public String getMotifRejetTraitementDircab() {
		return motifRejetTraitementDircab;
	}

	public void setMotifRejetTraitementDircab(String motifRejetTraitementDircab) {
		this.motifRejetTraitementDircab = motifRejetTraitementDircab;
	}

	public String getMotifRejetAnnotationDircab() {
		return motifRejetAnnotationDircab;
	}

	public void setMotifRejetAnnotationDircab(String motifRejetAnnotationDircab) {
		this.motifRejetAnnotationDircab = motifRejetAnnotationDircab;
	}

	public String getMotifRejetSignatureDircab() {
		return motifRejetSignatureDircab;
	}

	public void setMotifRejetSignatureDircab(String motifRejetSignatureDircab) {
		this.motifRejetSignatureDircab = motifRejetSignatureDircab;
	}

}
