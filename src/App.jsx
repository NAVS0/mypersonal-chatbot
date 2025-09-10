import { useState, useRef, useEffect } from 'react'
import ChatbotIcon from './components/ChatbotIcon'
import ChatForm from './components/ChatForm'
import ChatMessage from './components/ChatMessage'
import { companyInfo } from './components/companyInfo'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'


const App = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    }
  ]);
  const [showChatbot, setShowchatbot] = useState(false);
  const chatBodyRef = useRef(null);

  const generateBotResponse = async (history) => {
    // Helper function to update history
    const updateHistory = (text, isError = false) =>{
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Halat lang..."), {role: "model", text, isError}]);
    } 

    //Format chat history for API request
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({contents: history})
    };

    try{
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        throw new Error("VITE_API_URL is not set. Configure it in your environment or GitHub Secrets.");
      }
      // Make the API call to get the bot's response
      const response = await fetch(apiUrl, requestOptions);
      const ct = response.headers.get('content-type') || '';
      if (!ct.includes('application/json')) {
        const text = await response.text();
        throw new Error(`API did not return JSON (${response.status}).`);
      }
      const data = await response.json();

      //Clean and update chat history with bot's response
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } catch (error){ 
      updateHistory(error.message, true);
    }

  };

  useEffect(() => {
    // Auto-scroll whenever chat history updates
    if (!chatBodyRef.current) return;
    chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth"});
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <Navbar />
      
      {/* Chatbot backdrop overlay */}
      <div 
        className="chatbot-backdrop" 
        onClick={() => setShowchatbot(false)}
      ></div>
      
      <button onClick={() => setShowchatbot(prev => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>
    
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Navs.Devs Bot</h2>
          </div>
          <button onClick={() => setShowchatbot(prev => !prev)} className="material-symbols-rounded">keyboard_arrow_down</button>
        </div>
        {/* Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there <br /> How can I help you today?
            </p> 
          </div>

          {/* Render the chat history dynamically */}
          {chatHistory.map((chat, index) =>(
            <ChatMessage key={index} chat={chat} />
          ))}
        </div> 
  
        {/* Chatbot Footer */}
        <div className="chat-footer">
            <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
        </div>
      </div>

      <Hero />

    </div>
  )
}

export default App
