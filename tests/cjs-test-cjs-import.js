const instance = require('../dist/cjs/fjlDataCore');
const {expect} = require('chai');

describe ('fjl-data-core', function () {
    test ('should have reached this point with no errors', function () {
        expect(!!instance).toEqual(true);
    });
});
