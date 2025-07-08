# Système d'Inscription des Utilisateurs Externes - GED Primature

## Vue d'ensemble

Ce module permet aux parties prenantes extérieures (ministères, établissements publics, etc.) de demander un accès au système GED de la Primature. Le processus comprend une demande d'inscription, une validation par l'administrateur, et l'envoi automatique d'emails de notification.

## Fonctionnalités

### Pour les Utilisateurs Externes
- **Formulaire d'inscription en 3 étapes** :
  1. Informations personnelles (nom, prénom, fonction, email, téléphone)
  2. Informations institutionnelles (type d'institution, nom, adresse, ville)
  3. Motif de la demande d'accès

- **Processus automatisé** :
  - Validation des données en temps réel
  - Vérification de l'unicité de l'email
  - Confirmation de soumission

### Pour les Administrateurs
- **Tableau de bord de gestion** avec statistiques :
  - Nombre de demandes en attente
  - Nombre de demandes acceptées
  - Nombre de demandes rejetées
  - Total des demandes

- **Gestion des demandes** :
  - Visualisation détaillée de chaque demande
  - Acceptation avec génération automatique de login/mot de passe
  - Rejet avec motif obligatoire
  - Envoi automatique d'emails de notification

## Architecture Technique

### Entités
- `ExternalUserRegistration` : Entité principale pour les demandes d'inscription
- `ExternalUserRegistrationDTO` : DTO pour l'affichage et la manipulation
- `ExternalUserRegistrationDao` : Couche d'accès aux données
- `ExternalUserRegistrationService` : Logique métier
- `ExternalUserRegistrationController` : Contrôleur REST

### Base de Données
- Table `EXTERNAL_USER_REGISTRATION` avec contraintes et index
- Statuts : EN_ATTENTE, ACCEPTEE, REJETEE
- Types d'institution : MINISTERE, ETABLISSEMENT_PUBLIC, AUTRE

### Intégration
- Utilise la structure existante des utilisateurs (`SecUtilisateur`)
- Profil spécial pour les utilisateurs externes (ID 5 par défaut)
- Module "EXTERNE" pour identifier les utilisateurs externes

## Installation et Configuration

### 1. Création de la Table
Exécuter le script SQL :
```sql
-- Voir le fichier : src/main/resources/sql/create_external_user_registration_table.sql
```

### 2. Configuration du Profil Externe
Vérifier que le profil utilisateur externe existe dans la table `SEC_PROFILE` :
```sql
-- Si nécessaire, créer le profil externe
INSERT INTO SEC_PROFILE (ID, INTITULE, MODULE) VALUES (5, 'Utilisateur Externe', 'EXTERNE');
```

### 3. Configuration Email
Vérifier que le service d'email est configuré dans `application-dev.properties` :
```properties
# Configuration email (déjà présente dans votre projet)
```

## Utilisation

### Accès Public
- **URL** : `http://localhost:8686/primature/inscription-externe`
- **Page d'accueil** : `http://localhost:8686/primature/` (avec lien vers l'inscription)

### Accès Administration
- **URL** : `http://localhost:8686/primature/external-registration/admin`
- **Menu** : Administration > Inscriptions Externes

## Workflow

### 1. Demande d'Inscription
1. L'utilisateur externe accède au formulaire d'inscription
2. Remplit les informations en 3 étapes
3. Soumet la demande
4. Reçoit une confirmation de soumission

### 2. Traitement Administratif
1. L'administrateur consulte la liste des demandes
2. Examine les détails de chaque demande
3. Accepte ou rejette la demande
4. En cas d'acceptation :
   - Génération automatique du login (prénom.nom)
   - Génération d'un mot de passe temporaire
   - Création de l'utilisateur dans le système
   - Envoi d'email avec les identifiants

### 3. Notification Email
- **Acceptation** : Email avec login et mot de passe temporaire
- **Rejet** : Email avec motif du rejet

## Sécurité

### Contrôles
- Validation des données côté client et serveur
- Vérification de l'unicité de l'email
- Authentification requise pour l'administration
- Logs des actions d'administration

### Restrictions
- Les utilisateurs externes ont un profil limité
- Accès restreint aux fonctionnalités sensibles
- Changement de mot de passe obligatoire à la première connexion

## Personnalisation

### Modification du Profil Externe
Dans `ExternalUserRegistrationServiceImpl.java`, ligne 108 :
```java
SecProfile profileExterne = secProfileDao.findOne(5L); // Ajuster l'ID selon votre configuration
```

### Modification des Templates Email
Dans `ExternalUserRegistrationServiceImpl.java`, méthodes :
- `sendAcceptanceEmail()`
- `sendRejectionEmail()`

### Ajout de Types d'Institution
1. Modifier l'enum dans `ExternalUserRegistration.java`
2. Mettre à jour la contrainte SQL
3. Modifier le formulaire d'inscription

## Maintenance

### Logs
Les actions importantes sont loggées :
- Erreurs d'envoi d'email
- Création d'utilisateurs
- Actions d'administration

### Nettoyage
- Les demandes rejetées peuvent être conservées pour audit
- Les mots de passe temporaires sont stockés pour référence

## Support

Pour toute question ou problème :
1. Vérifier les logs de l'application
2. Contrôler la configuration email
3. Vérifier les permissions de base de données
4. Consulter la documentation technique

## Évolutions Futures

- Interface de gestion des profils externes
- Workflow d'approbation multi-niveaux
- Intégration avec l'annuaire LDAP
- Notifications push
- Statistiques avancées 