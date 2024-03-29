import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import StudyGroup from '../../Querys/StudyGroup'
import { Box, Container, Grid } from '@mui/material'
import { BaseTable } from '../BaseTable';
import BaseTableQuery from '../BaseTableQuery';

export default function BaseGroup() {
    return (
        <div style={{ height: 400, width: "100%" }}>
            <BaseTableQuery widthComponents={{description:400}} callback={StudyGroup.getAllBase}></BaseTableQuery>

        </div>
    )
}
