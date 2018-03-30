import * as instance from '../dist/es6-module/fjl-data-core';
import {expect} from 'chai';

describe ('fjl-data-core', function () {
    test ('should have reached this point with no errors', function () {
        expect(!!instance).to.equal(true);
    });
});
