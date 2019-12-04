var expect  = require('chai').expect;
var request = require('request');      

describe('Status and content', function() {
   describe ('Server page', function() {
       it('check connection', function(done){
           request('http://localhost:8080/api', function(error, response, body) {
               expect(response.statusCode).to.equal(200);
               done();
           });
       });

       it('should get API works', function(done) {
           request('http://localhost:8080/api/cards' , function(error, response, body) {
            expect(response.statusCode).to.equal(200);
               done();
           });
       });

       it('should return card array inn GET API', function(done) {
         request('http://localhost:8080/api/cards' , function(error, response, body) {
          expect( response.body).to.not.be.null;
             done();
         });
     });

     it('should check valid credit card', function(done) {
        request('http://localhost:8080/api/cards' , function(error, response, body) {
         expect( response.body).to.not.be.null;
            done();
        });
    });
   });
});