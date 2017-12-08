/**
 * client/js/probus/tests/probus.fake-data.js
 * @file
 *
 * ape : probus
 * David J. Thomas &lt;dave.a.base@gmail.com&gt; (http://thePortus.com)
 *
 * Test
 *
 * Created with the Ape-Stack Yeoman Generator
 * Copyright (c) 2016 David J. Thomas, dave.a.base@gmail.com
 * http://thePortus.com | https://github.com/thePortus
 *
 * Formatted according to John Papa's Angular style guide
 * https://github.com/johnpapa/angular-styleguide
 */

(function() {

'use strict';

/**
 * Injected in [module]/tests/[module].[controller].spec.js to provide fake data
 */
angular.module('probus')
    .factory('probusFakeData', fakeData);

    function fakeData(coreFakeData) {
        return angular.extend({}, coreFakeData, {
            // TODO: add your own test data here
            foo: 'bar'
        });
    }

})();
