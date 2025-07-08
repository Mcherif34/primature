package ma.brainit.aman.client.model;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "V_COURRIER_FACTURE")
public class CourrierFacture {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Réf_Arrivée_BOC", columnDefinition = "NVARCHAR")
    private String refArriveeBoc;
    
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

    @Column(name = "Réf_Expéditeur", columnDefinition = "NVARCHAR")
    private String refExpediteur;

    @Column(name = "Reçu_par")
    private Long recuPar;
    
    @Column(name = "Expéditeur", columnDefinition = "NVARCHAR")
    private String expediteur;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Date_Heure_Réception", columnDefinition = "DATETIME")
	private Date dateReception;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Date_Heure_Enregistrement", columnDefinition = "DATETIME")
	private Date dateEnregistrement;
    
    @Column(name = "Type_courrier", columnDefinition = "NVARCHAR")
    private String typeCourrier;
    
    @Column(name = "Objet", columnDefinition = "NVARCHAR")
    private String objet;
    
    @Column(name = "Num_BC_Contrat", columnDefinition = "NVARCHAR")
    private String numBcContrat;
    
    @Column(name = "Num_Facture", columnDefinition = "NVARCHAR")
    private String numFacture;
    
    @Column(name = "Montant_Facture__en_Dhs_", columnDefinition = "NUMERIC(28,14)")
	private Double montantFacture;
    
    @Column(name = "Elément_de_facturation", columnDefinition = "NVARCHAR")
    private String elementFacturation;
    
    @Column(name = "Nombre_de_pièces_jointes", columnDefinition = "NVARCHAR")
    private String nombrePj;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Date_de_facture", columnDefinition = "DATETIME")
	private Date dateFacture;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Date_de_décompte", columnDefinition = "DATETIME")
	private Date dateDecompte;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Date_bon_de_réception", columnDefinition = "DATETIME")
	private Date dateBonReception;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Date_validation", columnDefinition = "DATETIME")
	private Date dateValidation;
    
    @Column(name = "Délai_paiement")
    private Long delaiPaiement;
    
    @Column(name = "Fin_du_mois")
    private Integer finMois;
    
    @Column(name = "Rejet_CC")
    private Integer rejetCc;
    
    @Column(name = "Motif_Rejet_CC", columnDefinition = "NVARCHAR")
    private String motifRejetCc;
    
    @Column(name = "Rejet_RC")
    private Integer rejetRc;
    
    @Column(name = "Motif_Rejet_RC", columnDefinition = "NVARCHAR")
    private String motifRejetRc;
    
    @Column(name = "Validation_CC")
    private Integer validationCc;
    
    @Column(name = "Motif_Validation_CC", columnDefinition = "NVARCHAR")
    private String motifValidationCc;
    
    @Column(name = "Numéro_de_décompte", columnDefinition = "NVARCHAR")
    private String numDecompte;
    
    @Column(name = "Devise", columnDefinition = "NVARCHAR")
    private String devise;
    
    @Column(name = "Forme_juridique", columnDefinition = "NVARCHAR")
    private String formeJuridique;
    
    @Column(name = "Attestation_de_régularité", columnDefinition = "NVARCHAR")
    private String attestationRegularite;
    
    @Temporal(TemporalType.DATE)
	@Column(name = "Date_prévis_de_paiement", columnDefinition = "DATETIME")
	private Date datePrevisPaiement;
    
    @Column(name = "Nature", columnDefinition = "NVARCHAR")
    private String nature;
    
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

	public String getRefExpediteur() {
		return refExpediteur;
	}

	public void setRefExpediteur(String refExpediteur) {
		this.refExpediteur = refExpediteur;
	}

	public Long getRecuPar() {
		return recuPar;
	}

	public void setRecuPar(Long recuPar) {
		this.recuPar = recuPar;
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

	public String getTypeCourrier() {
		return typeCourrier;
	}

	public void setTypeCourrier(String typeCourrier) {
		this.typeCourrier = typeCourrier;
	}

	public String getObjet() {
		return objet;
	}

	public void setObjet(String objet) {
		this.objet = objet;
	}

	public String getRefArriveeBoc() {
		return refArriveeBoc;
	}

	public void setRefArriveeBoc(String refArriveeBoc) {
		this.refArriveeBoc = refArriveeBoc;
	}

	public String getNumBcContrat() {
		return numBcContrat;
	}

	public void setNumBcContrat(String numBcContrat) {
		this.numBcContrat = numBcContrat;
	}

	public String getNumFacture() {
		return numFacture;
	}

	public void setNumFacture(String numFacture) {
		this.numFacture = numFacture;
	}

	public Double getMontantFacture() {
		return montantFacture;
	}

	public void setMontantFacture(Double montantFacture) {
		this.montantFacture = montantFacture;
	}

	public String getElementFacturation() {
		return elementFacturation;
	}

	public void setElementFacturation(String elementFacturation) {
		this.elementFacturation = elementFacturation;
	}

	public String getNombrePj() {
		return nombrePj;
	}

	public void setNombrePj(String nombrePj) {
		this.nombrePj = nombrePj;
	}

	public Date getDateFacture() {
		return dateFacture;
	}

	public void setDateFacture(Date dateFacture) {
		this.dateFacture = dateFacture;
	}

	public Date getDateDecompte() {
		return dateDecompte;
	}

	public void setDateDecompte(Date dateDecompte) {
		this.dateDecompte = dateDecompte;
	}

	public Date getDateBonReception() {
		return dateBonReception;
	}

	public void setDateBonReception(Date dateBonReception) {
		this.dateBonReception = dateBonReception;
	}

	public Date getDateValidation() {
		return dateValidation;
	}

	public void setDateValidation(Date dateValidation) {
		this.dateValidation = dateValidation;
	}

	public Long getDelaiPaiement() {
		return delaiPaiement;
	}

	public void setDelaiPaiement(Long delaiPaiement) {
		this.delaiPaiement = delaiPaiement;
	}

	public Integer getFinMois() {
		return finMois;
	}

	public void setFinMois(Integer finMois) {
		this.finMois = finMois;
	}

	public Integer getRejetCc() {
		return rejetCc;
	}

	public void setRejetCc(Integer rejetCc) {
		this.rejetCc = rejetCc;
	}

	public String getMotifRejetCc() {
		return motifRejetCc;
	}

	public void setMotifRejetCc(String motifRejetCc) {
		this.motifRejetCc = motifRejetCc;
	}

	public Integer getRejetRc() {
		return rejetRc;
	}

	public void setRejetRc(Integer rejetRc) {
		this.rejetRc = rejetRc;
	}

	public String getMotifRejetRc() {
		return motifRejetRc;
	}

	public void setMotifRejetRc(String motifRejetRc) {
		this.motifRejetRc = motifRejetRc;
	}

	public Integer getValidationCc() {
		return validationCc;
	}

	public void setValidationCc(Integer validationCc) {
		this.validationCc = validationCc;
	}

	public String getMotifValidationCc() {
		return motifValidationCc;
	}

	public void setMotifValidationCc(String motifValidationCc) {
		this.motifValidationCc = motifValidationCc;
	}

	public String getNumDecompte() {
		return numDecompte;
	}

	public void setNumDecompte(String numDecompte) {
		this.numDecompte = numDecompte;
	}

	public String getDevise() {
		return devise;
	}

	public void setDevise(String devise) {
		this.devise = devise;
	}

	public String getFormeJuridique() {
		return formeJuridique;
	}

	public void setFormeJuridique(String formeJuridique) {
		this.formeJuridique = formeJuridique;
	}

	public String getAttestationRegularite() {
		return attestationRegularite;
	}

	public void setAttestationRegularite(String attestationRegularite) {
		this.attestationRegularite = attestationRegularite;
	}

	public Date getDatePrevisPaiement() {
		return datePrevisPaiement;
	}

	public void setDatePrevisPaiement(Date datePrevisPaiement) {
		this.datePrevisPaiement = datePrevisPaiement;
	}

	public String getNature() {
		return nature;
	}

	public void setNature(String nature) {
		this.nature = nature;
	}
    
}
