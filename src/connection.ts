import Sequelize from 'sequelize'


//const Sequelize=require('sequelize')
const db=new Sequelize({
    dialect:'sqlite',
    storage:'./nglearningManagement.db'
})

const Course=db.define('course',{
    name:{
        type:Sequelize.STRING(40),
        allowNull:false
    }
})
const Batch=db.define('batch',{
    name:{
        type:Sequelize.STRING(40),
        allowNull:false
    }
})
const Student=db.define<any,any>('student',{
    name:{
        type:Sequelize.STRING(40),
        allowNull:false
    }
})
const Lecture=db.define<any,any>('lecture',{
    name:{
        type:Sequelize.STRING(40),
        allowNull:false
    }
})
const Subject=db.define('subject',{
    name:{
        type:Sequelize.STRING(40),
        allowNull:false
    }
})
const Teacher=db.define('teacher',{
    name:{
        type:Sequelize.STRING(40),
        allowNull:false
    }
})
Batch.belongsTo(Course)
Subject.belongsTo(Course)
Teacher.belongsTo(Subject)
Lecture.belongsTo(Batch)
Lecture.belongsTo(Subject)
Lecture.belongsTo(Teacher)
Batch.belongsToMany(Student, {through: 'StudentBatch'});
Student.belongsToMany(Batch, {through: 'StudentBatch'});
// const Vendor=db.define('vendor',{
//     name:{
//         type:Sequelize.STRING(40),
//         allowNull:false
//     }
// })
// const Product=db.define('product',{
//     name:{
//         type:Sequelize.STRING(40),
//         allowNull:false
//     },
//     price:{
//         type:Sequelize.DECIMAL,
//         allowNull:false
//     }
// })
// const Cart=db.define<any,any>('cart',{
//     quantity:{
//         type:Sequelize.INTEGER,
//         defaultValue:1
//     }
// })
// const User=db.define<any,any>('user',{
//     username:{
//         type:Sequelize.STRING(30),
//         allowNull:false,
//         unique:true
//     },
//     password:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })
// Product.belongsTo(Vendor);
// Cart.belongsTo(Product);
// Cart.belongsTo(User);
// db.authenticate()
// .then(()=>db.sync())
// .then(()=>{
//     Vendor.bulkCreate([
//         {name:'Casewise'},
//         {name:'IBM'},
//         {name:'JadeEServices'},
//         {name:'SBuys'},
//         {name:'Ebay'}
//     ])
// })
// .catch((err)=>console.log(err))

// db.authenticate()
// .then(()=>db.sync())
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
// .then(()=>{
//     Student_Batch.bulkCreate([
//         {studentId:1,batchId:1},
//         {studentId:2,batchId:1},
//         {studentId:4,batchId:1},
//         {studentId:5,batchId:1}
//     ])
// })
// .catch((err)=>console.log(err))


export{
    db,
    Course,
    Subject,
    Teacher,
    Student,
    Batch,
    Lecture,
}