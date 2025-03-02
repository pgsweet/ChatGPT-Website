import { useState } from "react";
import { makeRequest } from "../gpt/OpenAI";
import "./ChatGPT.css";
import { GPTCustomization } from "./GPTCustomization";
import MarkdownRenderer from "./Markdown";

export function ChatGPT(): JSX.Element {
    const [response, setResponse] = useState<string>("");

    async function getResults() {
        const userInput = localStorage.getItem("userInput") || "";
        const systemInput = localStorage.getItem("systemInput") || "";
        const model = localStorage.getItem("model") || "gpt-4.5-preview";
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
                    <MarkdownRenderer content={response} />
                </div>
            </div>}
        </div>
    )
}
