"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = require("../connection");
const route = express_1.Router();
route.get('/', (req, res) => {
    connection_1.Student.findAll()
        .then((students) => {
        res.json(students);
    })
        .catch((err) => {
        console.log(err);
    });
});
route.post('/', (req, res) => {
    connection_1.Student.create({
        name: req.body.name
    })
        .then((student) => {
        var batches = req.body.batches.split(',');
        student.setBatches(batches);
    })
        .then(() => {
        console.log("student added");
        res.json("student added");
    });
});
route.use('/:id', (req, res, next) => {
    connection_1.Student.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((student) => {
        res.locals.student = student;
        next();
    })
        .catch((err) => {
        console.log(err);
    });
});
route.get('/:id', (req, res) => {
    res.json(res.locals.student);
});
route.get('/:id/batches', (req, res) => {
    res.locals.student.getBatches().then((batches) => {
        res.json(batches);
    });
});
exports.default = route;
