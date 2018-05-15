import express,{Router,Request} from 'express'
import {Course,Batch,Lecture,Student,Teacher,Subject} from '../connection'
import sequelize from 'sequelize'
const route:Router= Router()

route.get('/',(req,res)=>{
     Course.findAll()
    .then((courses)=>{
        res.json(courses)
    })
    .catch((err)=>{
        console.log(err);
    })
})

route.post('/',(req,res)=>{
    Course.create({name:req.body.name})
    .then(()=>{
        console.log("course added")
        res.json("course added")
    })
    .catch((err)=>{
        console.log(err);
    })
})


route.get('/:id',(req,res)=>{
     Course.findOne({
         where:{
             id:req.params.id
         }
     })
    .then((course)=>{
        res.json(course)
    })
    .catch((err)=>{
        console.log(err);
    })
})

route.put('/:id',(req,res)=>{
     Course.update(
            { name:req.body.name},
            { where: { id:req.params.id } }
            )
        .then(()=>{            
           res.sendStatus(200)
        })
        .catch((err)=>{
            console.log(err)
        })
})



route.get('/:id/batches',(req,res)=>{
     Batch.findAll({
         where:{
             courseId:req.params.id
         }
     })
    .then((batches)=>{
        res.json(batches)
    })
    .catch((err)=>{
        console.log(err);
    })
})

route.post('/:id/batches',(req,res)=>{
    Batch.create({name:req.body.name,startAt:req.body.startAt,courseId:req.params.id})
    .then(()=>{
        res.json("batch added")
    })
    .catch((err)=>{
        console.log(err)
    })
})

route.use('/:id/batches/:bid',(req,res,next)=>{
     Batch.findOne({
         where:{
             id:req.params.bid,
             courseId:req.params.id
         }
     })
    .then((batch)=>{
        res.locals.batch=batch;
        next()
    })
    .catch((err)=>{
        console.log(err);
    })
})

route.get('/:id/batches/:bid',(req,res)=>{
     Batch.findAll({
         where:{
             id:req.params.bid,
             courseId:req.params.id
         }
     })
    .then((batch)=>{
        res.json(batch)
       // res.locals.batch=batch;
        
    })
    .catch((err)=>{
        console.log(err);
    })
})

route.get('/:id/batches/:bid/lectures',(req,res)=>{
       Batch.findOne({
         where:{
             id:req.params.bid,
             courseId:req.params.id
         }
     }).then((batch)=>{
         if(batch){
              Lecture.findAll({
         where:{
             batchId:batch.id
          } ,
         include:[{
                model:Teacher,
                as:'teacher'
            },
            {
                model:Subject,
                as:'subject'
            }
        ]      
       })
     .then((lectures)=>{
        res.json(lectures)
       })}
    else{
        res.send()
    }
     })
      
   
    .catch((err)=>{
        console.log(err);
    })
})
route.get('/:id/batches/:bid/lectures/:lid',(req,res)=>{
    Lecture.findAll({
        where:{
             batchId:res.locals.batch.id,
             id:req.params.lid
          },
        include:[{
                model:Teacher,
                as:'teacher'
            },
            {
                model:Subject,
                as:'subject'
            }
        ]
    })
    .then((lecture)=>{
        res.json(lecture)
    })
    .catch((err)=>{
        console.log(err);
    })
})

route.get('/:id/batches/:bid/students',(req,res)=>{
      Batch.findOne({
         where:{
             id:req.params.bid,
             courseId:req.params.id
         }
     })
        .then((batch)=>{
            if(batch){
                     batch.getStudents().then((students)=>{
        res.json(students)
          })
            }
        else{
            res.send()
        }
            
        })
    
})


route.post('/:id/batches/:bid/lectures',(req,res)=>{
       Batch.findOne({
         where:{
             id:req.params.bid,
             courseId:req.params.id
         }
     }).then((batch)=>{
         if(batch){
              Lecture.create({
                    name:req.body.name,
                    subjectId:req.body.subjectId,
                    teacherId:req.body.teacherId,
                    batchId:batch.id
       })
     .then(()=>{
        res.json("lecture added")
       })}
    else{
        res.send()
    }
     })
      
   
    .catch((err)=>{
        console.log(err);
    })
})

route.post('/:id/batches/:bid/students',(req,res)=>{
     Batch.findOne({
         where:{
             id:req.params.bid,
             courseId:req.params.id
         }
     })
    .then((batch)=>{
        if(batch){
            Student.create({
        name: req.body.name
      })
       .then((student) => {
         student.setBatches(batch.id)
        }) 
       .then(() => {
        res.json("student added")
        })
        }
       else{
           res.send()
       }
    })
        
    
})

route.get('/:id/batches/:bid/teachers',(req,res)=>{
       Lecture.findAll({
           where:{
                batchId:res.locals.batch.id,
           },
            include:[{
                model:Teacher,
                as:'teacher'
            }]
       })
        .then((lectures)=>{
                var teachers:object[]=[];
                lectures.forEach(element => {
                    teachers.push(element.teacher)
                });
                res.json(teachers);
        })
        .catch((err)=>{
            console.log(err);
        })
})




export default route;