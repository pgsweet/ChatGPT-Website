import React, {useState} from 'react';
import './App.css'
import { Button, Form } from 'react-bootstrap'


let keyData = "";
const saveKeyData = "OPENAI_API_KEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData);

  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <div>
      <Form className="API-box">
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Enter API Key" onChange={changeKey}/>
        <br></br>
        <Button className="Submit-button" onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  )
}

export default App
