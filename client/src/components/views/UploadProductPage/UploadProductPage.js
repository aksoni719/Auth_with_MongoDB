import React, { useState } from 'react'
import FileUpload from '../../utils/FileUpload'


const Continents = [
    {key:1, value: "bangalore"},
    {key:2, value: "pune"},
    {key:3, value: "delhi"},
    {key:4, value: "ranchi"},
    {key:5, value: "chennai"},
    {key:6, value: "Goa"},
]


function UploadProductPage() {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [ContinentValue, setContinentValue] = useState(1)

    const [Images, setImages] = useState([])
    
    const onTitleChange = (event) => {
            setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
            setPriceValue(event.currentTarget.value)
    }

    const onContinentsSelectChange = (event) =>{
        setContinentValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        // console.log(newImages)
        setImages(newImages)
    }

    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
            <div style={{ textAlign:'center',marginBottom:'2rem' }}>
                    <h2>Upload Your Product</h2>
            </div>


            <form onSubmit >

            <FileUpload refreshFunction={updateImages} />

            <br />
            <br />
                <label>Title</label>
                <input 
                onChange={onTitleChange}
                value={TitleValue}
                 />

            <br />
            <br />
                <label>Description</label>
                <textarea 
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />

            <br />
            <br />
            <label>Price</label>
                <input 
                onChange={onPriceChange}
                value={PriceValue}
                type="number"
                 />

                <select
                onChange={onContinentsSelectChange}
                >
                    {Continents.map(item => (
                    <option key={item.key} value={item.key}>{item.value}</option>
                    ))}

                </select>

                    <button 
                    onClick
                    >
                    Submit
                    </button>


            </form>
        </div>
    )
}

export default UploadProductPage
