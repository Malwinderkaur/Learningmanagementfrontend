import express,{Router,Request} from 'express'
import {Student,Batch} from '../connection'

const route:Router= Router()

route.get('/',(req,res)=>{
    Student.findAll()
    .then((students)=>{
        res.json(students)
    })
    .catch((err)=>{
        console.log(err);
    })
})
route.post('/',(req,res)=>{
    Student.create({
        name: req.body.name
    })
    .then((student) => {
      var batches = req.body.batches.split(',')
     student.setBatches(batches)
    }) 
    .then(() => {
        console.log("student added")
        res.sendStatus(200)
     })
})
route.use('/:id',(req,res,next)=>{
    Student.findOne({
        where:{
            id:req.params.id
        }
    })
    .then((student)=>{
        res.locals.student=student;
        next()
    })
    .catch((err)=>{
        console.log(err);
    })
})

route.get('/:id',(req,res)=>{
   res.json(res.locals.student)
})

route.get('/:id/batches',(req,res)=>{
    res.locals.student.getBatches().then((batches)=>{
        res.json(batches)
    })
})
export default route;