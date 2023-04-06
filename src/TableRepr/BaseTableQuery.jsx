

import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../Hooks/useFetching';
import { Box, Container, Grid } from '@mui/material'
import { BaseTable } from './BaseTable';

export default function BaseTableQuery(callback, ...params) {
  const dataFetchedRef = useRef(false)
  const [data, setData] = useState([])
  const [fetchData, isDataLoading, dataFetchError] = useFetching(async () => {
    console.log(...params);
    console.log("message this")
    const response = await callback(...params)
    console.log(response);
    setData(response)
    console.log(response);
  })
  useEffect(() => {
    if (dataFetchedRef.current) {
      return
    }
    dataFetchedRef.current = true
    fetchData()
  })
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <BaseTable data={data}>
      </BaseTable>
    </Box>
  )
}
