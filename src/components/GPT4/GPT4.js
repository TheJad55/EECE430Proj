import React, { useState, useEffect } from "react";
import axios from "axios";

const Chat = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [assistantMessages, setAssistantMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = async (event) => {
    event.preventDefault();
    setInputValue("");
    if (isSubmitting) return;
    setIsSubmitting(true);
    await sendMessage(inputValue, "user");

    setIsSubmitting(false);
  };
  const sendMessage = async (content, role) => {
    const newMessages = [...userMessages, { role, content }];
    setUserMessages(newMessages);
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
    if (choices && choices.length > 0) {
      const newMessage = {
        role: "assistant",
        content: choices[0].message.content,
      };
      setAssistantMessages([...assistantMessages, newMessage]);
    }
  };

  useEffect(() => {
    if (!hasInitialized) {
      sendMessage(
        "Hello ChatGPT, you are now a Basketball advisor AI, any questions you are asked about basketball you will answer concisely and try to relate to basketball. The player in this chat may ask you about stats, games, and more. Do not answer to any question not related to basketball. The player will be talking to you from now, greet him and introduce yourself.",
        "user"
      );
      setHasInitialized(true);
    }
  }, [hasInitialized]);
  const messages = userMessages.reduce((acc, userMessage, index) => {
    if (index > 0) {
      acc.push(userMessage);
    }
    if (assistantMessages[index]) {
      acc.push(assistantMessages[index]);
    }
    return acc;
  }, []);

  return (
    <section id="gpt" className="w-full py-20 border-b-[1px] border-b-black">
      <div className="flex flex-col h-[50vh] rounded-md bg-gray-700">
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
              <div className="flex flex-grow">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="flex-1 py-2  px-4 rounded-md border-black focus:outline-none focus:border-blue-500 text-black"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-4 bg-blue-500 text-white ml-2 rounded-md shadow-md"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chat;
