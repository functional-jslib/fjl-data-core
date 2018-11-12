const instance = require('../dist/cjs/fjlDataCore');

describe ('fjl-data-core', function () {
    test ('should have reached this point with no errors', function () {
        expect(!!instance).toEqual(true);
    });
});
