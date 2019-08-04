const expect = require("chai").expect;
const cheez = require("../cheez.js");

describe("Get Cheezeburger module", () => {
    it("returns requested cheezeburger", () => {
      const result = cheez.get("bigmac");
      expect(result).to.deep.equal({name: 'bigmac', restaurant: 'McDonalds', price: 3.99});
    });
    
    it("fails w/ invalid cheezeburger", () => {
      const result = cheez.get("fake cheezeburger");
      expect(result).to.be.undefined;
    });
   });

   describe("ADD Cheezeburger module", () => {
    it("adds correct cheezeburger", () => {
      cheez.add({'name':'whopper', 'restaurant':'Burger King','price':6.72});
      const result = cheez.get("whopper");
      expect(result).to.deep.equal({name:'whopper', restaurant:'Burger King',price:6.72});
    });
    
    it("does not add duplicate cheezeburger", () => {
      cheez.add({'name':'whopper', 'restaurant':'Burger King','price':6.72})
      let noomby = cheez.getAll().length;
      cheez.add({'name':'whopper', 'restaurant':'Burger King','price':6.72})  
      let nimby = cheez.getAll().length;
      expect(nimby).to.equal(noomby); 
    });
   });

   describe("Delete Cheezeburger module", () => {
    it("deletes requested cheezeburger", () => {  
      cheez.dilly("bigmac");
      expect(cheez.get("bigmac")).to.be.undefined;
    });
    
    it("did not delete cheezeburger", () => {
      let noomby = cheez.getAll().length;  
      cheez.dilly("stinkburger");
      let nimby = cheez.getAll().length;
      expect(nimby).to.equal(noomby); 
    });
   });