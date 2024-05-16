import { Form } from "react-bootstrap";
import "./UserInput.css"

export function UserInput():  JSX.Element {

    function changeInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        localStorage.setItem("userInput", event.target.value);
    }
    
    return (
        <div className="User-input">
            <h2>Enter input here:</h2>
            <Form>
                <Form.Control as="textarea" rows={3} placeholder="Enter text here" onChange={changeInput} className="Text-box"/>
            </Form>
        </div>
    )
}