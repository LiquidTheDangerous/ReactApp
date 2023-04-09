

import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useFetching } from '../Hooks/useFetching';
import { Box, Container, Grid } from '@mui/material'
import { BaseTable } from './BaseTable';

const BaseTableQuery = React.forwardRef((props, ref) => {
  const dataFetchedRef = useRef(false)
  const [data, setData] = useState([])
  const [fetchData, isDataLoading, dataFetchError] = useFetching(async () => {
    const response = await props.callback()
    setData(response)
  })
  // useImperativeHandle(ref, () => ({
  //   setTableData: (data) => setData(data),
  // }));
  useImperativeHandle(ref, () => ({
    updateTable: async () => {
      await props.callback().then(newData => {
        setData(newData)
      })
    },
    getData: () => {
      return data;
    }
  }));
  useEffect(() => {
    if (dataFetchedRef.current) {
      return
    }
    dataFetchedRef.current = true
    fetchData()
  })
  return (
    <BaseTable
      editable={props.editable ?? false}
      getRowsIdCallback={props.getRowsIdCallback}
      onProcessRowUpdateError={props.onProcessRowUpdateError}
      processRowUpdate={props.processRowUpdate}
      data={data}
      widthComponents={props.widthComponents}>
    </BaseTable>
  )
})

export default BaseTableQuery