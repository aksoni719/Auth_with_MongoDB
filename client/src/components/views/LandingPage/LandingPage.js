import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Card, Col, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import ImageSlider from '../../utils/ImageSlider'

function LandingPage() {
    //Product State
    const [ Products, setProducts ] = useState([]) 




    useEffect(() => {
        Axios.post('/api/product/getProducts')
        .then(response => {
            if(response.data.success) {

                setProducts(response.data.products)
            
            console.log(response.data.products)

            } else {
                alert('Failed to fetch product datas')
            }
        })
    }, [])


    const renderCards = Products.map((product, index) => {
        return <Col lg={6} md={8} xs={24}>
                <Card
                hoverable={true}
                cover={<ImageSlider images={product.images} />}
                >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
                </Card>

        </Col>
    })

    return (
        <div style={{width:'75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Select The Leads</h2>
            </div>


            {Products.length==0 ?
            <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'ceter' }}>
                <h2>No Leads yet..</h2>
            </div> :
            <div>
                    <Row gutter={[16,16]}>
                        {renderCards}

                    </Row>

            </div>
            
            }

        <br /><br /><br />

            <div style={{display: 'flex', justifyContent: 'center' }}>
                <button>Load More</button>


            </div>

        </div>
    )
}

export default LandingPage
