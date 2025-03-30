
require('dotenv').config(); 

const CONFIG = {
    passKeys: {
        "1": { 
            student: process.env.EXAM_1_STUDENT_KEY, 
            teacher: process.env.EXAM_1_TEACHER_KEY 
        },
        "2": { 
            student: process.env.EXAM_2_STUDENT_KEY, 
            teacher: process.env.EXAM_2_TEACHER_KEY 
        },
        "3": { 
            student: process.env.EXAM_3_STUDENT_KEY, 
            teacher: process.env.EXAM_3_TEACHER_KEY 
        },
        "4": { 
            student: process.env.EXAM_4_STUDENT_KEY, 
            teacher: process.env.EXAM_4_TEACHER_KEY 
        },
        "5": { 
            student: process.env.EXAM_5_STUDENT_KEY, 
            teacher: process.env.EXAM_5_TEACHER_KEY 
        }
    },
    pageRedirects: {
        "1": { student: "oldexam1.html", teacher: "oldexam1.html" },
        "2": { student: "oldexam2.html", teacher: "oldexam2.html" },
        "3": { student: "oldexam3.html", teacher: "oldexam3.html" },
        "4": { student: "oldexam4.html", teacher: "oldexam4.html" },
        "5": { student: "oldexam5.html", teacher: "oldexam5.html" }
    }
};

module.exports = CONFIG;