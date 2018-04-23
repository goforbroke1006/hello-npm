const should = require('chai').should(),
    MyURL = require('../http-foundation').URL;

describe("#parseUrl", function () {
    it("Sample # 1", function () {
        const url = new MyURL('https://some.site.com:9999/shop/monobloki_i_kompyutery/kompyutery/?category_id=26145&collection=&disc=&ncitems=&source_filter=&f%5Bname%5D=&f%5Bprice%5D%5B0%5D=8990&f%5Bprice%5D%5B1%5D=236190&f%5Bproizvoditel%5D%5B0%5D=4046947&f%5Bproizvoditel%5D%5B1%5D=4046953&f%5Bproizvoditel%5D%5B2%5D=4046948&f%5Bchastota_processora_pc%5D%5B0%5D=1&f%5Bchastota_processora_pc%5D%5B1%5D=22&f%5Bhdd%5D%5B0%5D=32&f%5Bhdd%5D%5B1%5D=6000&f%5Bssd%5D%5B0%5D=8&f%5Bssd%5D%5B1%5D=512&f%5Bthunderbolt_connector%5D=&f%5Bfirewire_connector%5D=&f%5Bwifi%5D=&f%5Bbluetooth%5D=&category_main_id=0&maker_id=0&model_id=0&category_acs_id=0&ncitems_ajax=1');
        url.schema.should.equal("https");
        url.host.should.equal("some.site.com");
        url.port.should.equal(9999);
        url.path.should.equal("/shop/monobloki_i_kompyutery/kompyutery/");

        url.params.should.have.property("category_id");
        url.params.should.have.property("collection");
        url.params.should.have.property("ncitems");

        url.params.should.have.property("f");
        url.params["f"].should.have.property("name");
        url.params["f"].should.have.property("price");

        url.params["category_id"].should.equal(26145);
        should.equal(url.params["collection"], null);
        should.equal(url.params["ncitems"], null);
        url.params["f"]["price"].should.deep.equal([8990, 236190]);
        url.params["f"]["chastota_processora_pc"].should.deep.equal([1, 22]);
        url.params["f"]["hdd"].should.deep.equal([32, 6000]);
        url.params["f"]["proizvoditel"].should.deep.equal([4046947, 4046953, 4046948]);
        url.params["f"]["ssd"].should.deep.equal([8, 512]);
    });

    it("Sample # 3", function () {
        const url = new MyURL('hello world');
        url.should.deep.equal({});
    });
});