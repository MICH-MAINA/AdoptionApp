
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function Dashboard() {
    return (
        <div>

            <Row style={{ height: "100vh", width: "100%" }}>
                <Col sm={3} style={{ backgroundColor: "black" }}>{<Navigation />}</Col>
                <Col sm={9} style={{ padding: 0, backgroundColor: "#F5F5F5" }}>{<MainPage />}</Col>
            </Row>



        </div>
    )

}

export default Dashboard;

function Navigation() {
    return (
        <div className='nav' style={{ display: "block", color: "white", textAlign: 'left', paddingTop: 20 }}>
            <div>logo</div>
            <div>Home</div>
            <div>Account</div>
            <div>Contact us</div>
        </div>
    )
}

function MainPage() {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);

    const [error, setError] = useState(false)

    const [home_id, setHomeId] = useState('');
    const [home, setGetHome] = useState([]);

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    


    const handleInputChange = (event) => {
        setQuery(event.target.value)
        setHomeId(event.target.value)

    }

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.get(`http://localhost:5000/dashboard/search?q=${query}`).then(response => {
            const arr = response.data
            console.log(query)
            if (arr.length > 0 ){
                setData(response.data)
                setError(false)
                console.log(data)
            }else{
                console.log("no item found")
                setData([])
                setError(true)
                
            }
            
            
            
            
        })
            .catch(err => {
                console.log(err)
            })

        
    }

    const getOneHome = async (home_id) => {
        
        const response = await axios.get(`http://localhost:5000/dashboard/item/${home_id}`).then(response => {
             setGetHome(response.data[0])
            

        })
            .catch(err => {
                console.log(err)
            })
        
        
    }
    const handleShow = (e) => {
        setShow(true)
        getOneHome(e.currentTarget.id);
        
    }


    return (
        <div>
            <Form className="d-flex" style={{ width: "100%", display: "flex", justifyContent: "center", padding: 20 }} onSubmit={handleSearchSubmit} >
                <Form.Control
                    type="search"
                    placeholder="Enter location eg ` Nairobi`"
                    className="me-2"
                    value={query}
                    onChange={handleInputChange}
                    aria-label="Search"
                    style={{ width: "50%", borderRadius: 20 }}
                />
                <Button style={{ borderRadius: 20, border: "1px solid black", backgroundColor: "#ffffff", color: "black" }}  type="submit">Search</Button>
            </Form>
            
            <div style={{ margin: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-around", padding: 10 }}>
                    <p style={{ fontWeight: 'bolder' }}>Home Name</p>
                    
                    <p style={{ fontWeight: 'bolder' }}>Phone No</p>
                    <p style={{ fontWeight: 'bolder' }}>No. Children</p>
                    
                    <p></p>
                </div>
                {error === true? <p style={{fontFamily:"Alkatra", fontSize:20}}>No home found in that location</p>: ""}
                {data.map(item => (
                    <div key={item.id} style={{ display: 'flex', backgroundColor: "#FFFFFF", marginBottom: 10, padding: 10, justifyContent: 'space-around', borderRadius: 10 }}>

                        <p style={{ fontWeight: 'bolder' }}>{item.homeName}</p>
                        
                        <p>{item.homePhoneNo}</p>
                        <p>{item.homeNoOfChildren}</p>
                        
                        

                        <div><button id={item.idhomedetails} style={{ backgroundColor: "#ef6c00", borderRadius: 5, width: 100, color: "#ffffff", border: "none", fontWeight: "bolder" }} onClick={handleShow}>Details</button> </div>
                    </div>
                ))}


            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{home.homeName}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{display:'flex', justifyContent: 'space-around'}}>
                        <div >
                            <p style={{ fontWeight: 'bolder' }}>Contact:</p>
                            <p style={{ fontWeight: 'bolder' }}>Address:</p>
                            <p style={{ fontWeight: 'bolder' }}>Number of children:</p>
                            <p style={{ fontWeight: 'bolder' }}>Number of females:</p>
                            <p style={{ fontWeight: 'bolder' }}>Number of Males:</p>
                        </div>
                        <div>
                            
                            <p >{home.homePhoneNo}</p>
                            <p>{home.homeAddress}</p>
                            <p>{home.homeNoOfChildren} </p>
                            <p>{home.homeNoOfFemales} </p>
                            <p>{home.homeAvgAge} </p>
                        </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        
        </div >
    );
}

// const homes = [
//     { id: 1, homeName: 'Grace Homes', homePhoneNo: '0782778928', homeAddress: 'Nairobi', homeNoOfChildren: 45, homeNoOfFemales: 23, homeNoOfMales: 22 },
//     { id: 2, homeName: 'Lucy Homes', homePhoneNo: '07899200138', homeAddress: 'Mombasa', homeNoOfChildren: 20, homeNoOfFemales: 12, homeNoOfMales: 8 },
//     { id: 3, homeName: 'Mercy Homes', homePhoneNo: '0782778928', homeAddress: 'Kitengela', homeNoOfChildren: 15, homeNoOfFemales: 5, homeNoOfMales: 10 },
// ]