package ma.brainit.aman.administration.dto;

import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import ma.brainit.base.annotations.View;
import ma.brainit.aman.administration.model.ExternalUserRegistration;
import ma.brainit.aman.commun.dto.JsonDateDeserializer;
import ma.brainit.aman.commun.dto.JsonDateSerializer;

public class ExternalUserRegistrationDTO extends ExternalUserRegistration {

    private static final long serialVersionUID = 1L;

    @Override
    @View(attribut = "id")
    public Long getId() {
        return super.getId();
    }

    @Override
    @View(attribut = "nom")
    public String getNom() {
        return super.getNom();
    }

    @Override
    @View(attribut = "prenom")
    public String getPrenom() {
        return super.getPrenom();
    }

    @Override
    @View(attribut = "fonction")
    public String getFonction() {
        return super.getFonction();
    }

    @Override
    @View(attribut = "email")
    public String getEmail() {
        return super.getEmail();
    }

    @Override
    @View(attribut = "telephone")
    public String getTelephone() {
        return super.getTelephone();
    }

    @Override
    @View(attribut = "institution")
    public String getInstitution() {
        return super.getInstitution();
    }

    @Override
    @View(attribut = "typeInstitution")
    public String getTypeInstitution() {
        return super.getTypeInstitution();
    }

    @Override
    @View(attribut = "adresse")
    public String getAdresse() {
        return super.getAdresse();
    }

    @Override
    @View(attribut = "ville")
    public String getVille() {
        return super.getVille();
    }

    @Override
    @View(attribut = "motifDemande")
    public String getMotifDemande() {
        return super.getMotifDemande();
    }

    @Override
    @View(attribut = "statut")
    public RegistrationStatus getStatut() {
        return super.getStatut();
    }

    @Override
    @JsonSerialize(using = JsonDateSerializer.class)
    @JsonDeserialize(using = JsonDateDeserializer.class)
    @View(attribut = "dateDemande")
    public Date getDateDemande() {
        return super.getDateDemande();
    }

    @Override
    @JsonSerialize(using = JsonDateSerializer.class)
    @JsonDeserialize(using = JsonDateDeserializer.class)
    @View(attribut = "dateTraitement")
    public Date getDateTraitement() {
        return super.getDateTraitement();
    }

    @Override
    @View(attribut = "motifRejet")
    public String getMotifRejet() {
        return super.getMotifRejet();
    }

    @Override
    @View(attribut = "loginGenerated")
    public String getLoginGenerated() {
        return super.getLoginGenerated();
    }

    @Override
    @View(attribut = "passwordTemporaire")
    public String getPasswordTemporaire() {
        return super.getPasswordTemporaire();
    }

    @Override
    @View(attribut = "utilisateurId")
    public Long getUtilisateurId() {
        return super.getUtilisateurId();
    }

    @Override
    @View(attribut = "traitePar")
    public String getTraitePar() {
        return super.getTraitePar();
    }

    // Méthodes utilitaires pour l'affichage
    public String getNomComplet() {
        return getPrenom() + " " + getNom();
    }

    public String getStatutLibelle() {
        return getStatut() != null ? getStatut().getLibelle() : "";
    }

    public String getTypeInstitutionLibelle() {
        if (getTypeInstitution() == null) return "";
        switch (getTypeInstitution()) {
            case "MINISTERE":
                return "Ministère";
            case "ETABLISSEMENT_PUBLIC":
                return "Établissement Public";
            case "AUTRE":
                return "Autre";
            default:
                return getTypeInstitution();
        }
    }
} 