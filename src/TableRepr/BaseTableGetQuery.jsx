import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';


import React, { useEffect, useRef, useState } from 'react'
import { BaseTable } from './BaseTable';
import { useFetching } from '../Hooks/useFetching';

const BaseTableGetQuery = (ApiGetQuery) => {
    // const response = await axios.get(`${URL}/department/getAll`)
    // return response.data
    console.log(ApiGetQuery);
    const dataFetchedRef = useRef(false)
    const [data, setData] = useState([])
    const getFunc = async () => {const response = await axios.get(ApiGetQuery);return response}
    const [fetchData, isDataLoading, dataLoadError] = useFetching(async () => {
      const response = await getFunc()
      setData(response.data)
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

export default BaseTableGetQuery

