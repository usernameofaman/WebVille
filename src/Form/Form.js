import * as React from 'react';
import styled from 'styled-components'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import TableView from './TableView'

const serviceCenters = [
    "Noida",
    "Gaziabad",
    "Gurgaon",
    "Delhi",
    "Uttar Pradesh "
]


const Row = styled.div`
    display: flex;
    padding: 10px 20px 0px 20px;
    // width: 80%;
`

export default function FormComponent() {
    const [viewType , setViewType ] = React.useState("EDIT")
    const [currentInnerView , changeCurrentInnerView ] = React.useState(0)
    console.log(currentInnerView)
    const [formData, setFormData] = React.useState([
        {
            label: "",
            option: "",
            multiOptions: [
                {
                    label: "",
                    value: ""
                }
            ]
        }
    ])

    const addRow = () => {
        setFormData([...formData, {
            label: "",
            option: "",
            multiOptions: [
                {
                    label: "",
                    value: ""
                }
            ]
        }])
    }

    const removeRow = (index) => {
        let newData = formData;
        newData.splice(index, 1)
        setFormData([...newData])
    }
    const changeValue = (e, index) => {
        let value = e.target.value;
        let newData = formData;
        newData[index].label = value;
        setFormData([...newData])
    }

    const handleChangeSelect = (e, index) => {
        let value = e.target.value;
        let newData = formData;
        newData[index].option = value;
        setFormData([...newData])
    }

    const changeInnerValues = (e, innerIndex, index, field) => {
        let value = e.target.value;
        let newData = formData;
        if (field === "value")
            newData[index].multiOptions[innerIndex].value = value;
        else
            newData[index].multiOptions[innerIndex].label = value;
        setFormData([...newData])
        console.log(formData)
    }

    const addInnerItem = (index) => {
        let newFormData = formData;
        let newData = formData[index].multiOptions;
        newData = [...newData, { label: "", value: "" }];
        newFormData[index].multiOptions = newData;
        setFormData([...newFormData])
    }

    return (
        <>  {viewType === "EDIT" &&
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: '90%',
                    },
                }}
            >
                <Paper elevation={3}>
                    <Row>
                        Add Input Fields
                    </Row>
                    {formData.map((item, index) => (
                        <>
                            <Row key={index} onMouseDown={() => changeCurrentInnerView(index)}>
                                <TextField onChange={(e) => changeValue(e, index)} id="outlined-basic" label="Service Name" variant="outlined" value={item.label} fullWidth sx={{ m: 1 }} />
                                <FormControl sx={{ m: 1, minWidth: 100 }} fullWidth>
                                    <InputLabel id="demo-simple-select-label">Center</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={item.option}
                                        label="Center"
                                        onChange={(e) => handleChangeSelect(e, index)}
                                    >
                                        {serviceCenters.map((item, selectIndex) => (
                                            <MenuItem key={selectIndex} value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Fab size="small" color="secondary" aria-label="add" style={{ minWidth: "40px", marginTop: "10px" }}>
                                    <DeleteOutlinedIcon onClick={() => removeRow(index)} sx={{ m: 1 }} />
                                </Fab>
                            </Row>
                            {currentInnerView===index && item.multiOptions[0] && item.option !== "" && item.multiOptions.map((innerItem, innerIndex) => (
                                <Paper sx={{ m: 2, background: "#f0f0f0" }} key={innerIndex}>
                                    <Row>
                                        <TextField id="outlined-basic" label="Label" variant="outlined" value={innerItem.label} onChange={(e) => changeInnerValues(e, innerIndex, index, "label")} fullWidth sx={{ m: 1 }} />
                                        <TextField id="outlined-basic" label="Value" variant="outlined" value={innerItem.value} onChange={(e) => changeInnerValues(e, innerIndex, index, "value")} fullWidth sx={{ m: 1 }} />
                                    </Row>
                                    {innerIndex === (item.multiOptions.length) - 1 &&
                                        <Row>
                                            <Button variant="contained" sx={{ m: 1 }} onClick={() => addInnerItem(index)}>Add More Option</Button>
                                        </Row>}
                                </Paper>
                            ))
                            }
                            {index === (formData.length) - 1 &&
                                <Row>
                                    <Button variant="contained" sx={{ m: 1 }} onClick={() => addRow(index)}>Add</Button>
                                </Row>}
                        </>
                    ))}
                </Paper>
                <Button onClick={()=>setViewType("VIEW")} variant="contained" sx={{ m: 1 }} >Submit</Button>
            </Box>
            }

            {
                viewType === "VIEW" &&
                <TableView formData={formData} changeView={setViewType}/>
            }
        </>
    );
}
