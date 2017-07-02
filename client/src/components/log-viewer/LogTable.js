import React from 'react'
import { Table } from 'reactstrap';

const LogTable = ({lines}) => {

    let rows = lines.map((line) => {
            return (
                <tr key={line.number}>
                    <th scope="row">{line.number}</th>
                    <td>{line.text}</td>
                </tr>
            )
        }
    )

    return (

        <Table bordered className="log-table">
            <tbody>{rows}</tbody>
        </Table>
    )
}

export default LogTable