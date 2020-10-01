import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Card, Col, Row } from 'antd'
import ImageSlider from '../../utils/ImageSlider'
import CheckBox from './Sections/CheckBox'
import Meta from 'antd/lib/card/Meta'

function LandingPage() {
    //Product State
    const [ Products, setProducts ] = useState([]) 

    // loading State
    const [Skip, setSkip] = useState(0)
    // limit State
    const [Limit, setLimit] = useState(8)
    // PostSize for the LoadMore bottom
    const [PostSize, setPostSize] = useState()
    // Filter for selection
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    
    
    const getProduct = (variables) => {
        Axios.post('/api/product/getProducts', variables)
        .then(response => {
            if(response.data.success) {

                if(variables.loadMore){
                    setProducts([...Products, ...response.data.products])
                } else {
                    setProducts(response.data.products)
                }
                console.log(response.data.products)
                setPostSize(response.data.postSize)
            } else {
                alert('Failed to fetch product datas')
            }
        })
    }
    
    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
            loadMore: true
        }
        getProduct(variables)

    }, [])





    const onLoadMore = () => {

        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit

        }

        getProduct(variables);
        setSkip(skip);

    }


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

    const showFilterResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }


        getProduct(variables)

        setSkip(0)

    }

    const handleFilters = (filters, category) => {

        console.log(filters)

        const newFilters = { ...Filters }

        newFilters[category] = filters

        if(category === "price")
        {

        }

        showFilterResults(newFilters)
        setFilters(newFilters)
        
    }

    return (
        <div style={{width:'75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Select The Leads</h2>
            </div>

            {/* Filter Checkbox */}
            <CheckBox
                handleFilters = {filters => handleFilters(filters, "continents")}
             />


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
                {PostSize >= Limit &&
                    <div style={{display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
                    </div>
                }

        </div>
    )
}

export default LandingPage
