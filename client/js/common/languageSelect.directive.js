(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('ape.common')
    .directive('apeLanguageSelect', apeLanguageSelect);

  /*Directive Definition*/
  function apeLanguageSelect() {
    var directive = {
      templateUrl: 'js/common/languageSelect.template.html',
      scope: {},
      controller: apeLanguageSelectController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  } // apeLanguageSelect

  /*Directive Controller*/
  function apeLanguageSelectController($log, LocaleService) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.currentLocaleDisplayName = null;
    vm.localesDisplayNames = null;
    vm.visible = true; //TODO: CHANGE BACK to vm.localesDisplayNames && vm.localesDisplayNames.length > 1;

    vm.$onInit = initialize;

    vm.changeLanguage = changeLanguage;

    /* Functions */
    function initialize() {
      vm.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
      vm.localesDisplayNames = LocaleService.getLocalesDisplayNames();
    }

    function changeLanguage(locale) {
        LocaleService.setLocaleByDisplayName(locale);
    }

  } // apeLanguageSelectController

})();
