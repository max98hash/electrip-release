/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
const Traject = require('../models/traject');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

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
            var trajectExampleModelGet = new Traject({
                name: "Test",
                startCoord: [1, 2],
                startName: "Bordeaux",
                endCoord: [2, 3],
                endName: "Mars",
                userId: "123456",
                distance: 20,
                date : "2021-01-20T21:23:58.933Z",
                carId: "123555",
                carName: "Tesla"
            });
            trajectExampleModelGet.save((err, traject) => {
                chai.request(server)
                .get('/trajects/' + traject.id)
                .send(traject)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('startCoord');
                    res.body.should.have.property('startName');
                    res.body.should.have.property('endCoord');
                    res.body.should.have.property('endName');
                    res.body.should.have.property('userId').eql("123456");
                    res.body.should.have.property('distance');
                    res.body.should.have.property('date');
                    res.body.should.have.property('carId');
                    res.body.should.have.property('carName');
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
                .post('/trajects/create')
                .send({
                    name: "Test",
                    startCoord: [1, 2],
                    startName: "Bordeaux",
                    endCoord: [2, 3],
                    endName: "Mars",
                    userId: "123456",
                    distance: 20,
                    date : "2021-01-20T21:23:58.933Z",
                    carId: "123555",
                    carName: "Tesla"
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('startCoord');
                    res.body.should.have.property('startName');
                    res.body.should.have.property('endCoord');
                    res.body.should.have.property('endName');
                    res.body.should.have.property('userId');
                    res.body.should.have.property('distance');
                    res.body.should.have.property('date');
                    res.body.should.have.property('carId');
                    res.body.should.have.property('carName');
                    done();
                });
        });
    });
    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id Traject', () => {
        it('it should UPDATE a traject given the id', (done) => {
            var trajectExampleModelUpdate = new Traject({
                name: "Test",
                startCoord: [1, 2],
                startName: "Bordeaux",
                endCoord: [2, 3],
                endName: "Mars",
                userId: "123456",
                distance: 20,
                date : "2021-01-20T21:23:58.933Z",
                carId: "123555",
                carName: "Tesla"
            });
            trajectExampleModelUpdate.save((err, traject) => {
                chai.request(server)
                    .put('/trajects/' + traject.id)
                    .send({
                        name: "Test", startCoord: [1, 2], startName: "Virtual", endCoord: [3, 4],
                        endName: "Insanity", userId: "123456", distance: 20, date : "2021-01-20T21:23:58.933Z", carId: "123555", carName: "Alpine"
                    })
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name').eql("Test");
                        res.body.should.have.property('startCoord').eql([1, 2]);
                        res.body.should.have.property('startName').eql("Virtual");
                        res.body.should.have.property('endCoord').eql([3, 4]);
                        res.body.should.have.property('endName').eql("Insanity");
                        res.body.should.have.property('userId').eql("123456");
                        res.body.should.have.property('distance').eql(20);
                        res.body.should.have.property('date').eql("2021-01-20T21:23:58.933Z");
                        res.body.should.have.property('carId').eql("123555");
                        res.body.should.have.property('carName').eql("Alpine");
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
            var trajectExampleModelDelete = new Traject({
                name: "Test",
                startCoord: [1, 2],
                startName: "Bordeaux",
                endCoord: [2, 3],
                endName: "Mars",
                userId: "123456",
                distance: 20,
                date : "2021-01-20T21:23:58.933Z",
                carId: "123555",
                carName: "Tesla"
            });
            trajectExampleModelDelete.save((err, traject) => {
                chai.request(server)
                    .del('/trajects/' + traject.id)
                    .end((err, res) => {
                        expect(err).to.be.null;
                        res.should.have.status(201);
                        done();
                    });
            });
        });
    });   
    /*
     * Test the /GET/user/:userId/:dateBeg/:dateEnd route
     */
    describe('/GET', () => {
        it('it should GET all trajects between two given dates', (done) => {
            var trajectExampleModelTwoDates = new Traject({
                name: "Test",
                startCoord: [1, 2],
                startName: "Bordeaux",
                endCoord: [2, 3],
                endName: "Mars",
                userId: "123456",
                distance: 20,
                date : "2021-01-20T21:23:58.933Z",
                carId: "123555",
                carName: "Tesla"
            });
            var trajectExampleModelTwoOutOfDates = new Traject({
                name: "TestRetour",
                startCoord: [2, 3],
                startName: "Mars",
                endCoord: [1, 2],
                endName: "Bordeaux",
                userId: "123456",
                distance: 20,
                date : "2021-01-30T21:23:58.933Z",
                carId: "123555",
                carName: "Tesla"
            });
            trajectExampleModelTwoOutOfDates.save();
            trajectExampleModelTwoDates.save((err, traject) => {
                chai.request(server)
                .get('/trajects/user/' + traject.userId + "/2021-01-15T21:23:58.933Z" + "/2021-01-25T21:23:58.933Z")
                .send(traject)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.property('length', 1);
                    res.body[0].should.have.property('name').eql("Test");
                    res.body[0].should.have.property('_id').eql(traject.id);
                    done();
                });
            });
        });
    });
});