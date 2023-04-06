import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import StudyGroup from '../../Querys/StudyGroup'
import { Box, Container, Grid } from '@mui/material'
import { BaseTable } from '../BaseTable';

export default function BaseGroup() {
    const dataFetchedRef = useRef(false)
    const [studyGroupBase, setStudyGroup] = useState([])
    const [fetchStudyGroup, isStudyGroupLoading, studyGroupError] = useFetching(async () => {
        const response = await StudyGroup.getAllBase()
        setStudyGroup(response)
        // console.log(response)
    })

    useEffect(() => {
        if (dataFetchedRef.current) {
            return
        }
        dataFetchedRef.current = true
        fetchStudyGroup()
    })
    return (
        <div style={{height:400,width:"100%"}}>
            <BaseTable data={studyGroupBase} widthComponents={{description:300}}>
            </BaseTable>
        </div>
    )
}
