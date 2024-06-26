import React, {useState} from 'react';
import './App.css'
import { Button, Form } from 'react-bootstrap'
import { ChatGPT } from './components/ChatGPT';
import { UserInput } from './components/UserInput';

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

  const clearData = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="App">
      <h1>ChatGPT API Website</h1>
      <UserInput/>
      <br></br>
      <ChatGPT/>
      <br></br>
      <Form className="Footer">
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Enter API Key" onChange={changeKey}/>
        <br></br>
        <br></br>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
      <br></br>
      <Button className="Clear-data-button" onClick={clearData}>Clear Data</Button>
    </div>
  )
}

export default App
