import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import { Box } from '@mui/material';
import { BaseTable } from '../BaseTable';
import Lecturer from '../../Querys/Lecturer';


const LecturerFullDescription = () => {
    const dataFetchedRef = useRef(false)
    const [lecturerData, setLecturerData] = useState([])
    const [fetchData, isDataLoading, dataError] = useFetching(async () => {
        const response = await Lecturer.getFullDescription()
        setLecturerData(response)
    })

    useEffect(() => {
        if (dataFetchedRef.current) {
            return
        }
        dataFetchedRef.current = true
        fetchData()
    })
    return (
        <Box sx={{ height: 400, width: '500' }}>
            <BaseTable data={lecturerData}>
            </BaseTable>
        </Box>
    )
}

export default LecturerFullDescription
