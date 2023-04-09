

import React, { useEffect, useRef, useState } from 'react'
import { BaseTable } from '../BaseTable'
import BaseTableQuery from '../BaseTableQuery'
import Department from '../../Querys/Department'
import { useFetching } from '../../Hooks/useFetching'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, Input, InputLabel, OutlinedInput, Select, TextField, MenuItem } from '@mui/material'
import Faculty from '../../Querys/Faculty'

const DepartmentTableFull = () => {

  const tableRef = React.useRef();


  /*Faculty */
  const dataFetchedRef = useRef(false)
  const [facultyData, setFacultyData] = useState([])
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
  })

  const [open, setOpen] = React.useState(false);
  const [facultyId, setFacultyId] = React.useState('');
  const [departmentName, setDepartmentName] = React.useState('');
  const [departmentDescription, setDepartmentDescription] = React.useState('');

  const handleChange = (event) => {
    setFacultyId(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
    await tableRef.current.updateTable()
    // console.log(tableRef.current.setTableData([]))
  };
  const handleSubmit = async (event, reason) => {
    console.log(facultyId, departmentName)
    if (departmentName === undefined || departmentName === '' || departmentName === null) {
      return;
    }
    event.preventDefault()
    const response = await Department.put({
      name : departmentName,
      description : departmentDescription,
      facultyId : facultyId
    }).then(async (response)=>{
      if (response.statusText === 'OK'){
        await tableRef.current.updateTable()
      }
    });
    // if(response.statusText==='OK'){
      // console.log('success')
    // }
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  }


  return (
    <Grid item container>
      <Box sx={{ height: 400, width: '100%' }}>
        <BaseTableQuery getRowsIdCallback={(obj)=>{return obj.departmentId}} ref={tableRef} callback={(Department.getAllFullDescription)} widthComponents={{ departmentDescription: 400 }}></BaseTableQuery>
      </Box>
      <div>
        <Button onClick={handleClickOpen}>Create</Button>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
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
                      onChange={handleChange}
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
                  <FormControl required>
                    <TextField
                      required
                      value={departmentName}
                      label="Department name"
                      onChange={(newValue) => { setDepartmentName(newValue.target.value) }}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl required>
                    <TextField
                      value={departmentDescription}
                      label="description"
                      onChange={(newValue) => { setDepartmentDescription(newValue.target.value) }}
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
    </Grid>
  )
}

export default DepartmentTableFull