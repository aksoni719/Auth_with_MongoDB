import React, { useState } from 'react'
import { Collapse, Radio } from 'antd'
const { Panel } = Collapse

const price = [
    {
        "id":0,
        "name":"Any",
        "array":[]
    },
    {
        "id":1,
        "name":"$0 t0 $199",
        "array":[0,199]
    },
    {
        "id":2,
        "name":"$200 t0 $249",
        "array":[200,249]
    },
    {
        "id":3,
        "name":"$250 t0 $279",
        "array":[250,279]
    },
    {
        "id":4,
        "name":"$280 t0 $299",
        "array":[280,299]
    },
    {
        "id":5,
        "name":"$300 t0 $1000",
        "array":[300,1000]
    }
]

   

function RadioBox(props) {

    const [Value, setValue] = useState('0')

    const renderRadioBox = () => (
        price.map((value) => (
            <Radio key={value._id} value={`$(value._id)`}>{value.name}</Radio>
        ))
    )

    const handleChange = (event) => {
        setValue(event.target.value)
        
        props.handleFilters(event.target.value)
    }


    return (
        <div>
                <Collapse defaultActiveKey={['0']}>
                    <Panel header="Filter by prices" key="1">
                        <Radio.Group onChange={handleChange} value={Value} >

                            {renderRadioBox()}

                        </Radio.Group>
                    </Panel>
                </Collapse>
        </div>
    )
}

export default RadioBox
