import { useState } from "react";
import { makeRequest } from "./OpenAI";
import "./ChatGPT.css";
import { GPTCustomization } from "../components/GPTCustomization";

export function ChatGPT(): JSX.Element {
    const [userInput, setUserInput] = useState<string>("");
    const [systemInput, setSystemInput] = useState<string>("");
    const [response, setResponse] = useState<string>("");

    async function getResults() {
        setUserInput(localStorage.getItem("userInput") || "");
        setSystemInput(localStorage.getItem("systemInput") || "");

        const model = localStorage.getItem("model") || "gpt-4o";
        const temperature = parseFloat(localStorage.getItem("temperature") || "1");
        const maxTokens = parseInt(localStorage.getItem("maxTokens") || "750");
        const topP = parseFloat(localStorage.getItem("topP") || "1");
        const frequencyPenalty = parseFloat(localStorage.getItem("frequencyPenalty") || "0");
        const presencePenalty = parseFloat(localStorage.getItem("presencePenalty") || "0");

        const response = await makeRequest(userInput, systemInput, model, temperature, maxTokens, topP, frequencyPenalty, presencePenalty);
        setResponse(response || "");
    }

    return (
        <div>
            <GPTCustomization />
            <br></br>
            <button onClick={getResults}>Get Answer</button>
            <br></br>
            {response !== "" && <div>
                <p>Response with:</p>
                <div className="Response">
                    {response}
                </div>
            </div>}
        </div>
    )
}