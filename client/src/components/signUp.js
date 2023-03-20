import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert'

function SignUp() {

    const [formData, setFormData] = useState({
        userFname: "",
        userLname: "",
        userPhoneNo:"",
        userGender:"",
        userEmail: "",
        userPassword: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [notSubmitted, setNotSubmitted] = useState(false)

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        const url = 'http://localhost:5000/signup';
        setIsLoading(true)

        axios.post(url, formData).then(response => {
            console.log(response.data)
            setIsLoading(false)
            window.location.href = "/dashboard"

        })
            .catch(error => {
                console.log(error)
                setNotSubmitted(true)
                setIsLoading(false)
            })

    }

    return (
        <div style={{ backgroundColor: '#F5F5F5', display: 'flex', justifyContent: 'center', width: '100%', marginTop: "10%" }}>
            <Form style={{ backgroundColor: '#ffffff', minWidth: 300, textAlign: "left", padding: 20, borderRadius: 10, boxShadow: "10px 10px 5px 0 rgba(0,0,0,0.75)" }}>
            {!notSubmitted === false ?
                        <Alert variant="danger" style={{ marginTop: 10, marginBottom: 0 }}>
                            An Error has occurred please try again

                        </Alert> :
                        ""

                    }
                   

            <p style={{ textAlign: "center", width: "100%", fontFamily: "Crisis one", fontWeight: "bold" }}>SIGN UP</p>
                <Form.Group >
                    <div className="row" style={{ marginBottom: 20 }} >
                        <div className="col-sm"><Form.Control type="text" name='userFname' value={formData.userFname} placeholder="First Name" onChange={handleChange}/></div>
                        <div className="col-sm"><Form.Control type="text" name='userLname' value={formData.userLname} placeholder="Last Name" onChange={handleChange} /></div>
                    </div>
                </Form.Group>
                <Form.Group >
                    <div className="row" style={{ marginBottom: 20 }} >
                        <div className="col-sm"><Form.Control type="text" name='userPhoneNo'  value={formData.userPhoneNo}placeholder="Phone Number" onChange={handleChange}/></div>

                    </div>
                </Form.Group>
                <Form.Group >
                    <div className="row" style={{ marginBottom: 20 }} >
                        <div className="col-sm"><Form.Control type="text" placeholder="Gender" name='userGender' value={formData.userGender} onChange={handleChange}/></div>

                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    
                    
                    <Form.Control type="email" placeholder="Enter email" name='userEmail' value={formData.userEmail} onChange={handleChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    
                    <Form.Control type="password" placeholder="Password" name='userPassword' value={formData.userPassword} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    
                    <Form.Control type="password" placeholder="Confirm password" name='userPassword' value={formData.userPassword} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit} type="submit" style={{ width: "100%", fontWeight: "bold", backgroundColor: "#1A237E" }}>
                    {isLoading === true ? <Spinner style={{ color: 'white', padding: "7px" }} /> : "Create Account"}

                </Button>
            </Form>
        </div>
    )
}

export default SignUp;