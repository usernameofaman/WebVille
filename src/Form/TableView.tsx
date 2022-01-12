import React from 'react'
import TableComponent from '../Common/tableComponent'
import styled from 'styled-components'
import { Button } from '@mui/material'

const TableWrapper = styled.div`
    width: 100%;
    padding : 20px 30px 30px 20px;
    display: flex;
    flex-direction : column;
    align-items: center;
`

export default function TableView(props) {
    return (
        <TableWrapper>
            <TableComponent.Table cellpadding="0" cellspacing="0">
                <TableComponent.TableHead>
                    <TableComponent.HeadColumn>Service Name</TableComponent.HeadColumn>
                    <TableComponent.HeadColumn>Center</TableComponent.HeadColumn>
                    <TableComponent.HeadColumn>Service Label</TableComponent.HeadColumn>
                    <TableComponent.HeadColumnRight>Value</TableComponent.HeadColumnRight>
                </TableComponent.TableHead>
                <TableComponent.TableBody>
                    {props.formData && props.formData.length > 0 ? props.formData.map(
                        (content) => (
                            <TableComponent.BodyRow>
                                {/* This logic will allow us to render different thumbnail for each content type */}
                                <TableComponent.BodyColumn>{content.label}{console.log(content)}</TableComponent.BodyColumn>
                                <TableComponent.BodyColumn>{content.option} </TableComponent.BodyColumn>
                                <TableComponent.BodyColumn> {getLabels(content, "LABEL")} </TableComponent.BodyColumn>
                                <TableComponent.BodyColumnRight>{getLabels(content, "VALUE")}</TableComponent.BodyColumnRight>
                            </TableComponent.BodyRow>
                        )
                    ) : ""}
                </TableComponent.TableBody>
            </TableComponent.Table>
            <Button variant="outlined" onClick={() => props.changeView("EDIT")}>Edit</Button>
        </TableWrapper>
    )
}

function getLabels(content, type) {
    console.log(content)
    return (
        content.multiOptions.map((item) => (
            <>
                <div>

                    {type === "LABEL" ? item.label : item.value}
                </div>
            </>
        ))
    )


}
