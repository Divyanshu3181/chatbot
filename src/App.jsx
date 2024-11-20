import React, { useState } from 'react'
import "./App.css"
import { FaCode, FaPython } from "react-icons/fa";
import { IoPlanet, IoSend } from 'react-icons/io5';
import { TbMessageChatbotFilled } from 'react-icons/tb';
import { GoogleGenerativeAI } from "@google/generative-ai";


const App = () => {

  const [message, setMessage] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false); // Loading state


  const hitRequest = () => {
    if (message) {
      generateResponse(message)
    } else {
      alert("You must write something")
    }
  };

  const generateResponse = async (msg) => {
    setLoading(true); // Set loading to true
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyBWdHVMGAbRmnyMpKdkXN1SEwXdR7twWTI");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(msg);
      
      const userMessage = { type: "userMsg", text: msg };
      const botMessage = { type: "responseMsg", text: result.response.text() };

      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
      setIsResponseScreen(true);
      setMessage("");
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };


  return (
    <div>
      <div className="w-screen min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
        {
          isResponseScreen ?
            <div className='h-[70vh]'>
              <div className="header flex items-center justify-between w-[100vw] px-[20px] pt-[25px]">
                <h2 className='text-2xl font-bold'>Assist Me</h2>
                <button
                  onClick={() => {
                    setIsResponseScreen(false);
                    setMessages([]);
                  }}
                  className='newChatBtn bg-[#1b1a1a] p-[10px] rounded-lg text-[14px] px-[20px] transition duration-200 hover:bg-[#333]'
                >
                  New Chat
                </button>
              </div>
              <div className="messages">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.type} p-2 rounded-lg my-2`}>
                    {msg.type === "userMsg" ? `You: ${msg.text}` : msg.text}
                  </div>
                ))}
              </div>
            </div> :
            <div className="h-[70vh] flex items-center flex-col justify-center cursor-pointer">
              <h1 className="text-5xl font-semibold">Assist Me</h1>
              <div className="boxes mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-screen-lg px-6">

                {/* Card 1 */}
                <div className="card rounded-lg cursor-pointer transition-all transform hover:bg-[#472929] hover:scale-105 px-4 py-6 bg-[#181818] relative flex flex-col items-center justify-between shadow-lg">
                  <p className="text-lg text-center">What is coding? <br /> How can we learn it?</p>
                  <i className="absolute right-4 bottom-4 text-2xl text-[#E6B422]"><FaCode /></i>
                </div>

                {/* Card 2 */}
                <div className="card rounded-lg cursor-pointer transition-all transform hover:bg-[#472929] hover:scale-105 px-4 py-6 bg-[#181818] relative flex flex-col items-center justify-between shadow-lg">
                  <p className="text-lg text-center">Which is the red <br /> planet of the solar system?</p>
                  <i className="absolute right-4 bottom-4 text-2xl text-[#E6B422]" ><IoPlanet /></i>
                </div>

                {/* Card 3 */}
                <div className="card rounded-lg cursor-pointer transition-all transform hover:bg-[#472929] hover:scale-105 px-4 py-6 bg-[#181818] relative flex flex-col items-center justify-between shadow-lg">
                  <p className="text-lg text-center">In which year was Python <br /> invented?</p>
                  <i className="absolute right-4 bottom-4 text-2xl text-[#E6B422]"><FaPython /></i>
                </div>

                {/* Card 4 */}
                <div className="card rounded-lg cursor-pointer transition-all transform hover:bg-[#472929] hover:scale-105 px-4 py-6 bg-[#181818] relative flex flex-col items-center justify-between shadow-lg">
                  <p className="text-lg text-center">How can we use <br /> AI for adoption?</p>
                  <i className="absolute right-4 bottom-4 text-2xl text-[#E6B422]"><TbMessageChatbotFilled /></i>
                </div>

              </div>
            </div>
        }

        {/* Input Box with Icon */}
        <div className="bottom p-4 w-full flex justify-center">
          <div className="w-3/4 flex items-center bg-[#2D2D2D] rounded-lg p-3 shadow-md">
            <input
              value={message} onChange={(e) => { setMessage(e.target.value) }}
              type="text"
              className="w-full bg-transparent text-white outline-none rounded-l-lg"
              placeholder="Write your message here...."
              id="messageBox"
              aria-label="Message input"
            />
            {loading ? <span className="text-blue-500">Loading...</span> : (message === "" ? "" : <i className="text-blue-500 text-[25px] ml-3 cursor-pointer " onClick={hitRequest}><IoSend /></i>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
