
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
    return(
        <div>
            <Form className="d-flex" style={{width:"100%", display:"flex", justifyContent:"center", padding:20}}>
                  <Form.Control
                    type="search"
                    placeholder="Enter location"
                    className="me-2"
                    aria-label="Search"
                    style={{width: "50%", borderRadius:20}}
                  />
                  <Button style={{borderRadius:20, border:"1px solid black", backgroundColor:"#ffffff", color:"black"}}>Search</Button>
                </Form>
        </div>
    );
}