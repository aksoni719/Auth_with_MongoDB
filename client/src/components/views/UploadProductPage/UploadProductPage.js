import Axios from 'axios'
import React, { useState } from 'react'
import FileUpload from '../../utils/FileUpload'


const Continents = [
    {key:1, value: "Bangalore"},
    {key:2, value: "Pune"},
    {key:3, value: "Delhi"},
    {key:4, value: "Ranchi"},
    {key:5, value: "Chennai"},
    {key:6, value: "Goa"},
]


function UploadProductPage(props) {

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

    const onSubmit = (event) =>{
        event.preventDefault();

        if(!TitleValue || !DescriptionValue || !PriceValue || !ContinentValue || !Images){
            return alert('Fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            continents: ContinentValue
        }

        Axios.post('/api/product/uploadProduct', variables)
             .then(response => {
                 if(response.data.success) {
                        alert('Product Successfully uploaded')
                        props.history.push('/')
                 } else {
                     alert('Failed to upload product')
                 }
             })

    }

    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
            <div style={{ textAlign:'center',marginBottom:'2rem' }}>
                    <h2>Upload Your Product</h2>
            </div>


            <form onSubmit={onSubmit} >

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
                    onClick={onSubmit}
                    >
                    Submit
                    </button>


            </form>
        </div>
    )
}

export default UploadProductPage
