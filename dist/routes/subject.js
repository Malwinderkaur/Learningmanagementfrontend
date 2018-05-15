"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = require("../connection");
const route = express_1.Router();
route.get('/', (req, res) => {
    connection_1.Subject.findAll()
        .then((subjects) => {
        res.json(subjects);
    })
        .catch((err) => {
        console.log(err);
    });
});
route.post('/', (req, res) => {
    connection_1.Subject.create({ name: req.body.name, courseId: req.body.courseId })
        .then(() => {
        console.log("subject added");
        res.json("subject added");
    })
        .catch((err) => {
        console.log(err);
    });
});
route.get('/:id', (req, res) => {
    connection_1.Subject.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((subject) => {
        res.json(subject);
    })
        .catch((err) => {
        console.log(err);
    });
});
route.get('/:id/teachers', (req, res) => {
    connection_1.Teacher.findAll({
        where: {
            subjectId: req.params.id
        }
    })
        .then((teachers) => {
        res.json(teachers);
    })
        .catch((err) => {
        console.log(err);
    });
});
route.post('/:id/teachers', (req, res) => {
    connection_1.Teacher.create({ name: req.body.name, subjectId: req.params.id })
        .then(() => {
        console.log("teacher created");
        res.json("teacher created");
    })
        .catch((err) => {
        console.log(err);
    });
});
route.delete('/:id', (req, res) => {
    connection_1.Teacher.destroy({
        where: {
            subjectId: req.params.id
        }
    })
        .then(() => {
        connection_1.Subject.destroy({
            where: {
                id: req.params.id
            }
        });
    })
        .then(() => {
        console.log("subject deleted");
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.default = route;
