import { useState, useRef } from "react";
import { FaUser, FaRobot } from "react-icons/fa";
import Logo from "../src/logo.png";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [sidebarTopics, setSidebarTopics] = useState([]);
  const inputRef = useRef(null);

  // diri nga part siya mag handle ug imong iinput nga message para isend sa chatbox and mag display
  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputValue, sender: "user" },
      ]);

      // diri nga part maong mo buhat ug respond ang bot ...pero diri pud nga part tong sa API
      let botResponse = "";

      // Generate bot response based on user input
      if (inputValue.toLowerCase().includes("hi")) {
        botResponse = "Hello! How can I assist you?";
      } else if (inputValue.toLowerCase().includes("jobbhy")) {
        botResponse =
          "Jobbhy is a job employment company based in Cagayan de Oro City, Misamis Oriental, Philippines";
      } else if (inputValue.toLowerCase().includes("pointersbit")) {
        botResponse =
          "Pointersbit is a software company is based in Cagayan de Oro City, Misamis Oriental, Philippines.";
      } else {
        botResponse = "There is not response yet no back-end API available.";
      }

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, sender: "bot" },
        ]);
      }, 500);

      // diri nga part everytime mo enter kag new topic automatic mo display siya sa sidebar
      setSidebarTopics((prevTopics) => [...prevTopics, inputValue]);

      setInputValue("");
    }
  };
  //if mo click ug new chat mao ning dagan
  const handleNewChat = () => {
    setInputValue("");
    inputRef.current.focus();
  };
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="App">
      {/*sidebar section*/}
      <section className="Sidebar">
        <nav className="logo">
          <img src={Logo} alt="Logo" />
        </nav>
        <button className="button" onClick={handleNewChat}>
          <ion-icon name="add-outline"></ion-icon>&nbsp; &nbsp;New chat
        </button>
        {/*part sa sidebar diri ma post ang gipang type nga message */}
        <ul className="History">
          <li>
            <ion-icon name="chatbox-outline"></ion-icon>&nbsp; &nbsp;New Message
          </li>
          {sidebarTopics.map((topic, index) => (
            <li key={index}>
              <ion-icon name="chatbox-outline"></ion-icon>&nbsp; &nbsp;
              {topic}
            </li>
          ))}
        </ul>
        <nav className="Footer">
          <p>
            <ion-icon name="settings-outline"></ion-icon>&nbsp; &nbsp; Settings
          </p>
          <ion-icon name="person-outline"></ion-icon>&nbsp; &nbsp; Jason Ryler
          H. Los Baños
        </nav>
      </section>
      {/*for chatbot */}
      <section className="Main">
        <h1>
          CHAT JTP&nbsp;
          <ion-icon className="logo" name="logo-octocat"></ion-icon>
        </h1>
        <ul className="NewHistory"></ul>
        <div className="chat">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              <span className="message-icon">
                {message.sender === "user" ? <FaUser /> : <FaRobot />}
                &nbsp;&nbsp;
              </span>
              <span className="message-text">{message.text}</span>
            </div>
          ))}
        </div>

        {/*for input */}
        <div className="bottom-section">
          <div className="input-container">
            <input
              className="input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="&nbsp;Ask me anything..."
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            <button type="Submit" id="submit" onClick={handleSendMessage}>
              <ion-icon name="caret-forward-outline"></ion-icon>
            </button>
            <p className="info">
              Artificial intelligence is revolutionizing the way we live and
              work, pushing the boundaries of what's possible and shaping the
              future of technology
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default App;
