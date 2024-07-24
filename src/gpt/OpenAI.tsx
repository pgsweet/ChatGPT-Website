import OpenAI from "openai";

export async function makeRequest(userInput: string, systemInput: string, model: string, temperature: number, max_toekns: number, top_p: number, frequency_penalty: number, presence_penalty: number) {
    const key = localStorage.getItem("OPENAI_API_KEY")?.replace(/['"]+/g, '')
    if (key === undefined || key === null) {
        console.log("API key not found")
        alert("API key not found")
        return null;
    } else {
        console.log("APIKey: " + key)
    }

    console.log("User Input: " + userInput)
    console.log("System Input: " + systemInput)

    console.log("Model: " + model +
    "\nTemperature: " + temperature +
    "\nMax Tokens: " + max_toekns +
    "\nTop P: " + top_p +
    "\nFrequency Penalty: " + frequency_penalty +
    "\nPresence Penalty: " + presence_penalty);

    if (userInput === "") {
        console.log("No user input, no request made")
        return null;
    }

    const openai = new OpenAI({apiKey: key , dangerouslyAllowBrowser: true });
    let response;

    if (systemInput !== "") {
        response = await openai.chat.completions.create({
            model: model, //"gpt-4o",
            messages: [
                {role: "system", content: systemInput},
                {role: "user", content: userInput}
            ],
            temperature: temperature, //1,
            max_tokens: max_toekns, //256,
            top_p: top_p, //1,
            frequency_penalty: frequency_penalty, //0,
            presence_penalty: presence_penalty, //0,
        });
    } else {
        response = await openai.chat.completions.create({
            model: model, //"gpt-4o",
            messages: [
                {role: "user", content: userInput}
            ],
            temperature: temperature, //1,
            max_tokens: max_toekns, //256,
            top_p: top_p, //1,
            frequency_penalty: frequency_penalty, //0,
            presence_penalty: presence_penalty, //0,
        });
    }

    const responseText = response.choices[0].message.content;
    console.log(responseText);
    return responseText;
}