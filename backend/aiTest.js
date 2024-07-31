const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); 
const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});



async function format(){
    const prompt = `i want every thing in square brackets (time alone in square brackets and task alone in square brackets) stick to this form of response([time]:[task],[time]:[task])   i have time from 12 pm to 7 pm and i want to make my homework and assignments and go to the gym and have dinner with my family`

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    
}

format();