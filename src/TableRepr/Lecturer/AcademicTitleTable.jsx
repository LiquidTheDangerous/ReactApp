import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import AcademicTitle from '../../Querys/AcademicTitle';
import { Box } from '@mui/material';
import { BaseTable } from '../BaseTable';
import BaseTableQuery from '../BaseTableQuery';


const AcademicTitleTable = () => {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <BaseTableQuery callback={AcademicTitle.getAll} widthComponents={{name:200}}></BaseTableQuery>
        </Box>
    )
}

export default AcademicTitleTable