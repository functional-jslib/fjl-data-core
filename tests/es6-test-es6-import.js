import * as instance from '../dist/es6-module/fjl-data-core';

describe ('fjl-data-core', function () {
    test ('should have reached this point with no errors', function () {
        expect(!!instance).toEqual(true);
    });
});
