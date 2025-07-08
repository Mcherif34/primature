# GED Primature - Système de Gestion Électronique des Documents

## 📋 Description

GED Primature est un système de gestion électronique des documents développé pour la Primature. Cette application web permet la gestion complète des documents, des utilisateurs et des processus administratifs.

## 🚀 Fonctionnalités

### ✅ Fonctionnalités principales
- **Gestion des documents** : Upload, stockage et organisation des documents
- **Inscription externe** : Système d'inscription pour utilisateurs externes
- **Gestion des utilisateurs** : Administration des comptes et profils
- **Système d'emails** : Notifications automatiques par email
- **Interface d'administration** : Panel d'administration complet
- **Sécurité** : Authentification et autorisation basées sur les rôles

### 🔧 Fonctionnalités techniques
- **Java 1.8** : Application développée en Java 1.8
- **Spring MVC** : Framework web Spring MVC
- **Hibernate** : ORM pour la persistance des données
- **Maven** : Gestion des dépendances
- **Jetty** : Serveur d'application embarqué
- **Gmail SMTP** : Envoi d'emails via Gmail

## 🛠️ Installation et Configuration

### Prérequis
- **Java 1.8** ou supérieur
- **Maven 3.6** ou supérieur
- **Base de données** (MySQL/PostgreSQL)

### Configuration

1. **Cloner le repository**
   ```bash
   git clone https://github.com/Mcherif34/primature.git
   cd primature
   ```

2. **Configuration de la base de données**
   - Modifier `src/main/resources/application-dev.properties`
   - Configurer les paramètres de connexion à la base de données

3. **Configuration des emails**
   - Configurer le mot de passe d'application Gmail dans `application-dev.properties`
   - Activer l'authentification à deux facteurs sur le compte Gmail
   - Générer un mot de passe d'application

4. **Lancer l'application**
   ```bash
   export JAVA_HOME=/path/to/java8
   mvn jetty:run
   ```

5. **Accéder à l'application**
   - URL : http://localhost:8686/primature/
   - Inscription externe : http://localhost:8686/primature/external/inscription
   - Administration : http://localhost:8686/primature/administration/

## 📧 Configuration Email

### Gmail SMTP
```properties
mail.host = smtp.gmail.com
mail.port = 587
mail.username = votre-email@gmail.com
mail.password = votre-mot-de-passe-application
mail.login = votre-email@gmail.com
```

### Génération du mot de passe d'application Gmail
1. Aller sur https://myaccount.google.com/
2. Sécurité → Connexion à Google → Mots de passe d'application
3. Générer un nouveau mot de passe pour "Autre (nom personnalisé)"
4. Utiliser ce mot de passe dans la configuration

## 🗄️ Structure de la base de données

### Tables principales
- `SEC_UTILISATEUR` : Utilisateurs du système
- `SEC_PROFILE` : Profils utilisateurs
- `SEC_UTILISATEUR_PROFIL` : Liaison utilisateur-profil
- `EXTERNAL_USER_REGISTRATION` : Inscriptions externes

## 🔐 Sécurité

### Authentification
- Système d'authentification Spring Security
- Gestion des rôles et permissions
- Sessions sécurisées

### Profils utilisateurs
- **Administrateur** : Accès complet au système
- **Utilisateur externe** : Accès limité aux fonctionnalités publiques
- **Utilisateur interne** : Accès aux fonctionnalités internes

## 📁 Structure du projet

```
src/
├── main/
│   ├── java/
│   │   └── ma/brainit/aman/
│   │       ├── administration/     # Gestion des utilisateurs et administration
│   │       ├── client/            # Module client
│   │       ├── commun/            # Services communs
│   │       ├── external/          # Inscriptions externes
│   │       └── webservice/        # Services web
│   ├── resources/
│   │   ├── application.properties # Configuration principale
│   │   └── application-dev.properties # Configuration développement
│   └── webapp/
│       ├── resources/             # Assets statiques (CSS, JS, images)
│       └── WEB-INF/
│           └── views/             # Pages JSP
```

## 🚀 Déploiement

### Mode développement
```bash
mvn jetty:run
```

### Mode production
```bash
mvn clean package
# Déployer le WAR généré sur Tomcat
```

## 📝 Workflow d'inscription externe

1. **Inscription** : L'utilisateur remplit le formulaire d'inscription
2. **Validation** : L'administrateur valide la demande
3. **Création de compte** : Le système crée automatiquement le compte utilisateur
4. **Notification** : Un email est envoyé avec les identifiants de connexion
5. **Première connexion** : L'utilisateur doit changer son mot de passe

## 🔧 Dépannage

### Problèmes courants

1. **Erreur d'authentification Gmail**
   - Vérifier le mot de passe d'application
   - Activer l'authentification à deux facteurs

2. **Erreur "The given id must not be null!"**
   - Vérifier la configuration des profils utilisateurs
   - S'assurer que les relations ManyToOne/ManyToMany sont correctes

3. **Port déjà utilisé**
   ```bash
   pkill -f jetty
   mvn jetty:run
   ```

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Contacter l'équipe de développement

## 📄 Licence

Ce projet est développé pour la Primature. Tous droits réservés.

---

**Version** : 1.0.0  
**Dernière mise à jour** : 8 juillet 2025  
**Développé par** : Équipe GED Primature 