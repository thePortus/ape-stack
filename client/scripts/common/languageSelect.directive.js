(function() {
  'use strict';

  angular.module('ape.common')
    .directive('apeLanguageSelect', apeLanguageSelect);

  // directive definition
  function apeLanguageSelect() {
    var directive = {
      templateUrl: 'scripts/common/languageSelect.template.html',
      scope: {},
      controller: apeLanguageSelectController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  } // apeLanguageSelect

  // directive controller
  function apeLanguageSelectController(LocaleService) {
    /* jshint validthis: true */
    var vm = this;

    // properties
    vm.currentLocaleDisplayName = null;
    vm.localesDisplayNames = null;
    vm.visible = true; // TODO: CHANGE BACK to vm.localesDisplayNames && vm.localesDisplayNames.length > 1;

    vm.$onInit = initialize;

    vm.changeLanguage = changeLanguage;

    // functions
    function initialize() {
      vm.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
      vm.localesDisplayNames = LocaleService.getLocalesDisplayNames();
    } // initialize

    function changeLanguage(locale) {
      LocaleService.setLocaleByDisplayName(locale);
    } // changeLanguage
  } // apeLanguageSelectController
})();
