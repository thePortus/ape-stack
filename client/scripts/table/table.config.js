(function() {
  'use strict';

  // Module Definition
  angular.module('ape.table', [
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
    .config(translationConfig)
    .filter('orderObjectBy', orderObjectBy);

  /* Custom Filters */
  function orderObjectBy() {
    return function(items, field, reverse) {
      var filtered = [];
      angular.forEach(items, function(item) {
        filtered.push(item);
      });
      filtered.sort(function(a, b) {
        return (a[field] > b[field] ? 1 : -1);
      });
      if (reverse) {
        filtered.reverse();
      }
      return filtered;
    };
  } // orderObjectBy

  /* component i18n localization configuration */
  function translationConfig($translateProvider, translatePluggableLoaderProvider) {
    // set translation file locations
    const staticLoader = $translateProvider.useStaticFilesLoader({
      'prefix': 'js/table/resources/locale-',
      'suffix': '.json'
    });
    translatePluggableLoaderProvider.useLoader(staticLoader);
  } // translationConfig
})();
