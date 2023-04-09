import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import StudyGroup from '../../Querys/StudyGroup'
import { BaseTable } from '../BaseTable';
import BaseTableQuery from '../BaseTableQuery';
import Department from '../../Querys/Department'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, Input, InputLabel, OutlinedInput, Select, TextField, MenuItem } from '@mui/material'
import Faculty from '../../Querys/Faculty'
import axios from 'axios';



const BaseFullView = () => {
    const tableRef = React.useRef();

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const dataFetchedRef = useRef(false)
    const [departmentData, setDepartmentdata] = useState([])
    const [facultyData, setFacultyData] = useState([])

    const [fetchDepartmentData, isDepartmentDataLoading, departmentFetchError] = useFetching(async () => {
        const response = await Department.getAll()
        setDepartmentdata(response)
    })

    const [fetchFacultyData, isFacultyLoading, facultyFethcError] = useFetching(async () => {
        const response = await Faculty.getAll()
        setFacultyData(response)
    })

    useEffect(() => {
        if (dataFetchedRef.current) {
            return
        }
        dataFetchedRef.current = true
        fetchFacultyData()
        fetchDepartmentData()
    })

    const [facultyId, setFacultyId] = React.useState('');
    const [departmentId, setDepartmentId] = React.useState('');
    const [baseGroupName, setBaseGroupName] = useState('')
    const [baseGroupDescription,setBaseGroupDescription] = useState('')
    
    const handleSubmit = async (event, reason) => {
        if (departmentId === undefined || departmentId === '' || departmentId === null) {
            return;
        }
        if (facultyId === undefined || facultyId === '' || facultyId === null) {
            return;
        }
        if (baseGroupName === undefined || baseGroupName === '' || baseGroupName === null) {
            return;
        }
        event.preventDefault()
        await StudyGroup.putBase({
            name: baseGroupName,
            departmentId: departmentId,
            description: baseGroupDescription
        })
        tableRef.current.updateTable()
    }

    return (
        <div>
            <BaseTableQuery ref={tableRef} getRowsIdCallback={(obj) => { return obj.groupId }} widthComponents={{groupDescription:400}} callback={StudyGroup.getAllBaseFullView}></BaseTableQuery>
            <Button onClick={() => { setOpen(true) }}>Create</Button>
            <Dialog disableEscapeKeyDown open={open} >
                <DialogTitle>Enter data</DialogTitle>
                <DialogContent>
                    <Box component="form" id="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item>

                                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="facultySelect">Faculty</InputLabel>
                                    <Select
                                        labelId="select"
                                        id="facultySelect"
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
                                <FormControl required>
                                    <TextField
                                        required
                                        value={baseGroupName}
                                        label="Group name"
                                        onChange={(newValue) => { setBaseGroupName(newValue.target.value) }}
                                    ></TextField>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl required>
                                    <TextField
                                        value={baseGroupDescription}
                                        label="Group description"
                                        onChange={(newValue) => { setBaseGroupDescription(newValue.target.value) }}
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

export default BaseFullView