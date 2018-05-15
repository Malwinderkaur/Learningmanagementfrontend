"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = require("../connection");
const route = express_1.Router();
route.get('/', (req, res) => {
    connection_1.Course.findAll()
        .then((courses) => {
        res.json(courses);
    })
        .catch((err) => {
        console.log(err);
    });
});
route.post('/', (req, res) => {
    connection_1.Course.create({ name: req.body.name })
        .then(() => {
        console.log("course added");
        res.json("course added");
    })
        .catch((err) => {
        console.log(err);
    });
});
route.get('/:id', (req, res) => {
    connection_1.Course.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((course) => {
        res.json(course);
    })
        .catch((err) => {
        console.log(err);
    });
});
route.put('/:id', (req, res) => {
    connection_1.Course.update({ name: req.body.name }, { where: { id: req.params.id } })
        .then(() => {
        res.sendStatus(200);
    })
        .catch((err) => {
        console.log(err);
    });
});
route.get('/:id/batches', (req, res) => {
    connection_1.Batch.findAll({
        where: {
            courseId: req.params.id
        }
    })
        .then((batches) => {
        res.json(batches);
    })
        .catch((err) => {
        console.log(err);
    });
});
route.post('/:id/batches', (req, res) => {
    connection_1.Batch.create({ name: req.body.name, startAt: req.body.startAt, courseId: req.params.id })
        .then(() => {
        res.json("batch added");
    })
        .catch((err) => {
        console.log(err);
    });
});
route.use('/:id/batches/:bid', (req, res, next) => {
    connection_1.Batch.findOne({
        where: {
            id: req.params.bid,
            courseId: req.params.id
        }
    })
        .then((batch) => {
        res.locals.batch = batch;
        next();
    })
        .catch((err) => {
        console.log(err);
    });
});
route.get('/:id/batches/:bid', (req, res) => {
    connection_1.Batch.findAll({
        where: {
            id: req.params.bid,
            courseId: req.params.id
        }
    })
        .then((batch) => {
        res.json(batch);
        // res.locals.batch=batch;
    })
        .catch((err) => {
        console.log(err);
    });
});
route.get('/:id/batches/:bid/lectures', (req, res) => {
    connection_1.Batch.findOne({
        where: {
            id: req.params.bid,
            courseId: req.params.id
        }
    }).then((batch) => {
        if (batch) {
            connection_1.Lecture.findAll({
                where: {
                    batchId: batch.id
                },
                include: [{
                        model: connection_1.Teacher,
                        as: 'teacher'
                    },
                    {
                        model: connection_1.Subject,
                        as: 'subject'
                    }
                ]
            })
                .then((lectures) => {
                res.json(lectures);
            });
        }
        else {
            res.send();
        }
    })
        .catch((err) => {
        console.log(err);
    });
});
route.get('/:id/batches/:bid/lectures/:lid', (req, res) => {
    connection_1.Lecture.findAll({
        where: {
            batchId: res.locals.batch.id,
            id: req.params.lid
        },
        include: [{
                model: connection_1.Teacher,
                as: 'teacher'
            },
            {
                model: connection_1.Subject,
                as: 'subject'
            }
        ]
    })
        .then((lecture) => {
        res.json(lecture);
    })
        .catch((err) => {
        console.log(err);
    });
});
route.get('/:id/batches/:bid/students', (req, res) => {
    connection_1.Batch.findOne({
        where: {
            id: req.params.bid,
            courseId: req.params.id
        }
    })
        .then((batch) => {
        if (batch) {
            batch.getStudents().then((students) => {
                res.json(students);
            });
        }
        else {
            res.send();
        }
    });
});
route.post('/:id/batches/:bid/lectures', (req, res) => {
    connection_1.Batch.findOne({
        where: {
            id: req.params.bid,
            courseId: req.params.id
        }
    }).then((batch) => {
        if (batch) {
            connection_1.Lecture.create({
                name: req.body.name,
                subjectId: req.body.subjectId,
                teacherId: req.body.teacherId,
                batchId: batch.id
            })
                .then(() => {
                res.json("lecture added");
            });
        }
        else {
            res.send();
        }
    })
        .catch((err) => {
        console.log(err);
    });
});
route.post('/:id/batches/:bid/students', (req, res) => {
    connection_1.Batch.findOne({
        where: {
            id: req.params.bid,
            courseId: req.params.id
        }
    })
        .then((batch) => {
        if (batch) {
            connection_1.Student.create({
                name: req.body.name
            })
                .then((student) => {
                student.setBatches(batch.id);
            })
                .then(() => {
                res.json("student added");
            });
        }
        else {
            res.send();
        }
    });
});
route.get('/:id/batches/:bid/teachers', (req, res) => {
    connection_1.Lecture.findAll({
        where: {
            batchId: res.locals.batch.id,
        },
        include: [{
                model: connection_1.Teacher,
                as: 'teacher'
            }]
    })
        .then((lectures) => {
        var teachers = [];
        lectures.forEach(element => {
            teachers.push(element.teacher);
        });
        res.json(teachers);
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.default = route;
