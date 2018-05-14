/// <reference types="sequelize" />
import Sequelize from 'sequelize';
declare const db: Sequelize.Sequelize;
declare const Course: Sequelize.Model<{}, {}>;
declare const Batch: Sequelize.Model<{}, {}>;
declare const Student: Sequelize.Model<any, any>;
declare const Lecture: Sequelize.Model<any, any>;
declare const Subject: Sequelize.Model<{}, {}>;
declare const Teacher: Sequelize.Model<{}, {}>;
export { db, Course, Subject, Teacher, Student, Batch, Lecture };
