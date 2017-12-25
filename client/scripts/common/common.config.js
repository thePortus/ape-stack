(function() {
    'use strict';

  // Module Definition
  angular.module('ape.common', [
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

/* component i18n localization configuration */
function translationConfig($translateProvider, translatePluggableLoaderProvider) {
  // set translation file locations
  const staticLoader = $translateProvider.useStaticFilesLoader({
    'prefix': 'js/common/resources/locale-',
    'suffix': '.json'
  });
  translatePluggableLoaderProvider.useLoader(staticLoader);
}

})();
