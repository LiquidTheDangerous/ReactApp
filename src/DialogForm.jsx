

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useImperativeHandle, useState } from 'react'


/*
    dialogElements{
        elements:[
            element:{
                type:"textField",
                name: "ObjectField",
                required:false
            },
            element{
                type:"selector",
                name: "Age"
                required:false,
                getOptions: ()=>{return [...]}
            }
        ]
    }
*/

const DialogForm = React.forwardRef(({ title, onClose, onSubmit, dialogElements,gridPadding=2,gridSpacing=1 }, ref) => {
    const [open, setOpen] = useState(false)
    useImperativeHandle(ref, () => ({
        setOpen: (value) => {
            setOpen(value)
        }
    }));
    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Box component="form" id="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Grid
                            spacing={gridSpacing}
                            container
                            padding={gridPadding}
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {dialogElements.elements.map((element) => {
                                if (element.type === "selector") {
                                    const options = element.getOptions()
                                    return (
                                        <Grid item key={element.name + "GridItem"}>
                                            <FormControl key={element.name + "FromControl"} required={element.required ?? false} sx={{ m: 1, minWidth: 120 }} disabled={element.isDisabled?.() ?? false}>
                                                <InputLabel id={element.name + "id"}>{element.name}</InputLabel>
                                                <Select
                                                    labelId={element.name + "id"}
                                                    label={element.name}
                                                    autoWidth
                                                    required={element.required ?? false}
                                                    key={element.name}
                                                    onChange={element.onChange}
                                                    value={element.value}>
                                                    {options.map((option) => {
                                                        return (
                                                            <MenuItem key={element.getValue(option)} value={element.getValue(option)}>{element.showOption(option)}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Grid>)

                                }
                                else if (element.type === "textField") {
                                    return (
                                        <Grid item key={element.name + "GridItem"}>
                                            <FormControl key={element.name + "FromControl"} required={element.required ?? false}>
                                                <TextField
                                                    required={element.required ?? false}
                                                    label={element.name}
                                                    key={element.name}
                                                    value={element.value}
                                                    onChange={element.onChange}
                                                ></TextField>
                                            </FormControl>
                                        </Grid>
                                    )
                                }
                            })}
                        </Grid>
                    </Box>
                    <DialogActions>
                        <Button type="submit" form="form" onClick={onSubmit}>Submit</Button>
                        <Button onClick={() => { setOpen(false); onClose?.() }}>Close</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    )
})

export default DialogForm