import express,{Router,Request} from 'express'
import {Subject,Teacher} from '../connection'
const route:Router= Router()

route.get('/',(req,res)=>{
    Subject.findAll()
    .then((subjects)=>{
        res.json(subjects)
    })
    .catch((err)=>{
        console.log(err);
    })
})
route.post('/',(req,res)=>{
    Subject.create({name:req.body.name,courseId:req.body.courseId})
    .then(()=>{
        console.log("subject added")
        res.json("subject added")
    })
    .catch((err)=>{
        console.log(err)
    })
})
route.get('/:id',(req,res)=>{
    Subject.findOne({
        where:{
            id:req.params.id
        }
    })
    .then((subject)=>{
        res.json(subject)
    })
    .catch((err)=>{
        console.log(err);
    })
})
route.get('/:id/teachers',(req,res)=>{
    Teacher.findAll({
        where:{
            subjectId:req.params.id
        }
    })
    .then((teachers)=>{
        res.json(teachers)
    })
    .catch((err)=>{
        console.log(err);
    })
})

route.post('/:id/teachers',(req,res)=>{
    Teacher.create({name:req.body.name,subjectId:req.params.id})
    .then(()=>{
        console.log("teacher created")
        res.json("teacher created")
    })
     .catch((err)=>{
        console.log(err);
    })
})

route.delete('/:id',(req,res)=>{
    Teacher.destroy({
        where:{
            subjectId:req.params.id
        }
    })
    .then(()=>{
        Subject.destroy({
        where:{
            id:req.params.id
        }
        })
    })
    .then(()=>{
        console.log("subject deleted")
    })
    .catch((err)=>{
        console.log(err);
    })
})

export default route;