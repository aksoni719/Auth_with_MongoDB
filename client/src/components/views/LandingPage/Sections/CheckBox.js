import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd'

const { Panel } = Collapse

const continents = [
    {
        "_id": 1,
        "name": "Bangalore"
    },
    {
        "_id": 2,
        "name": "Pune"
    },
    {
        "_id": 3,
        "name": "Delhi"
    },
    {
        "_id": 4,
        "name": "Ranchi"
    },
    {
        "_id": 5,
        "name": "Chennai"
    },
    {
        "_id": 6,
        "name": "Goa"
    }
]

function CheckBox(props) {

    const [Checked, setChecked] = useState([])
    
    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if(currentIndex === -1){
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
        // update the checked information into Parent Component



    }


    const renderCheckboxLists = () => continents.map((value, index) => (
    <React.Fragment key={index}>
        <Checkbox
            onChange={ () => handleToggle(value._id)}
            type="checkbox"
            checked={ Checked.indexOf(value._id) === -1 ? false : true }
        />
        <span>{value.name}</span>
    </React.Fragment>
    ))
    
    
    
    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Filter by Places" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
            
        </div>
    )
}


export default CheckBox



