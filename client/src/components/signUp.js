import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useState } from 'react';

function SignUp() {

    const[formData, setFormData] = useState({
        userEmail: "",
        userPassword:""
    })


    const handleChange = event =>{
        const{name, value} = event.target;
        setFormData(prevState =>({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        const url = 'http://localhost:5000/signup';
        axios.post(url, formData).then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })

    }

    return (
        <div style={{ backgroundColor:'#F5F5F5',display:'flex', justifyContent: 'center', width:'100%', marginTop: "20%"}}>
            <Form style={{backgroundColor:'#ffffff',minWidth:300, textAlign:"left", padding:20, borderRadius:10, boxShadow: "10px 10px 5px 0 rgba(0,0,0,0.75)"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p style={{textAlign:"center", width:"100%", fontFamily:"Crisis one", fontWeight:"bold"}}>CREATE ACCOUNT</p>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='userEmail' value={formData.userEmail} onChange={handleChange}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='userPassword' value={formData.userPassword} onChange={handleChange} />
                </Form.Group>
                
                <Button variant="primary" onClick={handleSubmit} type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default SignUp;