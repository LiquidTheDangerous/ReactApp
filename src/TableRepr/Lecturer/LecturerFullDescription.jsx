import React, { useEffect, useRef, useState } from 'react'
import { BaseTable } from '../BaseTable'
import BaseTableQuery from '../BaseTableQuery'
import Department from '../../Querys/Department'
import { useFetching } from '../../Hooks/useFetching'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, Input, InputLabel, OutlinedInput, Select, TextField, MenuItem } from '@mui/material'
import Faculty from '../../Querys/Faculty'
import Lecturer from '../../Querys/Lecturer';
import AcademicTitle from '../../Querys/AcademicTitle'


const LecturerFullDescription = () => {

    const tableRef = React.useRef();

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const dataFetchedRef = useRef(false)
    const [departmentData, setDepartmentdata] = useState([])
    const [titleData, setTitleData] = useState([])
    const [facultyData, setFacultyData] = useState([])

    const [fetchDepartmentData, isDepartmentDataLoading, departmentFetchError] = useFetching(async () => {
        const response = await Department.getAll()
        setDepartmentdata(response)
    })

    const [fetchFacultyData, isFacultyLoading, facultyFethcError] = useFetching(async () => {
        const response = await Faculty.getAll()
        setFacultyData(response)
    })

    const [fetchTitleData, isTitleLoading, titleFethcError] = useFetching(async () => {
        const response = await AcademicTitle.getAll()
        setTitleData(response)
    })

    useEffect(() => {
        if (dataFetchedRef.current) {
            return
        }
        dataFetchedRef.current = true
        fetchFacultyData()
        fetchDepartmentData()
        fetchTitleData()
    })

    const [facultyId, setFacultyId] = React.useState('');
    const [departmentId, setDepartmentId] = React.useState('');
    const [titleId, setTitleId] = useState('')
    const [lecturerName, setLecturerName] = useState('')
    const [lecturerSurname, setLecturerSurname] = useState('')
    const [lecturerPatronymic, setLecturerPatronymic] = useState('')


    const handleSubmit = async (event, reason) => {
        if (lecturerName === undefined || lecturerName === '' || lecturerName === null) {
            return;
        }
        if (lecturerSurname === undefined || lecturerSurname === '' || lecturerSurname === null) {
            return;
        }
        if (titleId === undefined || titleId === '' || titleId === null) {
            return;
        }
        if (departmentId === undefined || departmentId === '' || departmentId === null) {
            return;
        }
        event.preventDefault()
        const response = await Lecturer.put({
            name: lecturerName,
            surname: lecturerSurname,
            patronymic: lecturerPatronymic,
            academicTitleId: titleId,
            departmentId: departmentId,
        })
        await tableRef.current.updateTable()
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    }

    return (
        <div>
            <Box sx={{ height: 400, width: '500' }}>
                <BaseTableQuery ref={tableRef} widthComponents={{title:300}} callback={Lecturer.getFullDescription}></BaseTableQuery>
            </Box>
            <Button onClick={() => { setOpen(true) }}>Create</Button>
            {/* onClose={handleClose} */}
            <Dialog disableEscapeKeyDown open={open} >
                <DialogTitle>Enter data</DialogTitle>
                <DialogContent>
                    <Box component="form" id="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {/**Faculty */}
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item>

                                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="select">Faculty</InputLabel>
                                    <Select
                                        labelId="select"
                                        id="demo-simple-select-autowidth"
                                        value={facultyId}
                                        onChange={(event) => {
                                            setFacultyId(Number(event.target.value) || '')
                                        }}
                                        autoWidth
                                        label="faculty"
                                    >
                                        {facultyData.map((data) => {
                                            return (
                                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>

                                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="select">Department</InputLabel>
                                    <Select
                                        labelId="select"
                                        id="departmentSelect"
                                        value={departmentId}
                                        onChange={(event) => { setDepartmentId(Number(event.target.value) || '') }}
                                        autoWidth
                                        label="Department"
                                    >
                                        {departmentData.filter((obj) => {
                                            return obj.facultyId === facultyId
                                        }).map((data) => {
                                            return (
                                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="titleSelect">Title</InputLabel>
                                    <Select
                                        labelId="select"
                                        id="titleSelect"
                                        value={titleId}
                                        onChange={(event) => { setTitleId(Number(event.target.value) || '') }}
                                        autoWidth
                                        label="Title"
                                    >
                                        {titleData.map((data) => {
                                            return (
                                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl required>
                                    <TextField
                                        required
                                        value={lecturerName}
                                        label="Name"
                                        onChange={(newValue) => { setLecturerName(newValue.target.value) }}
                                    ></TextField>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl required>
                                    <TextField
                                        required
                                        value={lecturerSurname}
                                        label="Surname"
                                        onChange={(newValue) => { setLecturerSurname(newValue.target.value) }}
                                    ></TextField>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <TextField
                                        value={lecturerPatronymic}
                                        label="Patronymic"
                                        onChange={(newValue) => { setLecturerPatronymic(newValue.target.value) }}
                                    ></TextField>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <Button type="submit" form="form" onClick={handleSubmit}>Submit</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>

    )
}

export default LecturerFullDescription
