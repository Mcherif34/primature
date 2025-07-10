# 📋 Système de Traitement des Inscriptions Externes - GED Primature

## 🎯 Vue d'ensemble

Ce document détaille le processus complet de gestion des inscriptions d'utilisateurs externes dans le système GED de la Primature, incluant la soumission, le traitement, l'envoi d'emails, et la gestion des connexions.

---

## 📁 Structure des Fichiers

### 🎯 **1. Contrôleurs (Controllers)**

#### **ExternalUserRegistrationController.java**
- **Chemin :** `src/main/java/ma/brainit/aman/administration/actions/ExternalUserRegistrationController.java`
- **Routes principales :** `/external-registration/**`
- **Fonctionnalités :**
  - `POST /external-registration/rest/submit` - Soumission d'une demande
  - `POST /external-registration/rest/accept/{id}` - Accepter une demande
  - `POST /external-registration/rest/reject/{id}` - Rejeter une demande
  - `GET /external-registration/rest/getAll` - Liste toutes les demandes
  - `GET /external-registration/rest/getPending` - Demandes en attente
  - `GET /external-registration/rest/checkEmail` - Vérifier email existant

#### **ExternalRegistrationAdminController.java**
- **Chemin :** `src/main/java/ma/brainit/aman/administration/actions/ExternalRegistrationAdminController.java`
- **Routes admin :** `/administration/external-registrations/**`
- **Interface d'administration pour gérer les demandes**

#### **PublicController.java**
- **Chemin :** `src/main/java/ma/brainit/aman/commun/actions/PublicController.java`
- **Route :** `/inscription-externe` (GET)
- **Fonction :** Affiche la page d'inscription publique

### 🗄️ **2. Modèle de données (Model)**

#### **ExternalUserRegistration.java**
- **Chemin :** `src/main/java/ma/brainit/aman/administration/model/ExternalUserRegistration.java`
- **Table :** `EXTERNAL_USER_REGISTRATION`
- **Champs principaux :**
  ```java
  - id, nom, prenom, fonction, email, telephone
  - institution, typeInstitution, adresse, ville
  - motifDemande, statut (EN_ATTENTE/ACCEPTEE/REJETEE)
  - dateDemande, dateTraitement, motifRejet
  - loginGenerated, passwordTemporaire, utilisateurId
  - traitePar (login admin)
  ```

### 🔧 **3. Services (Services)**

#### **ExternalUserRegistrationServiceImpl.java**
- **Chemin :** `src/main/java/ma/brainit/aman/administration/service/impl/ExternalUserRegistrationServiceImpl.java`
- **Méthodes principales :**
  - `acceptRegistration()` - Accepte et crée l'utilisateur
  - `rejectRegistration()` - Rejette avec motif
  - `sendAcceptanceEmail()` - Envoie email d'acceptation
  - `sendRejectionEmail()` - Envoie email de rejet
  - `generateLogin()` - Génère login unique

#### **EmailServiceImpl.java**
- **Chemin :** `src/main/java/ma/brainit/aman/commun/service/impl/EmailServiceImpl.java`
- **Configuration SMTP avec CC automatique**
- **Templates HTML pour les emails**

### 🗃️ **4. DAO et DTO**

#### **ExternalUserRegistrationDao.java**
- **Chemin :** `src/main/java/ma/brainit/aman/administration/dao/ExternalUserRegistrationDao.java`
- **Méthodes :** `findByEmail()`, `findByStatut()`, `findPendingRegistrations()`

#### **ExternalUserRegistrationDTO.java**
- **Chemin :** `src/main/java/ma/brainit/aman/administration/dto/ExternalUserRegistrationDTO.java`
- **Objet de transfert pour l'API**

### 🌐 **5. Interface utilisateur**

#### **inscription.html**
- **Chemin :** `src/main/webapp/WEB-INF/views/external/inscription.html`
- **Formulaire multi-étapes avec validation AngularJS**

---

## 🔄 Flux de Traitement Complet

### **1. Soumission d'une demande**

```
Utilisateur → inscription.html → ExternalUserRegistrationController.submitRegistration()
↓
ExternalUserRegistrationServiceImpl.save()
↓
ExternalUserRegistrationDao.save() → Base de données
↓
Réponse JSON : {success: true, message: "Demande soumise"}
```

### **2. Traitement par l'administrateur**

#### **Acceptation :**
```
Admin → ExternalRegistrationAdminController.acceptRegistration()
↓
ExternalUserRegistrationServiceImpl.acceptRegistration()
↓
1. Vérification statut EN_ATTENTE
2. Génération login unique (generateLogin())
3. Génération mot de passe temporaire
4. Création utilisateur (SecUtilisateurDTO)
5. Assignation profil externe (ID 5)
6. Mise à jour demande (statut ACCEPTEE)
7. Envoi email asynchrone (sendAcceptanceEmail())
```

#### **Rejet :**
```
Admin → ExternalRegistrationAdminController.rejectRegistration()
↓
ExternalUserRegistrationServiceImpl.rejectRegistration()
↓
1. Vérification statut EN_ATTENTE
2. Mise à jour demande (statut REJETEE + motif)
3. Envoi email asynchrone (sendRejectionEmail())
```

### **3. Envoi d'emails**

#### **Email d'acceptation :**
```java
// Template HTML avec :
- Identifiants de connexion (login + mot de passe temporaire)
- URL de connexion : http://localhost:8686/primature/
- Instructions de changement de mot de passe
- Logo et style institutionnel
```

#### **Email de rejet :**
```java
// Template HTML avec :
- Motif du rejet
- Possibilité de contacter l'équipe
- Logo et style institutionnel
```

---

## 🔐 Gestion des Connexions et Redirections

### **1. Détection du type d'utilisateur**

#### **SecUtilisateur.java**
- **Champ :** `module` (INTERNE/EXTERNE)
- **Profil :** `secProfile` (ID 5 pour externes)

#### **SpringSecurityConfig.java**
- **Routes publiques :** `/inscription-externe`, `/external-registration/**`
- **Routes admin :** `/administration/external-registrations/**`

### **2. Redirection après connexion**

#### **LoginController.java**
```java
// Après authentification réussie :
if (user.getModule().equals("EXTERNE")) {
    return "redirect:/external/dashboard";  // Dashboard externe
} else {
    return "redirect:/administration/dashboard";  // Dashboard interne
}
```

#### **ExternalDashboardController.java**
- **Route :** `/external/dashboard`
- **Vue :** `external/dashboard.html`
- **Fonctionnalités :** Widgets spécifiques aux utilisateurs externes

---

## 📧 Configuration Email

### **application.properties**
```properties
# Configuration SMTP
mail.username=...
mail.login=...
mail.hotline=...
mail.central01=...
mail.central02=...
mail.central03=...

# Serveur SMTP
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=...
spring.mail.password=...
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

### **EmailServiceImpl.java**
```java
// Envoi avec CC automatique vers :
- mailHotline
- mailCentral01
- mailCentral02
- mailCentral03
```

---

## 🗄️ Base de Données

### **Table EXTERNAL_USER_REGISTRATION**
```sql
CREATE TABLE EXTERNAL_USER_REGISTRATION (
    ID BIGINT PRIMARY KEY AUTO_INCREMENT,
    NOM NVARCHAR NOT NULL,
    PRENOM NVARCHAR NOT NULL,
    FONCTION NVARCHAR NOT NULL,
    EMAIL NVARCHAR NOT NULL UNIQUE,
    TELEPHONE NVARCHAR,
    INSTITUTION NVARCHAR NOT NULL,
    TYPE_INSTITUTION NVARCHAR NOT NULL,
    ADRESSE NVARCHAR,
    VILLE NVARCHAR,
    MOTIF_DEMANDE NVARCHAR(1000),
    STATUT VARCHAR(20) DEFAULT 'EN_ATTENTE',
    DATE_DEMANDE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DATE_TRAITEMENT TIMESTAMP,
    MOTIF_REJET NVARCHAR(1000),
    LOGIN_GENERATED NVARCHAR,
    PASSWORD_TEMPORAIRE NVARCHAR,
    UTILISATEUR_ID BIGINT,
    TRAITE_PAR NVARCHAR
);
```

### **Table SEC_UTILISATEUR**
```sql
-- Champ module pour différencier INTERNE/EXTERNE
-- Champ secProfile pour le profil (ID 5 = externe)
```

---

## 🔄 Workflow Complet

### **Phase 1 : Inscription**
1. Utilisateur accède à `/inscription-externe`
2. Remplit le formulaire multi-étapes
3. Validation côté client (AngularJS)
4. Soumission via AJAX vers `/external-registration/rest/submit`
5. Sauvegarde en base avec statut `EN_ATTENTE`
6. Confirmation à l'utilisateur

### **Phase 2 : Traitement Admin**
1. Admin accède à `/administration/external-registrations`
2. Consulte la liste des demandes en attente
3. Pour chaque demande :
   - **Acceptation :** Création utilisateur + email
   - **Rejet :** Motif + email

### **Phase 3 : Connexion Utilisateur**
1. Utilisateur se connecte avec login/mot de passe
2. Système détecte le type (module INTERNE/EXTERNE)
3. Redirection vers le bon dashboard :
   - **Externe :** `/external/dashboard`
   - **Interne :** `/administration/dashboard`

---

## 🛠️ Points Techniques

### **Génération de Login**
```java
private String generateLogin(ExternalUserRegistration registration) {
    String baseLogin = registration.getPrenom().toLowerCase() + "." + registration.getNom().toLowerCase();
    baseLogin = baseLogin.replaceAll("[^a-zA-Z0-9.]", "");
    
    String login = baseLogin;
    int counter = 1;
    
    while (secUtilisateurService.findByLogin(login) != null) {
        login = baseLogin + counter;
        counter++;
    }
    
    return login;
}
```

### **Envoi Email Asynchrone**
```java
// Pour éviter le rollback en cas d'erreur email
new Thread(() -> {
    try {
        sendAcceptanceEmail(finalDto);
    } catch (Exception e) {
        logger.error("Erreur email (non bloquant) : " + e.getMessage(), e);
    }
}).start();
```

### **Sécurité**
- Routes publiques pour inscription
- Routes admin protégées
- Validation des statuts avant traitement
- Logs complets des actions

---

## 📊 Monitoring et Logs

### **Logs importants :**
- Soumission de demandes
- Traitement admin (acceptation/rejet)
- Envoi d'emails (succès/erreur)
- Création d'utilisateurs
- Connexions et redirections

### **Métriques :**
- Nombre de demandes en attente
- Taux d'acceptation/rejet
- Temps de traitement moyen
- Erreurs d'envoi d'emails

---

## 🔧 Maintenance

### **Nettoyage périodique :**
- Demandes rejetées anciennes
- Logs d'emails
- Utilisateurs inactifs

### **Sauvegarde :**
- Table EXTERNAL_USER_REGISTRATION
- Configuration email
- Templates d'emails

---

## 📞 Support

En cas de problème :
1. Vérifier les logs d'application
2. Contrôler la configuration SMTP
3. Vérifier les permissions base de données
4. Tester l'envoi d'emails

---

*Document créé le : 10/07/2025*
*Version : 1.0*
*Système : GED Primature - Inscriptions Externes* 