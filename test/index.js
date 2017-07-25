/**
 * Created by SCherk01 on 25.07.17.
 */

var should = require('chai').should(),
    wildfowl = require('../index'),
    isTMNT = wildfowl.isTMNT;

describe('#isTMNT', function () {

    it('LeOnArDo should be a TMNT', function () {
        isTMNT('LeOnArDo').should.equal(true);
    });

    it('LeOnArDo123 should not be a TMNT', function () {
        isTMNT('LeOnArDo123').should.equal(false);
    });

    it('false (boolean) should not be a TMNT', function () {
        isTMNT(false).should.equal(false);
    });

    it('Number should not be a TMNT', function () {
        isTMNT(123).should.equal(false);
    });

});