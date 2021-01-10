/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
const Visit = require('../models/visit');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

let visitExample = {
    name: "Visite1",
    address: "Cinema Bordeaux",
    latitude: 1,
    longitude: 2,
    date: "20/09/21"
}

describe('Visits', () => {
    beforeEach((done) => { //Before each test we empty the database
        Visit.deleteMany({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET Visit', () => {
        it('it should GET a visit by the given id', (done) => {
            visitExample.save((err, visit) => {
                chai.request(server)
                .get('/visits/' + visit.id)
                .send(visit)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('address');
                    res.body.should.have.property('latitude');
                    res.body.should.have.property('longitude');
                    res.body.should.have.property('date');
                    res.body.should.have.property('_id').eql(visit.id);
                    done();
                });
            });
        });
    });
    /*
      * Test the /POST route
      */
    describe('/POST Visit', () => {
        it('it should POST a visit ', (done) => {
            chai.request(server)
                .post('/visits/')
                .send(visitExample)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('address');
                    res.body.should.have.property('latitude');
                    res.body.should.have.property('longitude');
                    res.body.should.have.property('date');
                    done();
                });
        });
    });
    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id Visit', () => {
        it('it should UPDATE a visit given the id', (done) => {

            visitExample.save((err, visit) => {
                chai.request(server)
                    .put('/visits/' + visit.id)
                    .send({
                        name: "Visite2", address: "Theatre Bordeaux", latitude: 6, longitude: 7,
                        date: "11/09/21"
                    })
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.visit.should.have.property('name').eql("Visite2");
                        res.body.visit.should.have.property('address').eql("Theatre Bordeaux");
                        res.body.visit.should.have.property('latitude').eql("6");
                        res.body.visit.should.have.property('longitude').eql("7");
                        res.body.visit.should.have.property('date').eql("11/09/21");
                        done();
                    });
            });
        });
    });
    /*
      * Test the /DELETE/:id route
      */
    describe('/DELETE/:id Visit', () => {
        it('it should DELETE a visit given the id', (done) => {
            visitExample.save((err, visit) => {
                chai.request(server)
                    .delete('/visits/' + visit.id)
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