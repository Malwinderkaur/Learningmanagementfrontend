"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const course_1 = __importDefault(require("./routes/course"));
const student_1 = __importDefault(require("./routes/student"));
const subject_1 = __importDefault(require("./routes/subject"));
const teacher_1 = __importDefault(require("./routes/teacher"));
const connection_js_1 = require("./connection.js");
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
connection_js_1.db.authenticate()
    .then(() => connection_js_1.db.sync())
    .then(() => {
    //  Lecture.bulkCreate([
    //     {name:'L1',subjectId:1,batchId:1,teacherId:1},
    //     {name:'L2',subjectId:2,batchId:1,teacherId:4},
    //     {name:'L3',subjectId:1,batchId:1,teacherId:1},
    //     {name:'L4',subjectId:2,batchId:1,teacherId:5},
    //     {name:'L5',subjectId:3,batchId:1,teacherId:2}
    // ])
    // Batch.bulkCreate([
    //     {name:'2018 Summer',courseId:1,startAt:'2018-05-22'},
    //     {name:'2018 Spring',courseId:1,startAt:'2018-06-01'},
    //     {name:'2018 Fall',courseId:1,startAt:'2018-07-30'}
    // ])
});
// .then(()=>{
//     Course.bulkCreate([
//         {name:'Science'}
//     ])
// })
// .then(()=>{
//     Batch.bulkCreate([
//         {name:'2018 Summer',courseId:1},
//         {name:'2018 Spring',courseId:1},
//         {name:'2018 Fall',courseId:1}
//     ])
// })
// .then(()=>{
//     Subject.bulkCreate([
//         {name:'Physics',courseId:1},
//         {name:'Chemistry',courseId:1},
//         {name:'Biology',courseId:1}
//     ])
// })
// .then(()=>{
//     Teacher.bulkCreate([
//         {name:'Tom',subjectId:1},
//         {name:'Dick',subjectId:3},
//         {name:'Harry',subjectId:2},
//         {name:'Jane',subjectId:2},
//         {name:'Marry',subjectId:2},
//         {name:'Trudy',subjectId:1}
//     ])
// })
// .then(()=>{
//     Lecture.bulkCreate([
//         {name:'L1',subjectId:1,batchId:1,teacherId:1},
//         {name:'L2',subjectId:2,batchId:1,teacherId:4},
//         {name:'L3',subjectId:1,batchId:1,teacherId:1},
//         {name:'L4',subjectId:2,batchId:1,teacherId:5},
//         {name:'L5',subjectId:3,batchId:1,teacherId:2}
//     ])
// })
// .then(()=>{
//     Student.bulkCreate([
//         {name:'Kate'},
//         {name:'John'},
//         {name:'Sam'},
//         {name:'Nancy'},
//         {name:'Aron'},
//         {name:'Agatha'}
//     ])
// })
// .catch((err)=>console.log(err))
const routes = {
    students: student_1.default,
    subjects: subject_1.default,
    courses: course_1.default,
    teachers: teacher_1.default
};
app.get('/batches', (req, res) => {
    connection_js_1.Batch.findAll()
        .then((batches) => {
        res.json(batches);
    })
        .catch((err) => {
        console.log(err);
    });
});
app.use('/students', routes.students);
app.use('/teachers', routes.teachers);
app.use('/courses', routes.courses);
app.use('/subjects', routes.subjects);
app.listen(8181, function () {
    console.log("server is running at port 8181");
});
