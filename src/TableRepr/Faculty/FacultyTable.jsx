import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import { Box } from '@mui/material';
import { BaseTable } from '../BaseTable';
import Lecturer from '../../Querys/Lecturer';
import BaseTableQuery from '../BaseTableQuery';
import Faculty from '../../Querys/Faculty';


const FacultyTable = () => {
    return (
        <BaseTableQuery callback={Faculty.getAll} widthComponents={{ description: "500" }}></BaseTableQuery>
    )
}

export default FacultyTable
