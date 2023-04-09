import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import StudyGroup from '../../Querys/StudyGroup'
import { Box, Container, Grid } from '@mui/material'
import { BaseTable } from '../BaseTable';
import BaseTableQuery from '../BaseTableQuery';


const StudyGroupShortView = () => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <BaseTableQuery callback={StudyGroup.getAllShortView}></BaseTableQuery>
    </Box>
  )
}

export default StudyGroupShortView