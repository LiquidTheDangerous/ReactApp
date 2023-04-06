import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import StudyGroup from '../../Querys/StudyGroup'
import { Box, Container, Grid } from '@mui/material'
import { BaseTable } from '../BaseTable';


const StudyGroupShortView = () => {
  const dataFetchedRef = useRef(false)
  const [studyGroup, setStudyGroup] = useState([])
  const [fetchStudyGroup, isStudyGroupLoading, studyGroupError] = useFetching(async () => {
    const response = await StudyGroup.getAllShortView()
    setStudyGroup(response)
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
      <BaseTable data={studyGroup}>
      </BaseTable>
    </Box>
  )
}

export default StudyGroupShortView