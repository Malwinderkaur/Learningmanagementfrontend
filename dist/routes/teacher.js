"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = require("../connection");
const route = express_1.Router();
route.get('/', (req, res) => {
    connection_1.Teacher.findAll()
        .then((teachers) => {
        res.json(teachers);
    })
        .catch((err) => {
        console.log(err);
    });
});
route.get('/:id', (req, res) => {
    connection_1.Teacher.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((teacher) => {
        res.json(teacher);
    })
        .catch((err) => {
        console.log(err);
    });
});
route.delete('/:id', (req, res) => {
    connection_1.Teacher.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
        console.log("teacher deleted");
        res.sendStatus(200);
    })
        .catch((err) => {
        console.log(err);
    });
});
route.get('/:id/batches', (req, res) => {
    connection_1.Lecture.findAll({
        where: {
            teacherId: req.params.id
        },
        include: [{
                model: connection_1.Batch,
                as: 'batch'
            }]
    })
        .then((lectures) => {
        var batches = [];
        lectures.forEach(lecture => {
            batches.push(lecture.batch);
        });
        res.json(batches);
    });
});
exports.default = route;
