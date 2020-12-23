/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
const Car = require('../models/car');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

let carExample = {
  brand: "Koenigsegg",
  model: "Regera",
  years: 2,
  matriculationNbr: "LYF2EZ",
  autonomy: 200
}

describe('Cars', () => {
    beforeEach((done) => { //Before each test we empty the database
        Car.deleteMany({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET Car', () => {
        it('it should GET a car by the given id', (done) => {
            carExample.save((err, car) => {
                chai.request(server)
                .get('/cars/' + car.id)
                .send(car)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('brand');
                    res.body.should.have.property('model');
                    res.body.should.have.property('years');
                    res.body.should.have.property('matriculationNbr');
                    res.body.should.have.property('autonomy');
                    res.body.should.have.property('_id').eql(car.id);
                    done();
                });
            });
        });
    });
    /*
      * Test the /POST route
      */
    describe('/POST Car', () => {
        it('it should POST a car ', (done) => {
            chai.request(server)
                .post('/cars/')
                .send(carExample)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.issue.ops[0].should.have.property('brand');
                    res.body.issue.ops[0].should.have.property('model');
                    res.body.issue.ops[0].should.have.property('years');
                    res.body.issue.ops[0].should.have.property('matriculationNbr');
                    res.body.issue.ops[0].should.have.property('autonomy');
                    done();
                });
        });
    });
    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id Car', () => {
        it('it should UPDATE a car given the id', (done) => {

            carExample.save((err, car) => {
                chai.request(server)
                    .put('/cars/' + car.id)
                    .send({
                        brand: "Fiat", model: "Multipla GT V12 Electrique", years: "0", matriculationNbr: "SP33D",
                        autonomy: "2000"
                    })
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.car.should.have.property('brand').eql("Fiat");
                        res.body.car.should.have.property('model').eql("Multipla GT V12 Electrique");
                        res.body.car.should.have.property('years').eql("0");
                        res.body.car.should.have.property('matriculationNbr').eql("SP33D");
                        res.body.car.should.have.property('autonomy').eql("2000");
                        done();
                    });
            });
        });
    });
    /*
      * Test the /DELETE/:id route
      */
    describe('/DELETE/:id Issue', () => {
        it('it should DELETE a car given the id', (done) => {
            carExample.save((err, car) => {
                chai.request(server)
                    .delete('/cars/' + car.id)
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