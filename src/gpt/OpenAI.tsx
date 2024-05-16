import OpenAI from "openai";

export async function makeRequest(userInput: string) {
    const key = localStorage.getItem("OPENAI_API_KEY")?.replace(/['"]+/g, '')
    if (key === null) {
        throw new Error("API key not found");
        return null;
    }

    const openai = new OpenAI({apiKey: key , dangerouslyAllowBrowser: true });
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {role: "system", content: "You are a helpful assistant."},
            {role: "user", content: userInput}
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    return response.choices[0].message.content;
}