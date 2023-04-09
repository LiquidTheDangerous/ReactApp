import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import { Box, Button } from '@mui/material';
import { BaseTable } from '../BaseTable';
import Lecturer from '../../Querys/Lecturer';
import BaseTableQuery from '../BaseTableQuery';
import Faculty from '../../Querys/Faculty';
import DialogForm from '../../DialogForm';


const FacultyTable = () => {
    /**            <DialogForm onClose={() => {
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
                                type: "textField",
                                name: "Name",
                                onChange: (event) => { setStudentName(event.target.value) },
                                required: true
                            },
                            {
                                type: "textField",
                                name: "Surname",
                                onChange: (event) => { setStudentSurname(event.target.value) },
                                required: true
                            },
                            {
                                type: "textField",
                                name: "Patronymic",
                                onChange: (event) => { setStudentPatronymic(event.target.value) },
                                required: false
                            },
                        ]
                    }
                }> */
    const dialogRef = useRef()
    const tableRef = useRef()
    const [facultyName, setFacultyName] = useState('')
    const [facultyDescription, setFacultyDescription] = useState('')
    const onSubmit = async (event, reason) => {
        if (facultyName === undefined || facultyName === null || facultyName === '') {
            return
        }
        event.preventDefault()
        await Faculty.put({
            name: facultyName,
            description: facultyDescription
        })
        await tableRef.current.updateTable()
        dialogRef.current.setOpen(false)
    }
    const onProcessRowUpdate = (newRow, oldRow) => {
        const updatedRow = { ...newRow, isNew: false };
        console.log(newRow)
        Faculty.update({
            id: newRow.id,
            name: newRow.name,
            description: newRow.description
        })
        return updatedRow
    }

    return (
        <div>
            <Box sx={{ height: 400, width: '100%' }}>
                <BaseTableQuery editable={{
                    name: true,
                    description: true
                }}
                    ref={tableRef}
                    processRowUpdate={onProcessRowUpdate}
                    onProcessRowUpdateError={(err) => { }}
                    callback={Faculty.getAll}
                    widthComponents={{ description: "500" }} />
            </Box>
            <Button onClick={() => { dialogRef.current.setOpen(true) }}>Create</Button>
            <DialogForm
                ref={dialogRef}
                onSubmit={onSubmit}

                dialogElements={
                    {
                        elements: [
                            {
                                type: "textField",
                                name: "Name",
                                onChange: (event) => { setFacultyName(event.target.value) },
                                value: facultyName,
                                required: true
                            },
                            {
                                type: "textField",
                                name: "Description",
                                onChange: (event) => { setFacultyDescription(event.target.value) },
                                value: facultyDescription,
                                required: false
                            }
                        ]
                    }
                }>
            </DialogForm>
        </div>
    )
}

export default FacultyTable
