var script = document.createElement('script');script.src = "https://code.jquery.com/jquery-3.4.1.min.js";document.getElementsByTagName('head')[0].appendChild(script);

(function() {
    // Check if jQuery is loaded
    if (typeof jQuery == 'undefined') {
        // jQuery is not loaded, load it
        var script = document.createElement('script');
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
        script.onload = runChatbot;
        document.head.appendChild(script);
    } else {
        // jQuery is loaded, run the chatbot
        runChatbot();
    }

    function runChatbot() {
        // Inject CSS
        var css = `
          #chat-bot-body {
            background: #efefef;      
            height:100%;
            visibility: hidden;
          }

          #chat-circle {
            box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.2), 0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            background: white;
            position: fixed;
            bottom: 30px;
            right: 30px;
            border-radius: 50%;
            z-index: 999;
            color: white;
            cursor: pointer;
            font-size: 2em;
            padding: 2px 6px;
          }

          #chat-overlay {
              background: rgba(255,255,255,0.1);
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              display: none;
          }
        
          .chat-box {
            display:none;
            background: #efefef;
            position:fixed;
            right:30px;
            bottom:50px;  
            width:350px;
            max-width: 85vw;
            max-height:100vh;
            border-radius:5px;  
          /*   box-shadow: 0px 5px 35px 9px #464a92; */
            bottom: 0px; /* Stick the chat box to the bottom of the page */
            border: 2px solid black;
            z-index: 999;
          }
          .chat-box-toggle {
            float:right;
            margin-right:15px;
            cursor:pointer;
          }
          .chat-box-header {
            background: beige;
            height:70px;
            color:black;
            text-align:left;
            font-size:18px;
            padding:20px 15px 15px 18px;
            user-select: none;
          }
          .chat-box-body {
            position: relative;  
            height:370px;  
            border:1px solid #ccc;  
            overflow: hidden;
          }
          .chat-box-body:after {
            content: "";
            background: #f5f5f5;
            opacity: 0.1;
            top: 0;
            left: 0;
            right: 0;
            height:100%;
            position: absolute;
            z-index: -1;   
          }
          #chat-input {
            background: #f4f7f9;
            width:80%; 
            position:relative;
            padding: 10px;
            border:none;
            resize:none;
            outline:none;
            border:1px solid #ccc;
            color:black;
            border-top:none;
            border-bottom-right-radius:5px;
            border-bottom-left-radius:5px;
            overflow:hidden;
            overflow-y: auto;
            bottom: 0;
            font-size: 15px;
          }
          .chat-input > form {
              margin-bottom: 0;
          }
          #chat-input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
            color: #ccc;
          }
          #chat-input::-moz-placeholder { /* Firefox 19+ */
            color: #ccc;
          }
          #chat-input:-ms-input-placeholder { /* IE 10+ */
            color: #ccc;
          }
          #chat-input:-moz-placeholder { /* Firefox 18- */
            color: #ccc;
          }
          .chat-submit {
            color: black;
            box-shadow:none;
            border:none;
            background: beige;
            width:20%; /* change this */
            font-size:12px;
          }
          .chat-logs {
            display: flex;
            flex-direction: column-reverse;
            padding:15px; 
            height:100%;
            word-wrap: break-word;
            overflow-y: auto;
            font-size:13px;
          }
          
          .chat-logs::-webkit-scrollbar-track
          {
              -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
              background-color: #F5F5F5;
          }
          
          .chat-logs::-webkit-scrollbar
          {
              width: 5px;  
              background-color: #F5F5F5;
          }
          
          .chat-logs::-webkit-scrollbar-thumb
          {
              background-color: #5A5EB9;
          }
          
          @media only screen and (max-width: 500px) {
             .chat-logs {
                  height:40vh;
              }
          }
          
          .chat-msg.user > .msg-avatar img {
            width:45px;
            height:45px;
            border-radius:50%;
            float:left;
          }
          .chat-msg.self > .msg-avatar img {
            width:45px;
            height:45px;
            border-radius:50%;
            float:right;
          }
          .cm-msg-text {
            background:white;
            padding:10px 15px 10px 15px;  
            color:#666;
            max-width:75%;
            float:left;
            margin-left:10px; 
            position:relative;
            margin-bottom:20px;
            border-radius:30px;
          }
          .chat-msg {
            clear:both;    
          }
          .chat-msg.self > .cm-msg-text {  
            float:right;
            margin-right:10px;
            background: #5A5EB9;
            color:white;
          }
          .form-container {
            display: flex;
            justify-content: space-between;
          }
          .chat-message a {
            color: #0070E0;
          }
          .typing-indicator {
            display: inline-block;
            margin-left: 2px;
          }
          
          .dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            margin-right: 3px;
            background-color: #000;
            border-radius: 50%;
            animation: bounce 1s infinite;
          }
          
          @keyframes bounce {
              0%, 20%, 50%, 80%, 100% {
                  transform: translateY(0);
              }
              40% {
                  transform: translateY(-5px);
              }
              60% {
                  transform: translateY(-3px);
              }
          }
          
          .dot:nth-child(1) {
              animation-delay: 0.2s;
          }
          
          .dot:nth-child(2) {
              animation-delay: 0.4s;
          }
          
          .dot:nth-child(3) {
              animation-delay: 0.6s;
          }

          .spacer {
            flex-grow: 1;
          }

          #chatbot-icon {
            width: 90%;  /* Adjust as needed */
            height: 90%;  /* Adjust as needed */
          }

          .svg-cls-1 {
            fill: #cfe1ff;
          }

          .svg-cls-2 {
              fill: none;
              stroke: #0b2959;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 2px;
          }
          .chat-self {
            align-self: flex-end;
            max-width: 70%;
            width: auto;
            margin: 15px 8px;
            padding: 8px 10px;
            background: rgb(235, 235, 235);
            border-radius: 10px 10px 10px;
            box-shadow: rgba(50, 50, 50, 0.2) 4px 4px 5px 0px;
            word-break: break-word;
          }

          .chat-friend {
            align-self: flex-start;
            max-width: 70%;
            width: auto;
            margin: 15px 8px;
            padding: 8px 10px;
            background: rgb(255, 255, 255);
            border-radius: 10px 10px 10px 0px;
            box-shadow: rgba(50, 50, 50, 0.2) 4px 4px 5px 0px;
            word-break: break-word;
          }

          #chat-circle, .chat-box {
            transition: opacity 0.3s, transform 0.3s;
            transform-origin: bottom right; /* This will make it scale towards the bottom right */
          }
          
          .visible {
            opacity: 1;
            transform: scale(1);
            display: block;
          }
          
          .hidden {
            opacity: 0;
            transform: scale(0);
            display: none; /* Initially hidden */
          }
        `;
        var style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);

        // Inject HTML
        var html = `
        
 <div id="chat-bot-body">
          <div id="chat-circle" class="btn btn-raised visible">
              <svg id="chatbot-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <circle class="svg-cls-1" cx="47.94" cy="35.52" r="13.5"/>
                  <path class="svg-cls-2"
                        d="m21.17,16.71v3.88c0,.65.26,1.27.72,1.73l2.05,2.05c.38.38.11,1.02-.42,1.02H7.83c-1.35,0-2.45-1.1-2.45-2.45v-6.23c0-1.35,1.1-2.45,2.45-2.45h10.89c1.35,0,2.45,1.1,2.45,2.45Z"/>
                  <line class="svg-cls-2" x1="16.5" y1="19.79" x2="16.55" y2="19.79"/>
                  <line class="svg-cls-2" x1="9.85" y1="19.79" x2="12.9" y2="19.79"/>
                  <path class="svg-cls-2"
                        d="m42.83,9.16v3.88c0,.65-.26,1.27-.72,1.73l-2.05,2.05c-.38.38-.11,1.02.42,1.02h15.68c1.35,0,2.45-1.1,2.45-2.45v-6.23c0-1.35-1.1-2.45-2.45-2.45h-10.89c-1.35,0-2.45,1.1-2.45,2.45Z"/>
                  <line class="svg-cls-2" x1="50.5" y1="12.25" x2="47.45" y2="12.25"/>
                  <line class="svg-cls-2" x1="54.15" y1="12.25" x2="54.1" y2="12.25"/>
                  <line class="svg-cls-2" x1="26.86" y1="48.91" x2="26.86" y2="45.35"/>
                  <line class="svg-cls-2" x1="38.26" y1="45.35" x2="38.26" y2="48.91"/>
                  <path class="svg-cls-2" d="m23.16,23.57c1.86-1.76,4.22-3,6.84-3.5"/>
                  <path class="svg-cls-2"
                        d="m34.83,20.02c6.47,1.08,11.41,6.71,11.41,13.49v8.56c0,1.26-1.02,2.28-2.28,2.28h-22.79c-1.26,0-2.28-1.02-2.28-2.28v-8.56c0-2.84.87-5.48,2.35-7.67"/>
                  <circle class="svg-cls-2" cx="32.56" cy="17.72" r="2.99"/>
                  <path class="svg-cls-2" d="m46.23,31.39h.93c.82,0,1.49.66,1.49,1.49v6.15c0,.82-.66,1.49-1.49,1.49h-.93"/>
                  <path class="svg-cls-2" d="m18.89,31.39h-.93c-.82,0-1.49.66-1.49,1.49v6.15c0,.82.66,1.49,1.49,1.49h.93"/>
                  <g>
                      <line class="svg-cls-2" x1="36.67" y1="27.25" x2="36.67" y2="28.69"/>
                      <line class="svg-cls-2" x1="28.78" y1="27.25" x2="28.78" y2="28.69"/>
                  </g>
                  <path class="svg-cls-2"
                        d="m40.1,34.9c.17-.62.25-1.26.25-1.91,0-.35-.28-.64-.64-.64h-13.98c-.35,0-.64.28-.64.64,0,.64.09,1.28.25,1.91"/>
                  <path class="svg-cls-2" d="m25.35,34.9c1.05,4.07,5.21,6.52,9.28,5.46,2.68-.69,4.77-2.79,5.46-5.46"/>
                  <path class="svg-cls-2" d="m16.49,49.47h32.15c1.66,0,3,1.34,3,3v4.92H13.49v-4.92c0-1.66,1.34-3,3-3Z"/>
                  <line class="svg-cls-2" x1="25.69" y1="35.87" x2="39.33" y2="35.87"/>
                  <line class="svg-cls-2" x1="14.39" y1="54.27" x2="50.94" y2="54.27"/>
              </svg>
          </div>

          <div class="chat-box hidden">
              <div class="chat-box-header">
                  Váš AI asistent
                  <span class="chat-box-toggle">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                  </span>
              </div>
              <div class="chat-box-body">
                  <div class="chat-logs">
                      <div class="spacer"></div>
                  </div><!--chat-log -->
              </div>
              <div class="chat-input">
                  <form class="form-container">
                      <textarea id="chat-input" placeholder="Napište zprávu..."></textarea>
                      <button type="submit" class="chat-submit" id="chat-submit">Odeslat
                      </button>
                  </form>
              </div>
          </div>
      </div>
          `;
          var div = document.createElement('div');
          div.innerHTML = html;
          div.style.position = 'fixed';  // Set position to fixed
          div.style.bottom = '0';  // Position at the bottom of the window
          div.style.right = '0';  // Position at the right of the window
          div.style.zIndex = '5';
          var referenceNode = document.getElementById('footer');
          referenceNode.parentNode.insertBefore(div, referenceNode.nextSibling);

          // Run JavaScript
          var script = document.createElement('script');
          script.innerHTML = `  

    $(document).ready(function() {
        // Change to "false" to hide chatbot
        const SHOW_BOT = true;

        // Time to keep chat history in milliseconds (e.g., 24 hours = 86400000 ms)
        const EXPIRATION_TIME = 86400000; 
        
        let chatHistory = [];
        let greeted = false;

        const chatLogs = $('.chat-logs');
        const chatInput = $('#chat-input');
        const chatSubmit = $('#chat-submit');

        if (SHOW_BOT) {
            $("#chat-bot-body").css("visibility", "visible");
        }

        loadChatHistory();

        chatInput.on('keypress', handleKeyPress);
        chatSubmit.on('click', sendMessage);

        $("#chat-circle").click(function() {
            toggleChat();
        });

        $(".chat-box-toggle").click(function() {
            toggleChat();
        });

        function toggleChat() {
          const chatCircle = document.getElementById('chat-circle');
          const chatBox = document.querySelector('.chat-box');

          // Function to handle the end of a transition
          function handleTransitionEnd(event) {
            if (event.propertyName === 'opacity') {
              const layout = this.id === 'chat-circle' ? 'flex' : 'block';
              this.style.display = this.classList.contains('hidden') ? 'none' : layout;
              this.removeEventListener('transitionend', handleTransitionEnd);
            }
          }

          // Toggle chat circle
          chatCircle.addEventListener('transitionend', handleTransitionEnd);
          if (chatCircle.classList.contains('hidden')) {
            chatCircle.style.display = 'flex'; // Make it block before starting the transition
            setTimeout(() => {
              chatCircle.classList.toggle('visible');
              chatCircle.classList.toggle('hidden');
            }, 0);
          } else {
            chatCircle.classList.toggle('visible');
            chatCircle.classList.toggle('hidden');
          }

          // Toggle chat box
          chatBox.addEventListener('transitionend', handleTransitionEnd);
          if (chatBox.classList.contains('hidden')) {
            chatBox.style.display = 'block'; // Make it block before starting the transition
            setTimeout(() => {
              chatBox.classList.toggle('visible');
              chatBox.classList.toggle('hidden');
            }, 0);
          } else {
            chatBox.classList.toggle('visible');
            chatBox.classList.toggle('hidden');
          }

          scrollToTheBottom();
          if (!greeted) {
            greetUser(true);
          }
        }

        function handleKeyPress(e) {
            if (e.which === 13 && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        }

        function sendMessage() {
            const message = chatInput.val();
            if (message.length === 0) { return; }
            chatInput.val('');
            setFormAvailability(true);

            const messageElement = createMessageElement(message, 'Vy', 'self');
            prependMessage(messageElement);

            const typingIndicator = createTypingIndicator();
            prependMessage(typingIndicator);

            scrollToTheBottom();

            $.ajax({
                url: 'https://metaexponential.eu.pythonanywhere.com/api',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    question: message,
                    chat_history: chatHistory
                }),
                dataType: 'json',
                success: function(data) {
                    var answer = data.answer;

                    typingIndicator.remove();

                    // Update chat history
                    chatHistory.push({ 'HumanMessage': message });
                    chatHistory.push({ 'AIMessage': answer });

                    // Save chat history
                    saveChatHistory();

                    // Write the answer to the window
                    var messageElement = $('<div class="chat-friend"><div class="icon"><i class="material-icons"><b>Chatbot</b></i></div><div class="chat-message"></div></div>');
                    $('.chat-logs').prepend(messageElement);
                    typeMessage(urlify(answer), messageElement.find('.chat-message'));

                    // Re-enable the input and submit button
                    setFormAvailability(false);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                    // Remove typing indicator in case of error
                    typingIndicator.remove();

                    // Re-enable the input and submit button
                    setFormAvailability(false);

                    let error_message = 'Error! Vyskytla se chyba! Prosíme použijte kontaktní formulář.';
                    if (jqXHR.status === 429) {
                      const response = JSON.parse(jqXHR.responseText);
                      error_message = response.message;
                    }
                    var errorMessageElement = $('<div class="chat-friend"><div class="icon"><i class="material-icons"><b>Chatbot</b></i></div><div class="chat-message">' + error_message + '</div></div>');
                    prependMessage(errorMessageElement);
                }
            });
        }

        function urlify(text) {
          return text;
        }

        function renderMessage(message, type) {
            const clazz = type === 'HumanMessage' ? 'chat-self' : 'chat-friend';
            const title = type === 'HumanMessage' ? 'Vy' : 'Chatbot';
            var messageDiv = '<div class="' + clazz + '"><div class="icon"><i class="material-icons"><b>' + title + '</b></i></div><div class="chat-message">' + message + '</div></div>'
            prependMessage(messageDiv);
        }

        function createMessageElement(message, senderName, className) {
            return $('<div class="chat-' + className + '"><div class="icon"><i class="material-icons"><b>' + senderName + '</b></i></div><div class="chat-message">' + message + '</div></div>');
        }

        function greetUser(shouldTypeMessage) {
            var greeting = "Dobrý den, jsem asistenční robot Moia. Rád vám poradím s výběrem krému. Ptejte se...";
            var messageElement = $('<div class="chat-friend"><div class="icon"><i class="material-icons"><b>Chatbot</b></i></div><div class="chat-message"></div></div>');
            $('.chat-logs').prepend(messageElement);
            if (shouldTypeMessage) {
                typeMessage(greeting, messageElement.find('.chat-message'));
            }
            else {
                messageElement.append(greeting);
            }
            greeted = true;
        }

        function typeMessage(message, element) {
          var i = 0;
          var tempMessage = "";
          var isInsideTag = false;
          var tagBuffer = "";
      
          function typeWriter() {
              if (i < message.length) {
                  var char = message.charAt(i);
      
                  if (char === '<') {
                      isInsideTag = true;
                  }
      
                  if (isInsideTag) {
                      tagBuffer += char;
                  } else {
                      tempMessage += char;
                  }
      
                  if (char === '>') {
                      isInsideTag = false;
                      tempMessage += tagBuffer;
                      tagBuffer = "";
                  }
      
                  element.html(tempMessage);  // Use .html() to update the entire text content
                  i++;
      
                  // Scroll to the bottom of the chat logs
                  scrollToTheBottom();
                  requestAnimationFrame(typeWriter);
              }
          }
          requestAnimationFrame(typeWriter);
      }

        function clearChatHistory() {
            localStorage.removeItem('chatHistory');
            chatHistory = [];
            $('.chat-logs').html('');
        }

        function createTypingIndicator() {
            return $('<div class="chat-friend"><div class="icon"><i class="material-icons"><b>Chatbot</b></i></div><div class="typing-indicator"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>');
        }

        function scrollToTheBottom() {
            chatLogs.scrollTop(0);
        }

        function setFormAvailability(newState) {
            chatInput.prop('disabled', newState);
            chatSubmit.prop('disabled', newState);
        }

        function loadChatHistory() {
            const savedData = localStorage.getItem('chatHistory');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                const currentTime = new Date().getTime();
                
                // Check if the chat history has expired
                if (currentTime - parsedData.timestamp < EXPIRATION_TIME) {
                    chatHistory = parsedData.chatHistory;
                    renderChatHistory();
                } else {
                    // If the chat history has expired, remove it from local storage
                    localStorage.removeItem('chatHistory');
                }
            }
        }

        function saveChatHistory() {
            const data = {
                chatHistory: chatHistory,
                timestamp: new Date().getTime()
            };
            localStorage.setItem('chatHistory', JSON.stringify(data));
        }

        function renderChatHistory() {
            chatLogs.html('');
            greetUser(false);
            chatHistory.forEach(function(entry) {
                const type = Object.keys(entry)[0];
                const message = entry[type];
                const messageWithLinks = urlify(message);
                renderMessage(messageWithLinks, type);
            });
        }

        function prependMessage(messageElement) {
            chatLogs.prepend(messageElement);
        }
});
  `;

  document.body.appendChild(script);

    }
})();
