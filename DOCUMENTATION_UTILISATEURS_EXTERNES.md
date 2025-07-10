# Documentation - Espace Utilisateur Externe
## GED Primature du Tchad

### Vue d'ensemble
Cette documentation recense tous les fichiers créés et modifiés pour implémenter l'espace utilisateur externe du système GED (Gestion Électronique des Documents) de la Primature du Tchad.

---

## 📋 Table des matières
1. [Base de données](#base-de-données)
2. [Backend - Java](#backend---java)
3. [Frontend - Templates HTML](#frontend---templates-html)
4. [Frontend - JavaScript](#frontend---javascript)
5. [Frontend - CSS](#frontend---css)
6. [Configuration](#configuration)
7. [Sécurité](#sécurité)

---

## 🗄️ Base de données

### Fichiers SQL créés
```
src/main/resources/sql/
├── create_external_user_registration_table.sql
└── update_external_user_registration_table.sql
```

**Description :**
- **create_external_user_registration_table.sql** : Script de création de la table `external_user_registration`
- **update_external_user_registration_table.sql** : Script de mise à jour de la table avec des champs supplémentaires

**Structure de la table :**
```sql
CREATE TABLE external_user_registration (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    institution_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    address TEXT,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    approved_by VARCHAR(255),
    approved_date TIMESTAMP NULL,
    rejection_reason TEXT,
    username VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE
);
```

---

## ⚙️ Backend - Java

### Contrôleurs
```
src/main/java/ma/brainit/aman/external/
├── controller/
│   ├── ExternalRegistrationController.java
│   └── ExternalDashboardController.java
```

**ExternalRegistrationController.java**
- **Fonctionnalités :**
  - Gestion des inscriptions d'utilisateurs externes
  - Validation et approbation des demandes
  - Génération automatique des identifiants
  - Envoi d'emails de confirmation

**ExternalDashboardController.java**
- **Fonctionnalités :**
  - Affichage du tableau de bord externe
  - Gestion des statistiques utilisateur
  - Navigation vers les différentes sections

### Modèles
```
src/main/java/ma/brainit/aman/external/
├── model/
│   ├── ExternalUserRegistration.java
│   ├── ExternalRequest.java
│   └── ExternalNotification.java
```

**ExternalUserRegistration.java**
- **Entité JPA** pour la table `external_user_registration`
- **Annotations :** `@Entity`, `@Table`, `@Column`
- **Relations :** One-to-Many avec les demandes

**ExternalRequest.java**
- **Entité** pour les demandes des utilisateurs externes
- **Types :** Audience, Document, Requête administrative

**ExternalNotification.java**
- **Entité** pour les notifications système

### Services
```
src/main/java/ma/brainit/aman/external/
├── service/
│   ├── ExternalUserRegistrationService.java
│   ├── ExternalRequestService.java
│   └── ExternalNotificationService.java
```

**ExternalUserRegistrationService.java**
- **Méthodes principales :**
  - `registerUser(ExternalUserRegistration registration)`
  - `approveRegistration(Long id, String approvedBy)`
  - `rejectRegistration(Long id, String reason, String rejectedBy)`
  - `generateCredentials(ExternalUserRegistration registration)`
  - `sendConfirmationEmail(ExternalUserRegistration registration)`

**ExternalRequestService.java**
- **Gestion des demandes :**
  - Création, modification, suppression
  - Suivi des statuts
  - Historique des actions

**ExternalNotificationService.java**
- **Gestion des notifications :**
  - Notifications urgentes
  - Alertes système
  - Messages d'information

### DAO (Data Access Object)
```
src/main/java/ma/brainit/aman/external/
├── dao/
│   ├── ExternalUserRegistrationDao.java
│   └── ExternalRequestDao.java
```

**ExternalUserRegistrationDao.java**
- **Méthodes de requête :**
  - `findByEmail(String email)`
  - `findByStatus(String status)`
  - `findPendingRegistrations()`
  - `findByInstitutionName(String institutionName)`

**ExternalRequestDao.java**
- **Requêtes personnalisées :**
  - Recherche par utilisateur
  - Filtrage par statut
  - Statistiques

---

## 🎨 Frontend - Templates HTML

### Layout principal
```
src/main/webapp/WEB-INF/views/external/
├── external-layout.html
```

**external-layout.html**
- **Structure :**
  - Header avec navigation
  - Sidebar avec menu complet
  - Footer
  - Intégration des ressources CSS/JS
- **Menu sidebar :**
  - Tableau de bord
  - Demandes (avec sous-menus)
  - Audiences/Requêtes
  - Documents
  - Messagerie
  - Profil et paramètres

### Pages principales
```
src/main/webapp/WEB-INF/views/external/
├── dashboard.html
├── registration.html
├── profile.html
├── change-password.html
└── help.html
```

**dashboard.html**
- **Widgets principaux :**
  - En-tête de bienvenue
  - Statistiques des demandes
  - Actions rapides
  - Calendrier des événements
  - Documents récents
  - Activité récente
  - Contacts fréquents
  - Indicateurs de performance

**registration.html**
- **Formulaire d'inscription :**
  - Informations institution
  - Coordonnées du contact
  - Validation côté client
  - Messages d'erreur/succès

**profile.html**
- **Gestion du profil :**
  - Informations personnelles
  - Paramètres de compte
  - Historique des connexions

**change-password.html**
- **Changement de mot de passe :**
  - Validation de l'ancien mot de passe
  - Nouveau mot de passe avec confirmation
  - Règles de sécurité

**help.html**
- **Guide d'utilisation :**
  - FAQ
  - Tutoriels
  - Contact support

---

## 📜 Frontend - JavaScript

### Contrôleurs AngularJS
```
src/main/webapp/resources/static/js/pages/
├── external-dashboard.js
├── external-registration.js
├── external-profile.js
├── external-change-password.js
└── external-help.js
```

**external-dashboard.js**
- **Contrôleur principal :** `externalDashboardController`
- **Fonctionnalités :**
  - Chargement des données du dashboard
  - Gestion des statistiques
  - Actions rapides
  - Navigation entre sections
  - Gestion des modales

**external-registration.js**
- **Contrôleur :** `externalRegistrationController`
- **Fonctionnalités :**
  - Validation du formulaire
  - Soumission des données
  - Gestion des erreurs
  - Messages de confirmation

**external-profile.js**
- **Gestion du profil utilisateur :**
  - Modification des informations
  - Upload d'avatar
  - Préférences utilisateur

**external-change-password.js**
- **Sécurité :**
  - Validation du mot de passe actuel
  - Règles de complexité
  - Confirmation du nouveau mot de passe

**external-help.js**
- **Support utilisateur :**
  - Recherche dans la FAQ
  - Ouverture de tickets
  - Chat support

### Fichier d'index principal
```
src/main/webapp/resources/static/js/pages/
└── index.js
```

**index.js**
- **Point d'entrée** pour tous les contrôleurs
- **Configuration AngularJS**
- **Services partagés**
- **Filtres personnalisés**

---

## 🎨 Frontend - CSS

### Styles personnalisés
```
src/main/webapp/resources/static/css/
├── external-dashboard.css
├── external-registration.css
└── external-common.css
```

**external-dashboard.css**
- **Styles pour le dashboard :**
  - Widgets de statistiques
  - Cartes d'actions rapides
  - Calendrier des événements
  - Tableaux d'activité
  - Responsive design

**external-registration.css**
- **Styles pour l'inscription :**
  - Formulaire élégant
  - Validation visuelle
  - Messages d'erreur/succès
  - Animations

**external-common.css**
- **Styles partagés :**
  - Layout externe
  - Composants communs
  - Variables CSS
  - Utilitaires

---

## ⚙️ Configuration

### Fichiers de configuration
```
src/main/resources/
├── application.properties
└── application-dev.properties
```

**application.properties**
- **Configuration générale :**
  - Paramètres de base de données
  - Configuration email
  - Paramètres de sécurité
  - URLs des services

**application-dev.properties**
- **Configuration développement :**
  - Base de données de test
  - Logs détaillés
  - Mode debug

### Configuration web
```
src/main/java/ma/brainit/config/
├── WebConfig.java
└── MailConfig.java
```

**WebConfig.java**
- **Configuration Spring MVC :**
  - Mapping des URLs
  - Gestion des ressources statiques
  - Configuration des contrôleurs

**MailConfig.java**
- **Configuration email :**
  - Serveur SMTP
  - Templates d'emails
  - Paramètres d'envoi

---

## 🔒 Sécurité

### Intercepteurs et annotations
```
src/main/java/ma/brainit/
├── config/
│   └── ExternalUserSecurityInterceptor.java
├── base/annotations/
│   └── AdminOnly.java
└── config/
    └── AdminOnlyAspect.java
```

**ExternalUserSecurityInterceptor.java**
- **Sécurité des utilisateurs externes :**
  - Vérification de l'authentification
  - Contrôle d'accès aux pages
  - Redirection si non autorisé

**AdminOnly.java**
- **Annotation personnalisée :**
  - Marquage des méthodes admin
  - Contrôle d'accès granulaire

**AdminOnlyAspect.java**
- **Aspect AOP :**
  - Interception des méthodes marquées
  - Vérification des permissions
  - Gestion des exceptions

### Contrôleurs d'accès
```
src/main/java/ma/brainit/aman/external/
├── actions/
│   └── ExternalAccessController.java
```

**ExternalAccessController.java**
- **Gestion des accès :**
  - Vérification des droits
  - Logs d'accès
  - Gestion des sessions

---

## 📁 Structure complète des fichiers

```
src/
├── main/
│   ├── java/ma/brainit/aman/external/
│   │   ├── controller/
│   │   │   ├── ExternalRegistrationController.java
│   │   │   └── ExternalDashboardController.java
│   │   ├── model/
│   │   │   ├── ExternalUserRegistration.java
│   │   │   ├── ExternalRequest.java
│   │   │   └── ExternalNotification.java
│   │   ├── service/
│   │   │   ├── ExternalUserRegistrationService.java
│   │   │   ├── ExternalRequestService.java
│   │   │   └── ExternalNotificationService.java
│   │   ├── dao/
│   │   │   ├── ExternalUserRegistrationDao.java
│   │   │   └── ExternalRequestDao.java
│   │   └── actions/
│   │       └── ExternalAccessController.java
│   ├── resources/
│   │   ├── sql/
│   │   │   ├── create_external_user_registration_table.sql
│   │   │   └── update_external_user_registration_table.sql
│   │   ├── application.properties
│   │   └── application-dev.properties
│   └── webapp/
│       ├── WEB-INF/views/external/
│       │   ├── external-layout.html
│       │   ├── dashboard.html
│       │   ├── registration.html
│       │   ├── profile.html
│       │   ├── change-password.html
│       │   └── help.html
│       └── resources/
│           ├── static/js/pages/
│           │   ├── index.js
│           │   ├── external-dashboard.js
│           │   ├── external-registration.js
│           │   ├── external-profile.js
│           │   ├── external-change-password.js
│           │   └── external-help.js
│           └── static/css/
│               ├── external-dashboard.css
│               ├── external-registration.css
│               └── external-common.css
```

---

## 🚀 Fonctionnalités implémentées

### 1. Inscription des utilisateurs externes
- ✅ Formulaire d'inscription complet
- ✅ Validation côté client et serveur
- ✅ Processus d'approbation par l'admin
- ✅ Génération automatique des identifiants
- ✅ Envoi d'emails de confirmation

### 2. Authentification et sécurité
- ✅ Système de connexion sécurisé
- ✅ Gestion des sessions
- ✅ Contrôle d'accès granulaire
- ✅ Protection des routes

### 3. Tableau de bord externe
- ✅ Widgets de statistiques en temps réel
- ✅ Actions rapides (1 clic)
- ✅ Calendrier des événements
- ✅ Documents récents avec recherche
- ✅ Activité récente avec actions
- ✅ Contacts fréquents
- ✅ Indicateurs de performance

### 4. Navigation et interface
- ✅ Layout responsive
- ✅ Menu sidebar complet
- ✅ Breadcrumbs
- ✅ Messages d'erreur/succès
- ✅ Modales d'aide

### 5. Gestion des demandes
- ✅ Création de demandes (Audience, Document, Requête)
- ✅ Suivi des statuts
- ✅ Historique des actions
- ✅ Notifications système

---

## 📝 Notes techniques

### Technologies utilisées
- **Backend :** Java 8, Spring MVC, Hibernate, MySQL
- **Frontend :** HTML5, CSS3, JavaScript, AngularJS, Bootstrap 5
- **Base de données :** MySQL 8.0
- **Serveur :** Apache Tomcat 9

### Architecture
- **Pattern MVC** pour la séparation des responsabilités
- **DAO Pattern** pour l'accès aux données
- **Service Layer** pour la logique métier
- **AOP** pour la sécurité et les logs

### Sécurité
- **Authentification** par session
- **Autorisation** par rôles et permissions
- **Validation** côté client et serveur
- **Protection CSRF** activée
- **Logs d'audit** pour les actions sensibles

---

## 🔄 Prochaines étapes

### Améliorations possibles
1. **API REST** pour les interactions AJAX
2. **WebSocket** pour les notifications en temps réel
3. **Upload de fichiers** pour les documents
4. **Système de messagerie interne**
5. **Rapports et statistiques avancés**
6. **Intégration avec d'autres systèmes**

### Maintenance
1. **Tests unitaires** et d'intégration
2. **Documentation API** (Swagger)
3. **Monitoring** et alertes
4. **Sauvegarde** automatique des données
5. **Mise à jour** de sécurité régulière

---

*Document créé le : 17 janvier 2025*  
*Version : 1.0*  
*Projet : GED Primature du Tchad* 