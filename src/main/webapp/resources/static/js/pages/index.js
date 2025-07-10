angular.module('primature', [])

// Dashboard
require('../administration/externalRegistration/externalDashboardController.js');
require('./external-dashboard.init.js');

// Documents
require('./external-documents.controller.js');

// Tasks
require('./external-tasks.controller.js');

// Profile
require('./external-profile.controller.js');

// Change Password
require('./external-change-password.controller.js');

// Help
require('./external-help.controller.js'); 