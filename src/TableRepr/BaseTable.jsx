import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import getObjectHeaders from './Helper';

export function BaseTable({ data, width = 120, editable = false, widthComponents = null, getRowsIdCallback = null }) {
  const columns = getObjectHeaders(data[0], width, editable, widthComponents);
  if (columns == null) {
    return;
  }
  return (
    <div>
      <Box sx={{ height: 400, width: '100%' }}>
        {(getRowsIdCallback != null)?  (<DataGrid rows={data} columns={columns} getRowId={getRowsIdCallback} sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }} >
        </DataGrid>):(<DataGrid rows={data} columns={columns} sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }} >
        </DataGrid>)}
      </Box>
    </div>
  );
}
