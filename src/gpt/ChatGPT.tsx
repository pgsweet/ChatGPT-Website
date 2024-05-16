import { useState } from "react";
import { makeRequest } from "./OpenAI";
import "./ChatGPT.css";

export function ChatGPT(): JSX.Element {
    const [userInput, setUserInput] = useState<string>("");
    const [response, setResponse] = useState<string>("");

    async function getResults() {
        setUserInput(localStorage.getItem("userInput") || "");
        const response = await makeRequest(userInput);
        setResponse(response || "");
    }

    return (
        <div>
            <button onClick={getResults}>Get Answer</button>
            <p>Response with:</p>
            <div className="Response">
                {response}
            </div>
        </div>
    )
}