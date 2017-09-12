(function() {
    'use strict';

  // Module Definition
  angular.module(
    'ape.app',
    [
        'ui.router',
        'ngAria',
        'ngAnimate',
        'ngMaterial',
        'ape.common',
        'ape.users',
        'ape.table',
        'ape.details'
    ]
  )
    .constant('APP_TITLE', 'APE Stack Server')
    .constant('APP_VERSION', '0.0.0')
    .constant('APP_CREDITS', 'By David Thomas')
    .constant('APP_RIGHTS', 'Copyright, © 2017')
    .constant('API_ROUTE', '/api/')
    .config(mdThemeConfig)
    .config(mdIconConfig)
    .config(['$stateProvider', '$urlRouterProvider', configRouter]);

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
    }

})();
