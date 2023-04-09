import React, { useEffect, useRef, useState } from 'react'
import { BaseTable } from '../BaseTable'
import BaseTableQuery from '../BaseTableQuery'
import Department from '../../Querys/Department'
import { useFetching } from '../../Hooks/useFetching'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, Input, InputLabel, OutlinedInput, Select, TextField, MenuItem } from '@mui/material'
import Faculty from '../../Querys/Faculty'
import Student from '../../Querys/Student';
import DialogForm from '../../DialogForm'
import StudyGroup from '../../Querys/StudyGroup'
import axios from 'axios'


// React.forwardRef(({ buttonTitle, title, onOpen, onClose, onSubmit, dialogElements }, ref)
{/* <DialogForm dialogElements={
              {
                elements:[
                  {
                    type:"selector",
                    name:"Age",
                    getOptions: ()=>{return ["1","2","3"]},
                    showOption: (obj)=>{return obj},
                    getValue: (obj)=>{return obj},
                    onChange: (event)=>{console.log(event.target.value)},
                    required:true
                  },
                  {
                    type:"textField",
                    name:"test",
                    onChange:(event)=>{console.log(event.target.value)},
                    required:false
                  }
                ]
              }
            }> */}
const StudentFullDescriptionTable = () => {
    const dialogRef = React.useRef();
    const tableRef = React.useRef();
    const dataFetchedRef = useRef(false)
    const [facultyData, setFacultyData] = useState([])
    const [departmentData, setDepartmentData] = useState([])
    const [studyGroupData, setStudyGroupData] = useState([])

    const [fetchDepartmentData, isDepartmentDataLoading, departmentFetchError] = useFetching(async () => {
        const response = await Department.getAll()
        setDepartmentData(response)
    })

    const [fetchFacultyData, isFacultyLoading, facultyFethcError] = useFetching(async () => {
        const response = await Faculty.getAll()
        setFacultyData(response)
    })

    const [fetchStudyGroupData, isStudyGroupDataLoading, studyGroupDataFetchErrot] = useFetching(async () => {
        const response = await StudyGroup.getAllFullView()
        setStudyGroupData(response)
    })
    const [facultyId, setFacultyId] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [studyGroupId, setStudyGroupId] = useState('')
    const [studentName, setStudentName] = useState('')
    const [studentSurname, setStudentSurname] = useState('')
    const [studentPatronymic, setStudentPatronymic] = useState('')

    useEffect(() => {
        if (dataFetchedRef.current) {
            return
        }
        dataFetchedRef.current = true
        fetchDepartmentData()
        fetchFacultyData()
        fetchStudyGroupData()
    })
    // axios.put("https://localhost:8080/student/update/5", {
    //     id: 5,
    //     name: "Александр",
    //     surname: "Накаряков",
    //     patronymic: "Андреевич",
    //     studyGroupId: 1
    // })

    const onSubmit = async (event, reason) => {
        if (studyGroupId === undefined || studyGroupId === null || studyGroupId === '') {
            return
        }
        if (studentName === undefined || studentName === null || studentName === '') {
            return
        }
        if (studentSurname === undefined || studentSurname === null || studentSurname === '') {
            return
        }
        event.preventDefault()
        await Student.put({
            studyGroupId: studyGroupId,
            name: studentName,
            surname: studentSurname,
            patronymic: studentPatronymic
        })
        tableRef.current.updateTable()
        dialogRef.current.setOpen(false)

    }

    return (
        <Box sx={{ height: 400, width: '500' }}>
            <BaseTableQuery
                ref={tableRef}
                getRowsIdCallback={(obj) => { return obj.studentId }}
                callback={Student.getAllFullDescription}
                widthComponents={{ patronymic: 200 }}
                editable={{
                    name:true,
                    surname:true,
                    patronymic:true
                }} 
                processRowUpdate={(newRow,oldRow)=>{
                    const updatedRow = { ...newRow, isNew: false };
                    // console.log(updatedRow)
                    Student.update({
                        id: newRow.studentId,
                        name: newRow.name,
                        surname: newRow.surname,
                        patronymic: newRow.patronymic,
                        studyGroupId: newRow.groupId
                    })
                    return updatedRow
                }}
                onProcessRowUpdateError={(err)=>{

                }}>
            </BaseTableQuery>
            <Button onClick={() => { dialogRef.current.setOpen(true); }}>{"Create"}</Button>
            <DialogForm onClose={() => {
                setFacultyId('')
                setDepartmentId('')
                setStudyGroupId('')
                setStudentName('')
                setStudentSurname('')
                setStudentPatronymic('')
            }}
                onSubmit={onSubmit}
                ref={dialogRef}
                title="Enter data"
                dialogElements={
                    {
                        elements: [
                            {
                                type: "selector",
                                name: "Faculty",
                                value: facultyId,
                                getOptions: () => { return facultyData },
                                showOption: (obj) => { return obj.name },
                                getValue: (obj) => { return obj.id },
                                onChange: (event) => { setFacultyId(Number(event.target.value) || '') },
                                required: true
                            },
                            {
                                type: "selector",
                                name: "Department",
                                value: departmentId,
                                getOptions: () => { return departmentData.filter((obj) => { return obj.facultyId === facultyId }) },
                                showOption: (obj) => { return obj.name },
                                getValue: (obj) => { return obj.id },
                                onChange: (event) => { setDepartmentId(Number(event.target.value) || '') },
                                isDisabled: () => { return facultyId === undefined || facultyId === null || facultyId === '' },
                                required: true
                            },
                            {
                                type: "selector",
                                name: "Study group",
                                value: studyGroupId,
                                getOptions: () => { return studyGroupData.filter((obj) => { return obj.departmentId === departmentId }) },
                                showOption: (obj) => { return obj.groupName },
                                getValue: (obj) => { return obj.groupId },
                                onChange: (event) => { setStudyGroupId(Number(event.target.value) || '') },
                                isDisabled: () => { return departmentId === undefined || departmentId === null || departmentId === '' },
                                required: true
                            },
                            {
                                type: "textField",
                                name: "Name",
                                value: studentName,
                                onChange: (event) => { setStudentName(event.target.value) },
                                required: true
                            },
                            {
                                type: "textField",
                                name: "Surname",
                                value: studentSurname,
                                onChange: (event) => { setStudentSurname(event.target.value) },
                                required: true
                            },
                            {
                                type: "textField",
                                name: "Patronymic",
                                value: studentPatronymic,
                                onChange: (event) => { setStudentPatronymic(event.target.value) },
                                required: false
                            },
                        ]
                    }
                }>
            </DialogForm>
        </Box>
    )
}

export default StudentFullDescriptionTable