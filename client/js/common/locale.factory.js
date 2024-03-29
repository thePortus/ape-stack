(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('ape.common')
    .factory('LocaleService', localService);

  function localService($log, $translate, $rootScope, tmhDynamicLocale, LOCALES) {
    return new LocaleService();

    function LocaleService() {
      /* jshint validthis: true */
      var vm = this;

      /* Properties */
      // Getting locale info
      vm.localesObj = LOCALES.locales;
      // getting locales and display names
      vm._LOCALES = Object.keys(vm.localesObj);
      vm._LOCALES_DISPLAY_NAMES = [];
      // initializing current locale
      vm.currentLocale = null;

      /* Methods */
      vm.initialize = initialize;
      vm.checkLocaleIsValid = checkLocaleIsValid;
      vm.setLocale = setLocale;
      vm.getLocaleDisplayName = getLocaleDisplayName;
      vm.getLocalesDisplayNames = getLocalesDisplayNames;
      vm.setLocaleByDisplayName = setLocaleByDisplayName;

      // init function call
      vm.initialize();

      /* Functions */
      function initialize() {
        if (!vm._LOCALES || vm._LOCALES.length === 0) {
          $log.log('There are no _LOCALES provided');
        }
        vm._LOCALES.forEach(function (locale) {
          vm._LOCALES_DISPLAY_NAMES.push(vm.localesObj[locale]);
        });
        // STORING CURRENT LOCALE
        vm.currentLocale = LOCALES.preferredLocale;// because of async loading
      }

      function checkLocaleIsValid(locale) {
        return vm._LOCALES.indexOf(locale) !== -1;
      }

      function setLocale(locale) {
        if (!vm.checkLocaleIsValid(locale)) {
          $log.log('Locale name "' + locale + '" is invalid');
          return;
        }
        vm.currentLocale = locale;// updating current locale

        // asking angular-translate to load and apply proper translations
        $translate.use(locale);
      }

      function getLocaleDisplayName() {
        return vm.localesObj[vm.currentLocale];
      }

      function getLocalesDisplayNames() {
        return vm._LOCALES_DISPLAY_NAMES;
      }

      function setLocaleByDisplayName(localeDisplayName) {
        vm.setLocale(
          vm._LOCALES[
            vm._LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)// get locale index
            ]
        );
      }

      // EVENTS
      // on successful applying translations by angular-translate
      $rootScope.$on('$translateChangeSuccess', function (event, data) {
        document.documentElement.setAttribute('lang', data.language);// sets "lang" attribute to html

         // asking angular-dynamic-locale to load and apply proper AngularJS $locale setting
        tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
      });

    }
    /*close LocaleService*/

  }
  /*close localService*/

})();
