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
        'backgroundClass': 'featureBgBeige',
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
        'backgroundClass': 'featureBgAliceBlue',
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
        'backgroundClass': 'featureBgLavender',
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
        'backgroundClass': 'featureBgPaleGreen',
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
        'backgroundClass': 'featureBgLavenderBlush',
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
        'backgroundClass': 'featureBgDarkSlateGrey',
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
        'backgroundClass': 'featureBgWhite',
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
        'backgroundClass': 'featureBgLavenderBlush',
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
        'backgroundClass': 'featureBgWhite',
        'iconClass': 'featureLogo'
      },{
        'label': 'Mocha',
        'src': 'imgs/vendor_icons/mocha.svg',
        'caption': 'Feature-Rich JavaScript test framework',
        'link': 'https://mochajs.org/',
        'span': {
          'row': 1,
          'col': 1
        },
        'backgroundClass': 'featureBgBeige',
        'iconClass': 'featureLogo'
      },{
        'label': 'Chai',
        'src': 'imgs/vendor_icons/chai.svg',
        'caption': 'Chai: An assertion library for NodeJS',
        'link': 'http://chaijs.com/',
        'span': {
          'row': 1,
          'col': 1
        },
        'backgroundClass': 'featureBgLavenderBlush',
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
        'backgroundClass': 'featureBgDarkSlateGrey',
        'iconClass': 'featureLogoWide'
      },{
        'label': 'Istanbul',
        'src': 'imgs/vendor_icons/istanbul.svg',
        'caption': 'JavaScript test coverage made simple',
        'link': 'https://istanbul.js.org/',
        'span': {
          'row': 1,
          'col': 1
        },
        'backgroundClass': 'featureBgBeige',
        'iconClass': 'featureLogo'
      }];

      /* Methods */

    }
    /*close AppFeatures*/

  }
  /*close appFeatures*/

})();
