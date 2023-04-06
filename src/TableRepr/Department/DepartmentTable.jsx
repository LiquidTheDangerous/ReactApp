

import React, { useEffect, useRef, useState } from 'react'
import { BaseTable } from '../BaseTable'
import BaseTableQuery from '../BaseTableQuery'
import Department from '../../Querys/Department'
import { useFetching } from '../../Hooks/useFetching'
import { Box } from '@mui/material'

const DepartmentTable = () => {
    const dataFetchedRef = useRef(false)
    const [studyGroup, setStudyGroup] = useState([])
    const [fetchStudyGroup, isStudyGroupLoading, studyGroupError] = useFetching(async () => {
      const response = await Department.getAll()
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
        <BaseTable widthComponents={{description:500}}data={studyGroup}>
        </BaseTable>
      </Box>
    )
  }

  export default DepartmentTable