(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('ape.app')
    .factory('AppFeatures', appFeatures);

  function appFeatures() {
    return new AppFeatures();

    function AppFeatures() {
      /* jshint validthis: true */
      var vm = this;

      /* Properties */
      vm.features = [{
        'label': 'NodeJS',
        'caption': 'NodeJS: JavaScript runtime built on Chrome\'s V8 JavaScript engine',
        'src': 'imgs/vendor_icons/nodejs.svg',
        'link': 'https://nodejs.org/',
        'span': {
          'row': 1,
          'col': 2
        },
        'backgroundClass': 'backgroundBeige',
        'iconClass': 'featureLogoWide'
      },{
        'label': 'PostgreSQL',
        'caption': 'PostgreSQL: Open source database',
        'src': 'imgs/vendor_icons/postgresql.svg',
        'link': 'https://www.postgresql.org/',
        'span': {
          'row': 1,
          'col': 1
        },
        'backgroundClass': 'backgroundAliceBlue',
        'iconClass': 'featureLogo'
      },{
        'label': 'Sequelize',
        'src': 'imgs/vendor_icons/sequelize.svg',
        'caption': 'Sequelize is a promise-based ORM for Node.js v4 and up',
        'link': 'http://docs.sequelizejs.com/',
        'span': {
          'row': 1,
          'col': 1
        },
        'backgroundClass': 'lavenderBackground',
        'iconClass': 'featureLogo'
      },{
        'label': 'Express',
        'src': 'imgs/vendor_icons/express.svg',
        'caption': 'ExpressJS: Fast, unopinionated, minimalist web framework for Node.js',
        'link': 'https://expressjs.com/',
        'span': {
          'row': 1,
          'col': 2
        },
        'backgroundClass': 'paleGreenBackground',
        'iconClass': 'featureLogoWide'
      },{
        'label': 'AngularJS',
        'src': 'imgs/vendor_icons/angular.svg',
        'caption': 'Angular JS: Superheroic JavaScript MVW Framework',
        'link': 'https://angularjs.org/',
        'span': {
          'row': 1,
          'col': 2
        },
        'backgroundClass': 'lavenderBlushBackground',
        'iconClass': 'featureLogoWide'
      },{
        'label': 'PassportJS',
        'src': 'imgs/vendor_icons/passport.svg',
        'caption': 'Passport: Simple, unobtrusive authentication for Node.js',
        'link': 'http://passportjs.org/',
        'span': {
          'row': 1,
          'col': 1
        },
        'backgroundClass': 'darkSlateGreyBackground',
        'iconClass': 'featureLogo'
      },{
        'label': 'Yeoman',
        'src': 'imgs/vendor_icons/yeoman.svg',
        'caption': 'Yeoman Scaffolding Tool',
        'link': 'http://http://yeoman.io/',
        'span': {
          'row': 1,
          'col': 1
        },
        'backgroundClass': 'whiteBackground',
        'iconClass': 'featureLogo'
      },{
        'label': 'Gulp',
        'src': 'imgs/vendor_icons/gulp.svg',
        'caption': 'Gulp: an automation toolkit',
        'link': 'https://gulpjs.com/',
        'span': {
          'row': 1,
          'col': 1
        },
        'backgroundClass': 'lavenderBlushBackground',
        'iconClass': 'featureLogo'
      },{
        'label': 'Protractor',
        'src': 'imgs/vendor_icons/protractor.svg',
        'caption': 'Protractor: End to end testing for AngularJS',
        'link': 'http://www.protractortest.org/',
        'span': {
          'row': 1,
          'col': 1
        },
        'backgroundClass': 'whiteBackground',
        'iconClass': 'featureLogo'
      },{
        'label': 'Mocha',
        'src': 'imgs/vendor_icons/mocha.svg',
        'caption': 'Mocha is a feature-rich JavaScript test framework',
        'link': 'https://mochajs.org/',
        'span': {
          'row': 1,
          'col': 1
        },
        'backgroundClass': 'backgroundBeige',
        'iconClass': 'featureLogo'
      },{
        'label': 'Less',
        'src': 'imgs/vendor_icons/less.svg',
        'caption': 'Less: CSS precompiler',
        'link': 'http://lesscss.org/',
        'span': {
          'row': 1,
          'col': 2
        },
        'backgroundClass': 'darkSlateGreyBackground',
        'iconClass': 'featureLogoWide'
      }];

      /* Methods */

    }
    /*close AppFeatures*/

  }
  /*close appFeatures*/

})();
