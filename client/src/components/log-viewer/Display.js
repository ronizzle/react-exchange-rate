import React from 'react'
import LogTable from './LogTable';


const Display = ({lines}) => {
    return (
        <div>
            <LogTable lines={lines} />
        </div>
    )
}

export default Display