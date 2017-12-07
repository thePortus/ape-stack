(function() {
    'use strict';

  // Module, Dependencies & Constants Definition
  angular.module(
    'ape.app',
    [
        'ui.router',
        'ngAria',
        'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'ngMaterial',
        'ngMdIcons',
        'pascalprecht.translate',
        'angular-translate-loader-pluggable',
        'tmh.dynamicLocale',
        'ui.grid',
        'ape.utils',
        'ape.common',
        'ape.auth',
        'ape.users',
        'ape.table',
        'ape.details'/* leave me here */
    ]
  )
    .constant('DEBUG_MODE', /*DEBUG_MODE*/true/*DEBUG_MODE*/)
    .constant('APP_TITLE', 'APE Stack Server')
    .constant('APP_VERSION', '0.0.0')
    .constant('APP_CREDITS', 'By David Thomas')
    .constant('APP_RIGHTS', 'Copyright, © 2017')
    .constant('API_ROUTE', 'api')
    .constant('API_VERSION', 'v1')
    .constant('LOCALES', {
      'locales': {
          'en_US': 'English',
          'fr_FR': 'Français',
          'de_DE': 'Duetsche'
      },
      'preferredLocale': 'en_US'
    })
    .config(mdThemeConfig)
    .config(mdIconConfig)
    .config(debugConfig)
    .config(translationConfig)
    .config(dynamicLocaleConfig)
    .config(configRouter, ['$stateProvider', '$urlRouterProvider']);

  /*Material Design Theme Configuration*/
  function mdThemeConfig($mdThemingProvider) {
    $mdThemingProvider
      .theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('brown')
      .warnPalette('orange');
  }

  /* Material Design Icon Provider Configuration */
  function mdIconConfig($mdIconProvider) {
      $mdIconProvider
        .defaultFontSet('mdi')
        .defaultIconSet('/imgs/mdi.svg');
  }

  /* Translation debaug mode */
  function debugConfig($compileProvider, DEBUG_MODE) {
    if (!DEBUG_MODE) {
      $compileProvider.debugInfoEnabled(false);// disables AngularJS debug info
    }
  }

  /* i18n localization configuration */
  function translationConfig($translateProvider, translatePluggableLoaderProvider, DEBUG_MODE, LOCALES) {
    if (DEBUG_MODE) {
      $translateProvider.useMissingTranslationHandlerLog();// warns about missing translates
    }
    $translateProvider.useLoader('translatePluggableLoader');
    $translateProvider.preferredLanguage(LOCALES.preferredLocale);
    $translateProvider.useLocalStorage();
    $translateProvider.useSanitizeValueStrategy('sanitize');
    // set translation file locations
    const staticLoader = $translateProvider.useStaticFilesLoader({
      'prefix': 'js/app/resources/locale-',
      'suffix': '.json'
    });
    translatePluggableLoaderProvider.useLoader(staticLoader);
  }

  /* sets location of dynamic locale files */
  function dynamicLocaleConfig(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('lib/locales/angular-locale_{{locale}}.js');
  } // dynamicLocaleConfig

  /*UI Router Configuration*/
    function configRouter($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $urlRouterProvider.when('', '/');
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'js/app/home.template.html',
          controller: 'HomeCtrl',
          controllerAs: 'vm'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'js/app/login.template.html',
          controller: 'LoginCtrl',
          controllerAs: 'vm'
        })
        .state('registration', {
          url: '/register',
          templateUrl: 'js/app/registration.template.html',
          controller: 'RegistrationCtrl',
          controllerAs: 'vm'
        })
        .state('userlist', {
          url: '/userlist',
          templateUrl: 'js/app/userList.template.html',
          controller: 'UserListCtrl',
          controllerAs: 'vm'
        })
        .state('account', {
          url: '/users',
          templateUrl: 'js/app/account.template.html',
          controller: 'AccountCtrl',
          controllerAs: 'vm'
        });
        /* leave me here */

    } // UI Router Configuration

})();
