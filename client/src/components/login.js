import Form from 'react-bootstrap/Form';
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';


function Login() {

    const [formData,setFormData] = useState({
        userEmail:"",
        userPassword:""
    })

    const [loginError, setLoginError] = useState(false)

    const handleChange = event =>{
        const {name, value} = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]:value
        }));
    }
    
    const handleSubmit = event =>{
        event.preventDefault();
        const url = "http://localhost:5000/login";
        setLoginError(false)

        axios.post(url,formData).then(response =>{
            console.log(response.data)
            setLoginError(false)
            window.location.href = "/dashboard"
            
        }).catch(error =>{
            console.log(error)
            setLoginError(true)
        })
        console.log(loginError)
    }
    return (
        <div style={{ backgroundColor: '#F5F5F5', display: 'flex', justifyContent: 'center', width: '100%', marginTop: 100 }}>
            <Form style={{ minWidth: 300, backgroundColor: '#ffffff', padding: 20, borderRadius: 5, position: "relative", minWidth: '40%' }}>
            <p style={{ textAlign: "center", width: "100%", fontFamily: "Crisis one", fontWeight: "bold" ,fontSize:30}}>Login</p>

                <Form.Group className="mb-3" controlId="formBasicEmail" style={{ marginTop: 25 }}>

                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange} name="userEmail" value={formData.userEmail} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">

                    <Form.Control type="password" placeholder="Password" name='userPassword' value={formData.userPassword} onChange={handleChange} />
                </Form.Group>
                {!loginError === false?
                    <Alert variant="warning" style={{ marginTop: 15 }}>
                        Wrong email and password combination
                    </Alert> :
                    ""
                }
                <Button style={{ backgroundColor: '#006064', width: '100%', marginTop: 10 }} type="submit" onClick={handleSubmit}>
                    Login
                </Button>
                <br />



                {/* <Alert variant="danger">
                                {this.state.loginStatus}
                            </Alert> */}



                <p style={{ paddingTop: 20 }}>Need an account<span style={{ color: 'blue', fontWeight: 'bold' }}> <a href="/" style={{ color: '#006064', fontWeight: 'bold', cursor: 'pointer' }}>Login</a></span></p>
            </Form>
        </div>
    )
}

export default Login;