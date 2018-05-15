import express from 'express'
import path from 'path'
import courseRoute from './routes/course'
import studentRoute from './routes/student'
import subjectRoute from './routes/subject'
import teacherRoute from './routes/teacher'
import {db,Course,Teacher,Batch,Student,Subject,Lecture} from './connection.js'
const app=express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',express.static(path.join(__dirname,'..','public')))


db.authenticate()
.then(()=>db.sync())
.then(()=>{
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
    
})

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
const routes={
    students:studentRoute,
    subjects:subjectRoute,
    courses:courseRoute,
   teachers:teacherRoute
}
app.get('/batches',(req,res)=>{
    Batch.findAll()
    .then((batches)=>{
        res.json(batches)
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.use('/students',routes.students)
app.use('/teachers',routes.teachers)
app.use('/courses',routes.courses)
app.use('/subjects',routes.subjects)
app.listen(8181,function(){
    console.log("server is running at port 8181")
});