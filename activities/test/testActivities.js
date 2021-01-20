/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
const Activity = require('../models/activities');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

let activityExample = {
    name: "Test", 
    description: "C'est une activité",  
    start: "01/02/2021", 
    end: "02/02/2021", 
    category: "Visite", 
    userId: "123456"
}

describe('Activities', () => {
    beforeEach((done) => { //Before each test we empty the database
        Activity.deleteMany({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET Activity', () => {
        it('it should GET an activity by the given id', (done) => {
            activityExample.save((err, activity) => {
                chai.request(server)
                .get('/activities/' + activity.id)
                .send(activity)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('description');
                    res.body.should.have.property('start');
                    res.body.should.have.property('end');
                    res.body.should.have.property('category');
                    res.body.should.have.property('userId');
                    res.body.should.have.property('_id').eql(activity.id);
                    done();
                });
            });
        });
    });

    describe('/GET Activity', () => {
        it('it should GET all activities', (done) => {
            activityExample.save((err, activity) => {
                chai.request(server)
                .get('/activities/')
                .send(activity)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('description');
                    res.body.should.have.property('start');
                    res.body.should.have.property('end');
                    res.body.should.have.property('category');
                    res.body.should.have.property('userId');
                    res.body.should.have.property('_id').eql(activity.id);
                    done();
                });
            });
        });
    });
    /*
      * Test the /POST route
      */
    describe('/POST Activity', () => {
        it('it should POST an activity ', (done) => {
            chai.request(server)
                .post('/activities/')
                .send(activityExample)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('description');
                    res.body.should.have.property('start');
                    res.body.should.have.property('end');
                    res.body.should.have.property('category');
                    res.body.should.have.property('userId');
                    done();
                });
        });
    });
    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id Activity', () => {
        it('it should UPDATE an activity given the id', (done) => {

            activityExample.save((err, activity) => {
                chai.request(server)
                    .put('/activities/' + activity.id)
                    .send({
                        name: "Test", description: "C'est une activité", start: "01/02/2021", end: "02/02/2021",
                        category: "Visite", userId: "123456", 
                    })
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name').eql("Test");
                        res.body.should.have.property('description').eql("C'est une activité");
                        res.body.should.have.property('start').eql("01/02/2021");
                        res.body.should.have.property('end').eql("02/02/2021");
                        res.body.should.have.property('category').eql("Visite");
                        res.body.should.have.property('userId').eql("123456");
                        done();
                    });
            });
        });
    });
    /*
      * Test the /DELETE/:id route
      */
    describe('/DELETE/:id Activity', () => {
        it('it should DELETE an activity given the id', (done) => {
            activityExample.save((err, activity) => {
                chai.request(server)
                    .delete('/activities/' + activity.id)
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