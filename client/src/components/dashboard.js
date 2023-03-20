
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect} from 'react';
import axios from "axios";

function Dashboard() {
    return (
        <div>

            <Row style={{height:"100vh", width:"100%"}}>
                <Col sm={3} style={{ backgroundColor: "black" }}>{<Navigation/>}</Col>
                <Col sm={9} style={{padding:0, backgroundColor:"#F5F5F5"}}>{<MainPage/>}</Col>
            </Row>

            

        </div>
    )

}

export default Dashboard;

function Navigation (){
    return(
        <div className='nav' style={{display: "block", color:"white", textAlign: 'left', paddingTop:20}}>
            <div>logo</div>
            <div>Home</div>
            <div>Account</div>
            <div>Contact us</div>
        </div>
    )
}

function MainPage (){
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);

    
        axios.get(`http://localhost:5000/dashboard?q=${query}`).then(response => {
            setData(response.data);
        })
        .catch(err=> {
            console.log(err)
        })
   

    function handleInputChange(event){
        setQuery(event.target.value)
    }

    return(
        <div>
            <Form className="d-flex" style={{width:"100%", display:"flex", justifyContent:"center", padding:20}}>
                  <Form.Control
                    type="search"
                    placeholder="Enter location"
                    className="me-2"
                    value={query}
                    onChange={handleInputChange}
                    aria-label="Search"
                    style={{width: "50%", borderRadius:20}}
                  />
                  <Button style={{borderRadius:20, border:"1px solid black", backgroundColor:"#ffffff", color:"black"}}>Search</Button>
                </Form>

                <div style={{margin: 10}}>
                            <div style={{display: "flex", justifyContent:"space-around", padding:10}}>
                            <p style={{fontWeight:'bolder'}}>Home Name</p>
                            <p style={{fontWeight:'bolder'}}>Home Location</p>
                            <p style={{fontWeight:'bolder'}}>Phone No</p>
                            <p style={{fontWeight:'bolder'}}>No. Children</p>
                            <p style={{fontWeight:'bolder'}}>No. Females</p>
                            <p style={{fontWeight:'bolder'}}>No. Males</p>  
                            </div>
                    {homes.map(item => (
                        <div key={item.id} style={{display: 'flex', backgroundColor:"#FFFFFF", marginBottom:10, padding:10, justifyContent:'space-around', borderRadius:10}}> 
                            
                            <p style={{fontWeight:'bolder'}}>{item.homeName}</p>
                            <p>{item.homeAddress}</p>
                            <p>{item.homePhoneNo}</p>
                            <p>{item.homeNoOfChildren}</p>
                            <p>{item.homeNoOfFemales}</p>
                            <p>{item.homeNoOfMales}</p>
                        </div>
                    ))}
                </div>
        </div>
    );
}

const homes =[
    {id: 1, homeName: 'Grace Homes', homePhoneNo: '0782778928', homeAddress: 'Nairobi', homeNoOfChildren: 45, homeNoOfFemales: 23, homeNoOfMales: 22 },
    {id: 2, homeName: 'Lucy Homes', homePhoneNo: '07899200138', homeAddress: 'Mombasa', homeNoOfChildren: 20, homeNoOfFemales: 12, homeNoOfMales: 8 },
    {id: 3, homeName: 'Mercy Homes', homePhoneNo: '0782778928', homeAddress: 'Kitengela', homeNoOfChildren: 15, homeNoOfFemales: 5, homeNoOfMales: 10 },
]