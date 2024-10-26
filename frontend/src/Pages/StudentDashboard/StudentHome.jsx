import React, { useEffect, useState } from 'react'
import student from "../../assets/student.png"
import teacher from "../../assets/teachers.png"
import courses from "../../assets/courses.png"
import fee from "../../assets/fee.png"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const StudentHome = () => {

    const [showNoticeTodo, setShowNoticeTodo] = useState([])
    const [studentCount, setStudentCount] = useState(0);
    const [subjectCount, setSubjectCount] = useState(0);
    const [teacherCount, setTeacherCount] = useState(0);


    const fetchSubjectCount = async () => {
        try {
            const studentData = localStorage.getItem("Student");
            if (!studentData) {
                toast.error("No student data found. Please log in.");
                return;
            }

            const student = JSON.parse(studentData);
            const sclassName = student.sclassName?._id;

            const response = await axios.get(`http://localhost:5000/Subject/ClassSubjects/${sclassName}`); 
            if (Array.isArray(response.data)) {
                setSubjectCount(response.data.length);
            } else {
                toast.error("Failed to fetch subjects.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while fetching subjects.");
        }
    };
    const fetchStudentCount = async () => {
        try {
            const studentData = localStorage.getItem("Student");
            if (!studentData) {
                toast.error("No student data found. Please log in.");
                return;
            }

            const student = JSON.parse(studentData);
            const sclassName = student.sclassName._id;
            console.log("student: ", sclassName)

            const response = await axios.get(`http://localhost:5000/Student/Student/${sclassName}`); 
            console.log("student response: ", response.data)
            if (Array.isArray(response.data)) {
                setStudentCount(response.data.length);
            } else {
                toast.error("Failed to fetch subjects.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while fetching subjects.");
        }
    };

    useEffect(() => {
        const getNoticeTodoData = localStorage.getItem("noticeTodo")
        if (getNoticeTodoData) {
            const parsedData = JSON.parse(getNoticeTodoData)
            if (Array.isArray(parsedData)) {
                setShowNoticeTodo(parsedData.map((noticeTodoData) => ({
                    title: noticeTodoData.text.noticeTitle,
                    detail: noticeTodoData.text.noticeDetail,
                    date: noticeTodoData.text.noticeDate
                })))
            } else if (parsedData && parsedData.text) {
                setShowNoticeTodo([{
                    title: parsedData.text.noticeTitle,
                    detail: parsedData.text.noticeDetail,
                    date: parsedData.text.noticeDate
                }]);
            }
        }

        // Fetching teacher count
        const teachersData = localStorage.getItem("teacherTodo");
        if (teachersData) {
            const parsedTeachers = JSON.parse(teachersData);
            setTeacherCount(Array.isArray(parsedTeachers) ? parsedTeachers.length : 0);
        }
        fetchStudentCount()
        fetchSubjectCount()
    }, [])

    return (
        <>
            <div className="w-full flex flex-wrap md:flex-nowrap md:flex-col h-auto text-3xl bg-zinc-800">
                <div className='flex w-full flex-wrap md:flex-nowrap justify-center'>
                    <div className='box-1 h-64 mx-5 my-2 mt-20  md:h-60 md:w-1/2  md:m-5 flex flex-col items-center  border-2 border-zinc-400 shadow-2xl shadow-black-900 px-10 md:px-0 bg-zinc-700 rounded-3xl'>
                        <img className='mx-auto my-4 w-20 h-20' src={student} alt="student" />
                        <span className=''>Total Students</span><br />
                        <span className='text-green-600'>{studentCount}</span>
                    </div>
                    <div className='box-1 h-64 mx-5 my-2 mt-20  md:h-60 md:w-1/2  md:m-5 flex flex-col items-center  border-2 border-zinc-400 shadow-2xl shadow-black-900 px-10 md:px-0 bg-zinc-700 rounded-3xl'>
                        <img className='mx-auto my-4 w-20 h-20' src={courses} alt="courses" />
                        <span >Total Subject</span><br />
                        <span className='text-green-600'>{subjectCount}</span>
                    </div>
                    <div className='box-1 h-64 mx-5 my-2 mt-20  md:h-60 md:w-1/2  md:m-5 flex flex-col items-center  border-2 border-zinc-400 shadow-2xl shadow-black-900 px-10 md:px-0 bg-zinc-700 rounded-3xl'>
                        <img className='mx-auto my-4 w-20 h-20' src={teacher} alt="teacher" />
                        <span>Total Teachers</span><br />
                        <span className='text-green-600'>{teacherCount}</span>
                    </div>
                    <div className='box-1 h-64 mx-5 my-2 mt-20  md:h-60 md:w-1/2  md:m-5 flex flex-col items-center  border-2 border-zinc-400 shadow-2xl shadow-black-900 px-10 md:px-0 bg-zinc-700 rounded-3xl'>
                        <img className='mx-auto my-4 w-20 h-20' src={fee} alt="fee collection" />
                        <span>Total Fees</span><br />
                        <span className='text-green-600'>24,000</span>
                    </div>
                </div>
                <span className=' mt-20 -mb-14 mx-5 cursor-pointer'>  <Link to="/admin/notices"><u>Add Notice: </u> </Link> </span>
                {showNoticeTodo.map((todoData, index) => (<div className='mt-20 mx-5 px-5 py-10 border-2 border-black-900 shadow-2xl shadow-black-900' key={index}>
                    <span className=''>Notice: {todoData.title || "N/A"}</span>
                    <p className=' text-sm italic'>Date: {todoData.date || "N/A"}</p>
                    <p className=' text-xl mt-5 italic'>{todoData.detail || "N/A"}</p>
                </div>))}
            </div>
        </>
    )
}

export default StudentHome