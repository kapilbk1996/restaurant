import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../stylesheets/home.css';
import { Container, Row, Col, Card, Badge, OverlayTrigger, Tooltip, DropdownButton, Button } from 'react-bootstrap';
import ReactLoading from "react-loading";
import { FaStar } from 'react-icons/fa';
import { FaMotorcycle } from 'react-icons/fa';
import { FaListAlt } from 'react-icons/fa';
import FilteredMultiSelect from 'react-filtered-multiselect'
import Dropdown from "react-dropdown-multiselect";
import Select from 'react-select';

const ReactLoadingStyle = {
    "fill": "black", 
    "height": "64px", 
    "width": "64px", 
    "margin": "auto"
}




class Home extends Component {
    state={
        restaurants:[],
        cuisines:[],
        loading:false,
        error_reason: undefined
    }


    componentDidMount() {
        console.log("In componentDidMount ");
        
        this.getRestaurants();
        this.getCuisine()
    }
    
    getCuisine = async () => {    
        try{
            const response = await axios.get('/cuisines');
            
            this.setState({cuisines:response.data.message})
            
        }catch(error){
            console.log('is it error???',error.message);
            this.setState({loading:false, error_reason: error.message})
            
        }
    }

    getRestaurants = async () => {    
        console.log("In getRestaurants");
           
        try{
            this.setState({loading:true})
            const response = await axios.get('/restaurants');
            console.log(response);
            
            this.setState({restaurants:response.data.message, loading:false})
            
        }catch(error){
            console.log('is it error???',error.message);
            this.setState({loading:false, error_reason: error.message})
            
        }
    }

    handleChange = async(selectedOption) => {
        try{
            this.setState({ selectedOption, loading:true });
            if(typeof(selectedOption)=="undefined" || selectedOption==null || selectedOption==''){
                   
                this.getRestaurants();
            }
                
            else{
                const response = await axios.post('/filterCuisines',{cuisines: selectedOption});
                console.log("handlechange",response);
                
                this.setState({restaurants:response.data.message, loading:false})
            }
        }catch(error){
            console.log("in error",error.message);
            
            this.setState({loading:false, error_reason: error.message})        
     }
      };

    render(){
        //console.log("in render");
        
        const restaurantList = typeof(this.state.restaurants)!="undefined" && this.state.restaurants.length>0 ? (
            this.state.restaurants.map(restaurant => {
                var rating_color=restaurant["Rating color"]
                const rating = Number(restaurant["Aggregate rating"])
                if (rating_color=="White")
                    rating_color="#dcd3d3"
                else if(rating_color=="Green")
                    rating_color="yellowgreen"
                else if(rating_color=="Dark Green")
                    rating_color="green"
                return (

                    <Container key={restaurant["Restaurant ID"]}>
                        <Card style={{margin:"5px"}}>
                            <Card.Body >

                                <Row>
                                    <Col>
                                        <Link to=''>
                                            <span >{restaurant["Restaurant Name"]}</span>

                                        </Link>
                                    </Col>
                                     
                                    <Col>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Cuisines</Tooltip>}>
                                            <span>{restaurant.Cuisines}</span>
                                        </OverlayTrigger>
                                    </Col>
                                    <Col>
                                        <Row>
                                        <Col >
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Currency</Tooltip>}>
                                                <Badge variant="dark" >{restaurant.Currency}</Badge>
                                            </OverlayTrigger>
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Avg. Cost for 2</Tooltip>}>
                                            <Badge variant="primary" >{restaurant["Average Cost for two"]}</Badge>
                                        </OverlayTrigger>
                                        </Col>
                                        <Col >
                                        
                                    </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col>
                                            {
                                                restaurant["Has Online delivery"]==="Yes" &&
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delivery Available</Tooltip>}>
                                                    <FaMotorcycle style={{color:"green"}}/>
                                                </OverlayTrigger>
                                            }
                                            {
                                                restaurant["Has Online delivery"]==="No" &&
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">No Delivery</Tooltip>}>
                                                    <FaMotorcycle style={{color:"red"}}/>
                                                </OverlayTrigger>
                                            }
                                            </Col>
                                            <Col>
                                            {
                                                restaurant["Has Table booking"]==="Yes" &&
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Booking Available</Tooltip>}>
                                                    <FaListAlt style={{color:"green"}}/>
                                                </OverlayTrigger>
                                            }
                                            {
                                                restaurant["Has Table booking"]==="No" &&
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">No Booking</Tooltip>}>
                                                    <FaListAlt style={{color:"red"}}/>
                                                </OverlayTrigger>
                                            }
                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col>
                                        <Row>
                                        <Col >
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Votes</Tooltip>}>
                                            <Badge variant="info" >{restaurant.Votes}</Badge>                                            
                                        </OverlayTrigger>
                                       
                                    </Col>
                                    <Col >
                                        
                                            {
                                                rating<3 && 
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Agg rating</Tooltip>}>
                                                <Badge variant="danger" >{rating}</Badge>
                                                </OverlayTrigger>
                                            }
                                            {
                                                rating>=3 && rating<4 &&
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Agg rating</Tooltip>}>
                                                <Badge variant="warning" >{rating}</Badge>
                                                </OverlayTrigger>
                                            }
                                            {
                                                rating>=4 &&
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Agg rating</Tooltip>}>
                                                <Badge variant="success" >{rating}</Badge>
                                                </OverlayTrigger>
                                            }
                                        
                                    </Col>
                                    
                                    
                                    <Col>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{restaurant["Rating text"]}</Tooltip>}>
                                        <FaStar style={{color:rating_color}}/>
                                    </OverlayTrigger>
                                    </Col>
                                        </Row>

                                    
                                    </Col>
                                    
                                   
                                </Row>
                            </Card.Body>
                        </Card>
                   
                    </Container>
                )
            })
        ) : (
                <div className="card">
                    <div className="card-content">
                        <p>{this.state.error_reason}</p>
                    </div>
                </div>
            )
        



        return(
            
            <div class="container">
                <h3 id="heading">Restaurants</h3>
                <hr/>
                
                <div  style={{width:"300px"}}>
                <p>Filter By Cuisine</p>
                <Select
        
        onChange={this.handleChange}
        options={this.state.cuisines}
        isMulti="True"
      />
                </div>
      <hr/>
                {this.state.loading ? (
                    <div >
                        <ReactLoading type={"bars"} color={"#3f51b5"} style={ReactLoadingStyle} />
                    </div>
                ) : (
                        <div>{restaurantList}</div>
                    )}
               
            </div>
        )
    }
    
}
export default Home;