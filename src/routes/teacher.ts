import express,{Router,Request} from 'express'
import {Subject,Teacher,Lecture,Batch} from '../connection'
const route:Router= Router()

route.get('/',(req,res)=>{
    Teacher.findAll()
    .then((teachers)=>{
        res.json(teachers)
    })
    .catch((err)=>{
        console.log(err);
    })
})

route.get('/:id',(req,res)=>{
    Teacher.findOne({
        where:{
            id:req.params.id
        }
    })
    .then((teacher)=>{
        res.json(teacher)
    })
    .catch((err)=>{
        console.log(err);
    })
})

route.delete('/:id',(req,res)=>{
    Teacher.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(()=>{
        console.log("teacher deleted")
        res.sendStatus(200)
    })
    .catch((err)=>{
        console.log(err)
    })
})

route.get('/:id/batches',(req,res)=>{
        Lecture.findAll({
            where:{
                teacherId:req.params.id
            },
            include:[{
                model:Batch,
                as:'batch'
            }]
        })
        .then((lectures)=>{
            var batches:object[]=[];
            lectures.forEach(lecture => {
                batches.push(lecture.batch)                
            });
            res.json(batches)
        })
 })

export default route;