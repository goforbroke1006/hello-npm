const should = require("chai").should(),
    isNumber = require("../common").isNumber,
    objectCanBeArray = require("../common").objectCanBeArray
;

describe("#isNumber", function () {
    it("Positive", function () {
        isNumber("3.1415926535").should.equal(true);
        isNumber("3.14").should.equal(true);
        isNumber("314").should.equal(true);
        isNumber("0").should.equal(true);
    });

    it("Negative", function () {
        isNumber("000").should.equal(false);
        isNumber("a314").should.equal(false);
        isNumber("314s").should.equal(false);
        isNumber("314s").should.equal(false);
    });
});

describe("#objectCanBeArray", function () {
    it("Sample # 1", function () {
        objectCanBeArray({
            "0": "1234",
            "1": "12gre34",
            "2": "1w234",
            "3": "12thr34"
        }).should.equal(true);
    });
    it("Sample # 2", function () {
        objectCanBeArray({
            "a": "1234",
            "0": "12we34",
            "2": "12weymy34",
            "3": "123gre4"
        }).should.equal(false);
    });
    it("Sample # 3", function () {
        objectCanBeArray({
            "1": "1234",
            "0": "12ertg34",
            "2": "12g34",
            "3": "12erji34"
        }).should.equal(true);
    });
});