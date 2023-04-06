import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import AcademicTitle from '../../Querys/AcademicTitle';
import { Box } from '@mui/material';
import { BaseTable } from '../BaseTable';


const AcademicTitleTable = () => {
    const dataFetchedRef = useRef(false)
    const [academicTitle, setAcademicTitle] = useState([])
    const [fetchStudyGroup, isAcademicTitleLoading, academicTitleError] = useFetching(async () => {
        const response = await AcademicTitle.getAll()
        setAcademicTitle(response)
    })

    useEffect(() => {
        if (dataFetchedRef.current) {
            return
        }
        dataFetchedRef.current = true
        fetchStudyGroup()
    })
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <BaseTable data={academicTitle}>
            </BaseTable>
        </Box>
    )
}

export default AcademicTitleTable