import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import StudyGroup from '../../Querys/StudyGroup'
import { Box, Container, Grid } from '@mui/material'
import { BaseTable } from '../BaseTable';
import BaseTableQuery from '../BaseTableQuery';



const StudyGroupFullView = () => {
  return (
    <BaseTableQuery getRowsIdCallback={(obj)=>{return obj.groupId}} callback={StudyGroup.getAllFullView}></BaseTableQuery>
  )
}

export default StudyGroupFullView