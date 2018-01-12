(function() {
  'use strict';

  // Module Definition
  angular.module('ape.details', [
    'ngAria',
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngMaterial',
    'ngMdIcons',
    'pascalprecht.translate',
    'angular-translate-loader-pluggable',
    'tmh.dynamicLocale',
    'ui.grid'
  ])
    .config(translationConfig);

  // component i18n localization configuration
  function translationConfig($translateProvider, translatePluggableLoaderProvider) {
    // set translation file locations
    const staticLoader = $translateProvider.useStaticFilesLoader({
      'prefix': 'js/details/resources/locale-',
      'suffix': '.json'
    });
    translatePluggableLoaderProvider.useLoader(staticLoader);
  } // translationConfig
})();
