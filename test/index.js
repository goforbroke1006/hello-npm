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

describe("#isNumber", function () {
    it("Sample # 1", function () {
        wildfowl.isNumber("3.1415926535").should.equal(true);
        wildfowl.isNumber("3.14").should.equal(true);
        wildfowl.isNumber("314").should.equal(true);
        wildfowl.isNumber("0").should.equal(true);

        wildfowl.isNumber("000").should.equal(false);
        wildfowl.isNumber("a314").should.equal(false);
        wildfowl.isNumber("314s").should.equal(false);
        wildfowl.isNumber("314s").should.equal(false);
    });
});

describe("#objectCanBeArray", function () {
    it("Sample # 1", function () {
        wildfowl.objectCanBeArray({
            "0": "1234",
            "1": "12gre34",
            "2": "1w234",
            "3": "12thr34"
        }).should.equal(true);
    });
    it("Sample # 2", function () {
        wildfowl.objectCanBeArray({
            "a": "1234",
            "0": "12we34",
            "2": "12weymy34",
            "3": "123gre4"
        }).should.equal(false);
    });
    it("Sample # 3", function () {
        wildfowl.objectCanBeArray({
            "1": "1234",
            "0": "12ertg34",
            "2": "12g34",
            "3": "12erji34"
        }).should.equal(true);
    });
});

describe("#parseUrl", function () {
    it("Sample # 1", function () {
        var obj = wildfowl.parseUrl('https://some.site.com:9999/shop/monobloki_i_kompyutery/kompyutery/?category_id=26145&collection=&disc=&ncitems=&source_filter=&f%5Bname%5D=&f%5Bprice%5D%5B0%5D=8990&f%5Bprice%5D%5B1%5D=236190&f%5Bproizvoditel%5D%5B0%5D=4046947&f%5Bproizvoditel%5D%5B1%5D=4046953&f%5Bproizvoditel%5D%5B2%5D=4046948&f%5Bchastota_processora_pc%5D%5B0%5D=1&f%5Bchastota_processora_pc%5D%5B1%5D=22&f%5Bhdd%5D%5B0%5D=32&f%5Bhdd%5D%5B1%5D=6000&f%5Bssd%5D%5B0%5D=8&f%5Bssd%5D%5B1%5D=512&f%5Bthunderbolt_connector%5D=&f%5Bfirewire_connector%5D=&f%5Bwifi%5D=&f%5Bbluetooth%5D=&category_main_id=0&maker_id=0&model_id=0&category_acs_id=0&ncitems_ajax=1');
        obj.schema.should.equal("https");
        obj.host.should.equal("some.site.com");
        obj.port.should.equal("9999");
        obj.path.should.equal("/shop/monobloki_i_kompyutery/kompyutery/");

        obj.params.should.have.property("category_id");
        obj.params.should.have.property("collection");
        obj.params.should.have.property("ncitems");

        obj.params.should.have.property("f");
        obj.params["f"].should.have.property("name");
        obj.params["f"].should.have.property("price");

        obj.params["category_id"].should.equal(26145);
        should.equal(obj.params["collection"], null);
        should.equal(obj.params["ncitems"], null);
        obj.params["f"]["price"].should.deep.equal([8990, 236190]);
        obj.params["f"]["chastota_processora_pc"].should.deep.equal([1, 22]);
        obj.params["f"]["hdd"].should.deep.equal([32, 6000]);
        obj.params["f"]["proizvoditel"].should.deep.equal([4046947, 4046953, 4046948]);
        obj.params["f"]["ssd"].should.deep.equal([8, 512]);
    });

    it("Sample # 2", function () {
        var url = 'https://some.site.com:9999/shop/monobloki_i_kompyutery/kompyutery/?category_id=26145&collection=&disc=&ncitems=&source_filter=&f%5Bname%5D=&f%5Bprice%5D%5B0%5D=8990&f%5Bprice%5D%5B1%5D=236190&f%5Bproizvoditel%5D%5B0%5D=4046947&f%5Bproizvoditel%5D%5B1%5D=4046953&f%5Bproizvoditel%5D%5B2%5D=4046948&f%5Bchastota_processora_pc%5D%5B0%5D=1&f%5Bchastota_processora_pc%5D%5B1%5D=22&f%5Bhdd%5D%5B0%5D=32&f%5Bhdd%5D%5B1%5D=6000&f%5Bssd%5D%5B0%5D=8&f%5Bssd%5D%5B1%5D=512&f%5Bthunderbolt_connector%5D=&f%5Bfirewire_connector%5D=&f%5Bwifi%5D=&f%5Bbluetooth%5D=&category_main_id=0&maker_id=0&model_id=0&category_acs_id=0&ncitems_ajax=1';
        var obj = url.parseUrl();

        obj.params.should.have.property("f");
        obj.params["f"].should.have.property("name");
        obj.params["f"].should.have.property("price");
    });

    it("Sample # 3", function () {
        var url = 'hello world';
        var obj = url.parseUrl();

        should.equal(obj, null);
    });
});