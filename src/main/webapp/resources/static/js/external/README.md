# Module d'Inscription Externe - Documentation JavaScript

## Vue d'ensemble

Ce module gère l'inscription des utilisateurs externes (ministères et institutions publiques) avec un formulaire multi-étapes utilisant AngularJS.

## Structure des fichiers

```
external/
├── registration.js          # Contrôleur principal AngularJS
├── registrationService.js   # Services AngularJS (API, validation, UI, notifications)
└── README.md               # Cette documentation
```

## Organisation du code

### 1. Contrôleur Principal (`registration.js`)

**Responsabilités :**
- Gestion de la navigation entre étapes
- Liaison avec les services
- Gestion de l'état du formulaire
- Validation des données

**Structure :**
```javascript
app.controller('RegistrationController', function($scope, $http, RegistrationService, ValidationService, NotificationService, UIService) {
    // Initialisation et configuration
    // Navigation entre étapes
    // Validation
    // Gestion de l'interface utilisateur
    // Soumission du formulaire
    // Méthodes publiques pour tests
});
```

### 2. Services (`registrationService.js`)

#### RegistrationService
Gère tous les appels API :
- `register(data)` - Enregistrer une nouvelle demande
- `checkStatus(email)` - Vérifier le statut d'une demande
- `validateToken(token)` - Valider un token de confirmation
- `resetRegistration(email)` - Réinitialiser une demande

#### ValidationService
Gère la validation des données :
- `isValidEmail(email)` - Validation d'email
- `isValidPhone(phone)` - Validation de téléphone
- `isValidName(name)` - Validation de nom/prénom
- `isValidInstitution(institution)` - Validation d'institution
- `validateRegistrationData(data)` - Validation complète

#### NotificationService
Gère les notifications utilisateur :
- `showSuccess(message)` - Notification de succès
- `showError(message)` - Notification d'erreur
- `showInfo(message)` - Notification d'information
- `showWarning(message)` - Notification d'avertissement
- `clearAll()` - Effacer toutes les notifications

#### UIService
Gère l'interface utilisateur :
- `showLoading()` / `hideLoading()` - Gestion du spinner
- `showSuccessMessage()` / `hideSuccessMessage()` - Message de succès
- `showForm()` / `hideForm()` - Affichage du formulaire
- `updateProgress(currentStep, totalSteps)` - Barre de progression
- `updateStepIndicator(currentStep, totalSteps)` - Indicateur d'étapes
- `showStep(stepNumber, totalSteps)` - Affichage d'une étape
- `animateStepTransition(stepNumber)` - Animation de transition

## Configuration

### Variables globales
```javascript
var context = '/primature';
var baseUrl = '/external-registration/rest/';
```

### Configuration des étapes
```javascript
$scope.currentStep = 1;
$scope.totalSteps = 3;
```

## Modèle de données

```javascript
$scope.registration = {
    prenom: '',        // Obligatoire
    nom: '',          // Obligatoire
    fonction: '',     // Obligatoire
    email: '',        // Obligatoire
    telephone: '',    // Optionnel
    institution: '',  // Obligatoire
    adresse: '',      // Optionnel
    ville: ''         // Optionnel
};
```

## Validation

### Champs obligatoires (étape 1)
- Prénom (2-50 caractères alphabétiques)
- Nom (2-50 caractères alphabétiques)
- Fonction (minimum 2 caractères)
- Email (format valide)
- Institution (3-100 caractères)

### Champs optionnels (étape 2)
- Téléphone (format international)
- Ville
- Adresse

### Validation en temps réel
- Validation lors de la perte de focus (`ng-blur`)
- Effacement des erreurs lors du focus (`ng-focus`)
- Validation complète lors de la navigation entre étapes

## Navigation entre étapes

### Étape 1 : Informations Personnelles
- Validation stricte des champs obligatoires
- Bouton "Suivant" activé uniquement si validation OK

### Étape 2 : Informations Professionnelles
- Champs optionnels
- Pas de validation stricte
- Navigation libre

### Étape 3 : Validation et Envoi
- Affichage récapitulatif des données
- Validation finale avant soumission
- Bouton "Soumettre" avec gestion des erreurs

## Gestion des erreurs

### Types d'erreurs
1. **Erreurs de validation** : Champs invalides
2. **Erreurs réseau** : Problèmes de connexion
3. **Erreurs serveur** : Réponses d'erreur de l'API

### Affichage des erreurs
- Messages d'erreur sous chaque champ
- Notifications toast pour les erreurs globales
- Gestion du spinner de chargement

## API Endpoints

### POST `/external-registration/rest/register`
Enregistre une nouvelle demande d'inscription.

**Paramètres :**
```javascript
{
    prenom: string,
    nom: string,
    fonction: string,
    email: string,
    telephone: string (optionnel),
    institution: string,
    adresse: string (optionnel),
    ville: string (optionnel)
}
```

**Réponse :**
```javascript
{
    success: boolean,
    message: string,
    data: object (optionnel)
}
```

## Tests et débogage

### Méthodes de test disponibles
```javascript
// Réinitialiser le formulaire
$scope.resetForm();

// Charger des données de test
$scope.loadTestData();
```

### Console logs
- Initialisation du contrôleur
- Navigation entre étapes
- Validation des champs
- Soumission du formulaire
- Réponses API

## Bonnes pratiques

### 1. Séparation des responsabilités
- Contrôleur : Logique métier et gestion d'état
- Services : Appels API, validation, UI, notifications

### 2. Validation
- Validation côté client pour l'UX
- Validation côté serveur pour la sécurité
- Messages d'erreur clairs et spécifiques

### 3. Gestion des erreurs
- Try-catch pour les opérations critiques
- Messages d'erreur utilisateur-friendly
- Logs détaillés pour le débogage

### 4. Performance
- Validation en temps réel optimisée
- Animations fluides
- Gestion de la mémoire (nettoyage des listeners)

## Dépendances

### JavaScript
- AngularJS 1.x
- jQuery (pour Bootstrap)
- Bootstrap (pour l'UI)

### CSS
- Bootstrap 4.x
- Font Awesome (pour les icônes)
- CSS personnalisé pour les animations

## Maintenance

### Ajout de nouveaux champs
1. Ajouter le champ dans `$scope.registration`
2. Ajouter la validation dans `ValidationService`
3. Mettre à jour le template HTML
4. Tester la validation et la soumission

### Modification de la validation
1. Modifier les méthodes dans `ValidationService`
2. Mettre à jour les messages d'erreur
3. Tester avec différents cas d'usage

### Ajout de nouvelles étapes
1. Incrémenter `$scope.totalSteps`
2. Ajouter la logique de validation
3. Mettre à jour le template HTML
4. Tester la navigation

## Support

Pour toute question ou problème :
1. Vérifier les logs de la console
2. Tester avec les données de test
3. Vérifier la connectivité réseau
4. Consulter la documentation de l'API 