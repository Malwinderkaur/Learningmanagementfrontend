"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
//const Sequelize=require('sequelize')
const db = new sequelize_1.default({
    dialect: 'sqlite',
    storage: './nglearningManagement.db'
});
exports.db = db;
const Course = db.define('course', {
    name: {
        type: sequelize_1.default.STRING(40),
        allowNull: false
    }
});
exports.Course = Course;
const Batch = db.define('batch', {
    name: {
        type: sequelize_1.default.STRING(40),
        allowNull: false
    },
    startAt: {
        type: sequelize_1.default.DATEONLY,
        allowNull: false
    }
});
exports.Batch = Batch;
const Student = db.define('student', {
    name: {
        type: sequelize_1.default.STRING(40),
        allowNull: false
    }
});
exports.Student = Student;
const Lecture = db.define('lecture', {
    name: {
        type: sequelize_1.default.STRING(40),
        allowNull: false
    }
});
exports.Lecture = Lecture;
const Subject = db.define('subject', {
    name: {
        type: sequelize_1.default.STRING(40),
        allowNull: false
    }
});
exports.Subject = Subject;
const Teacher = db.define('teacher', {
    name: {
        type: sequelize_1.default.STRING(40),
        allowNull: false
    }
});
exports.Teacher = Teacher;
Batch.belongsTo(Course);
Subject.belongsTo(Course);
Teacher.belongsTo(Subject);
Lecture.belongsTo(Batch);
Lecture.belongsTo(Subject);
Lecture.belongsTo(Teacher);
Batch.belongsToMany(Student, { through: 'StudentBatch' });
Student.belongsToMany(Batch, { through: 'StudentBatch' });
