import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {
  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"})

  const handleEmailChange = ((e) => {
    setFormValues({...formValues, email: e.target.value})
  });
 
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const isPasswordValidated = isPasswordValid(newPassword);
    setValidationStates({ ...validationStates, passwordState: isPasswordValidated });
    setFormValues({ ...formValues, password: newPassword });
  };
 
  const handleSelectChange = ((e) => {
    setFormValues({...formValues, favClass: e.target.value})
  });

  const clickSubmit = () => {
    const isEmailValidated = isEmailValid(formValues.email);
    const isPasswordValidated = isPasswordValid(formValues.password);
  
    if (isEmailValidated && isPasswordValidated) {
      alert(JSON.stringify(formValues));
    } else {

      if (!isEmailValidated) {
        setValidationStates({ ...validationStates, emailState: false });
      }
      if (!isPasswordValidated) {
        setValidationStates({ ...validationStates, passwordState: false });
      }
    }
  };

  const [validationStates, setValidationStates] = useState({
    emailState: true,
    passwordState: true,
  });

  const isEmailValid = (email) => {
    if (email.indexOf('@') === -1) {
      return false;
    }
    const [fistPart, secondPart] = email.split('@');
    if (secondPart.indexOf('.') === -1) {
      return false;
    }
  
    return true;
  };
  
  const isPasswordValid = (password) => {
    return password.length >= 9;
  };

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
     
      <Form>
      <Form.Group className="mb-6" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email}/>
        { !validationStates.emailState && <Form.Text className="text-muted">Your email should follow an established format.</Form.Text>}
      </Form.Group>
 
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} />
        { !validationStates.passwordState && <Form.Text className="text-muted">Your password should be have numbers and letters and should be at least 9 char long</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Favorite Class</Form.Label>
        <Form.Select onChange={handleSelectChange}>
          <option value="1">ISIS3710</option>
          <option value="2">Programación con tecnologias web</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" onClick={clickSubmit}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default App;
