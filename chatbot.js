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
          #center-text {          
            display: flex;
            flex: 1;
            flex-direction:column; 
            justify-content: center;
            align-items: center;  
            height:100%;
          }
          #chat-circle {
            position: fixed;
            bottom: 50px;
            right: 50px;
            width: 80px;
            height: 80px;  
            border-radius: 50%;
            color: white;
            cursor: pointer;
            padding: 0px;
            box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.6), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size:2em;
            z-index: 50;
          }
          
          .btn#my-btn {
               background: white;
              padding-top: 13px;
              padding-bottom: 12px;
              border-radius: 45px;
              padding-right: 40px;
              padding-left: 40px;
              color: #5865C3;
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
            z-index: 50;
          }
          .chat-box-toggle {
            float:right;
            margin-right:15px;
            cursor:pointer;
          }
          .chat-box-header {
            background: linear-gradient(to right, #fd5bfb, #313082);
            height:70px;
            color:white;
            text-align:left;
            font-size:18px;
            padding:20px 15px 15px 15px;
            user-select: none;
          }
          .chat-box-body {
            position: relative;  
            height:370px;  
            height:auto;
            border:1px solid #ccc;  
            overflow: hidden;
          }
          .chat-box-body:after {
            content: "";
            background: #f5f5f5;
            opacity: 0.1;
            top: 0;
            left: 0;
            bottom: 0;
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
            color:#888;
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
            color: white;
            box-shadow:none;
            border:none;
            background: linear-gradient(to right, #fd5bfb, #313082);
            width:20%; /* change this */
            font-size:12px;
          }
          .chat-logs {
            padding:15px; 
            height:370px;
            word-wrap: break-word;
            user-select: none;
            overflow-y: scroll;
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
            width:15%;
          }
          .chat-msg.self > .msg-avatar img {
            width:45px;
            height:45px;
            border-radius:50%;
            float:right;
            width:15%;
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
          .cm-msg-button>ul>li {
            list-style:none;
            float:left;
            width:50%;
          }
          .cm-msg-button {
              clear: both;
              margin-bottom: 70px;
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
          #chatbot-icon {
            width: 100%;  /* Adjust as needed */
            height: 100%;  /* Adjust as needed */
          }

        `;
        var style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);

        // Inject HTML
        var html = `
        
  <div id="chat-bot-body"> 
            
        <div id="chat-circle" class="btn btn-raised">
          <div id="chat-overlay"></div>
            <button id="chat-circle" class="btn btn-raised">  
              <svg id="chatbot-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <defs>
                  <style>
                    .cls-1 {
                      fill: #cfe1ff;
                    }
              
                    .cls-2 {
                      fill: none;
                      stroke: #0b2959;
                      stroke-linecap: round;
                      stroke-linejoin: round;
                      stroke-width: 2px;
                    }
                  </style>
                </defs>
                <circle class="cls-1" cx="47.94" cy="35.52" r="13.5"/>
                <path class="cls-2" d="m21.17,16.71v3.88c0,.65.26,1.27.72,1.73l2.05,2.05c.38.38.11,1.02-.42,1.02H7.83c-1.35,0-2.45-1.1-2.45-2.45v-6.23c0-1.35,1.1-2.45,2.45-2.45h10.89c1.35,0,2.45,1.1,2.45,2.45Z"/>
                <line class="cls-2" x1="16.5" y1="19.79" x2="16.55" y2="19.79"/>
                <line class="cls-2" x1="9.85" y1="19.79" x2="12.9" y2="19.79"/>
                <path class="cls-2" d="m42.83,9.16v3.88c0,.65-.26,1.27-.72,1.73l-2.05,2.05c-.38.38-.11,1.02.42,1.02h15.68c1.35,0,2.45-1.1,2.45-2.45v-6.23c0-1.35-1.1-2.45-2.45-2.45h-10.89c-1.35,0-2.45,1.1-2.45,2.45Z"/>
                <line class="cls-2" x1="50.5" y1="12.25" x2="47.45" y2="12.25"/>
                <line class="cls-2" x1="54.15" y1="12.25" x2="54.1" y2="12.25"/>
                <line class="cls-2" x1="26.86" y1="48.91" x2="26.86" y2="45.35"/>
                <line class="cls-2" x1="38.26" y1="45.35" x2="38.26" y2="48.91"/>
                <path class="cls-2" d="m23.16,23.57c1.86-1.76,4.22-3,6.84-3.5"/>
                <path class="cls-2" d="m34.83,20.02c6.47,1.08,11.41,6.71,11.41,13.49v8.56c0,1.26-1.02,2.28-2.28,2.28h-22.79c-1.26,0-2.28-1.02-2.28-2.28v-8.56c0-2.84.87-5.48,2.35-7.67"/>
                <circle class="cls-2" cx="32.56" cy="17.72" r="2.99"/>
                <path class="cls-2" d="m46.23,31.39h.93c.82,0,1.49.66,1.49,1.49v6.15c0,.82-.66,1.49-1.49,1.49h-.93"/>
                <path class="cls-2" d="m18.89,31.39h-.93c-.82,0-1.49.66-1.49,1.49v6.15c0,.82.66,1.49,1.49,1.49h.93"/>
                <g>
                  <line class="cls-2" x1="36.67" y1="27.25" x2="36.67" y2="28.69"/>
                  <line class="cls-2" x1="28.78" y1="27.25" x2="28.78" y2="28.69"/>
                </g>
                <path class="cls-2" d="m40.1,34.9c.17-.62.25-1.26.25-1.91,0-.35-.28-.64-.64-.64h-13.98c-.35,0-.64.28-.64.64,0,.64.09,1.28.25,1.91"/>
                <path class="cls-2" d="m25.35,34.9c1.05,4.07,5.21,6.52,9.28,5.46,2.68-.69,4.77-2.79,5.46-5.46"/>
                <path class="cls-2" d="m16.49,49.47h32.15c1.66,0,3,1.34,3,3v4.92H13.49v-4.92c0-1.66,1.34-3,3-3Z"/>
                <line class="cls-2" x1="25.69" y1="35.87" x2="39.33" y2="35.87"/>
                <line class="cls-2" x1="14.39" y1="54.27" x2="50.94" y2="54.27"/>
              </svg>
            </button>
          </div>
          
          <div class="chat-box">
            <div class="chat-box-header">
              Váš AI asistent
              <span class="chat-box-toggle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </span>
            </div>
            <div class="chat-box-body">
              <div class="chat-box-overlay">   
              </div>
              <div class="chat-logs">
                  <div class="spacer"></div>
              </div><!--chat-log -->
            </div>
            <div class="chat-input">      
                <form class="form-container">
                    <textarea id="chat-input" placeholder="Napište zprávu..."></textarea>
                    <button type="submit" class="chat-submit" id="chat-submit"><i class="material-icons">Odeslat</i></button>
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
        const UKAZAT_BOTA = true;
        
        var chatHistory = []; 
        var greeted = false;
    
        if (UKAZAT_BOTA) {
          $("#chat-bot-body").css("visibility", "visible");
        }
    
        $("#chat-circle").click(function() {    
            $("#chat-circle").toggle('scale');
            $(".chat-box").toggle('scale');
            if (!greeted) {
              greetUser();
              greeted = true;
            }
        });
    
        $(".chat-box-toggle").click(function() {
            $("#chat-circle").toggle('scale');
            $(".chat-box").toggle('scale');
        });
    
        $('#chat-input').on('keypress', function(e) {
          if (e.which == 13 && !e.shiftKey) {
              e.preventDefault();
              // Trigger form submit
              sendMessage();
          }
        });
    
        $('#chat-submit').on('click', function(e) {
          e.preventDefault();
          // Trigger form submit
          sendMessage();
        });
    
        function sendMessage() {
            var message = $('#chat-input').val();
            $('#chat-input').val('');
    
            // Disable the input and submit button
            setFormAvailability(true);
    
            var messageElement = $('<div class="chat-self"><div class="icon"><i class="material-icons"><b>Vy</b></i></div><div class="chat-message">' + message + '</div></div>');
            $('.chat-logs').append(messageElement);
    
            // Add typing indicator
            var typingIndicator = $('<div class="chat-friend"><div class="icon"><i class="material-icons"><b>Chatbot</b></i></div><div class="typing-indicator"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>');
            $('.chat-logs').append(typingIndicator);                
    
            scrollToTheBottom();
            $.ajax({
                url: 'https://metaexponential.pythonanywhere.com/api',
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
    
                    // Write the answer to the window
                    var messageElement = $('<div class="chat-friend"><div class="icon"><i class="material-icons"><b>Chatbot</b></i></div><div class="chat-message"></div></div>');
                    $('.chat-logs').append(messageElement);
                    typeMessage(answer, messageElement.find('.chat-message'));
    
                    // Re-enable the input and submit button
                    setFormAvailability(false);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                    // Remove typing indicator in case of error
                    typingIndicator.remove();
    
                    // Re-enable the input and submit button
                    setFormAvailability(false);
                }
            });
        }
    
        function greetUser() {
          var greeting = "Dobrý den, jsem asistenční robot Moia. Rád vám poradím s výběrem krému. Ptejte se...";
          var messageElement = $('<div class="chat-friend"><div class="icon"><i class="material-icons"><b>Chatbot</b></i></div><div class="chat-message"></div></div>');
          $('.chat-logs').append(messageElement);
          typeMessage(greeting, messageElement.find('.chat-message'));
        }
    
        function typeMessage(message, element) {
          var i = 0;
          function typeWriter() {
              if (i < message.length) {
                  element.append(message.charAt(i));
                  i++;
                  // Scroll to the bottom of the chat logs
                  scrollToTheBottom();
                  setTimeout(typeWriter, 5); // adjust the speed of typing here
              }
          }
          setTimeout(typeWriter, 500); // start typing after 1 second
        }
    
        function scrollToTheBottom() {
          $('.chat-logs').scrollTop($('.chat-logs')[0].scrollHeight);
        }
    
        function setFormAvailability(newState) {
          $('#chat-input').prop('disabled', newState);
          $('#chat-submit').prop('disabled', newState);
        }
      });
  `;

  document.body.appendChild(script);

    }
})();
