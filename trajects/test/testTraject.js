/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
const Traject = require('../models/traject');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

let trajectExample = {
  brand: "Koenigsegg",
  model: "Regera",
  years: 2,
  matriculationNbr: "LYF2EZ",
  autonomy: 200
}

describe('Trajects', () => {
    beforeEach((done) => { //Before each test we empty the database
        Traject.deleteMany({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET Traject', () => {
        it('it should GET a traject by the given id', (done) => {
            trajectExample.save((err, traject) => {
                chai.request(server)
                .get('/trajects/' + traject.id)
                .send(traject)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('brand');
                    res.body.should.have.property('model');
                    res.body.should.have.property('years');
                    res.body.should.have.property('matriculationNbr');
                    res.body.should.have.property('autonomy');
                    res.body.should.have.property('_id').eql(traject.id);
                    done();
                });
            });
        });
    });
    /*
      * Test the /POST route
      */
    describe('/POST Traject', () => {
        it('it should POST a traject ', (done) => {
            chai.request(server)
                .post('/trajects/')
                .send(trajectExample)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('brand');
                    res.body.should.have.property('model');
                    res.body.should.have.property('years');
                    res.body.should.have.property('matriculationNbr');
                    res.body.should.have.property('autonomy');
                    done();
                });
        });
    });
    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id Traject', () => {
        it('it should UPDATE a traject given the id', (done) => {

            trajectExample.save((err, traject) => {
                chai.request(server)
                    .put('/trajects/' + traject.id)
                    .send({
                        brand: "Fiat", model: "Multipla GT V12 Electrique", years: "0", matriculationNbr: "SP33D",
                        autonomy: "2000"
                    })
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.traject.should.have.property('brand').eql("Fiat");
                        res.body.traject.should.have.property('model').eql("Multipla GT V12 Electrique");
                        res.body.traject.should.have.property('years').eql("0");
                        res.body.traject.should.have.property('matriculationNbr').eql("SP33D");
                        res.body.traject.should.have.property('autonomy').eql("2000");
                        done();
                    });
            });
        });
    });
    /*
      * Test the /DELETE/:id route
      */
    describe('/DELETE/:id Traject', () => {
        it('it should DELETE a traject given the id', (done) => {
            trajectExample.save((err, traject) => {
                chai.request(server)
                    .delete('/trajects/' + traject.id)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.result.should.have.property('ok').eql(1);
                        res.body.result.should.have.property('n').eql(1);
                        done();
                    });
            });
        });
    });

});