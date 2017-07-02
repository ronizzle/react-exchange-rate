import React from 'react'
import { InputGroup, InputGroupButton, Input, Button } from 'reactstrap'

const FilePathForm = ({resetSearch, handleFilePathChange, filePath}) => {
    return (
        <div>
            <InputGroup>
                <Input placeholder="/path/to/file" value={filePath} onChange={handleFilePathChange()} />
                <InputGroupButton><Button onClick={resetSearch()}>View</Button></InputGroupButton>
            </InputGroup>
        </div>
    );
};

export default FilePathForm