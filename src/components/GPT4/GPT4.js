import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [assistantMessages, setAssistantMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = async (event) => {
    event.preventDefault();

    const newMessages = [
      ...userMessages,
      { role: "user", content: inputValue },
    ];
    setUserMessages(newMessages);
    setInputValue("");
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: newMessages,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`,
        },
      }
    );

    const { choices } = response.data;
    console.log("choices", choices);
    console.log("choices[0]", choices[0].message.content);
    if (choices && choices.length > 0) {
      const newMessage = {
        role: "assistant",
        content: choices[0].message.content,
      };
      setAssistantMessages([...assistantMessages, newMessage]);
    }
  };

  const messages = userMessages.reduce((acc, userMessage, index) => {
    acc.push(userMessage);
    if (assistantMessages[index]) {
      acc.push(assistantMessages[index]);
    }
    return acc;
  }, []);

  return (
    <section id="gpt" className="w-full py-20 border-b-[1px] border-b-black">
    <div className="flex flex-col h-screen rounded-md bg-gray-700">
      <div className="flex-1 overflow-y-auto p-6">
        <ul className="list-none">
          {messages.map((message, index) => (
            <li
              key={index}
              className={
                message.role === "user" ? "text-right mb-4" : "text-left mb-4"
              }
            >
              <div
                className={
                  message.role === "user"
                    ? "bg-blue-500 text-white py-2 px-4 rounded-md shadow-md inline-block"
                    : "bg-white text-gray-800 py-2 px-4 rounded-md shadow-md inline-block"
                }
              >
                {message.content}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full bg-gray p-4">
        <form onSubmit={handleInputSubmit}>
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-1 py-2 px-4 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white ml-2 rounded-md shadow-md"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
    </section>
  );
};

export default Chat;
