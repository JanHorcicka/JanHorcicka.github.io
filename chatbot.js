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
        html, body {
            background: #efefef;      
            height:100%;  
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
            padding: 28px;
            cursor: pointer;
            box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.6), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2em;
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
            box-shadow: 0px 5px 35px 9px #ccc;
            bottom: 0px; /* Stick the chat box to the bottom of the page */
          }
          .chat-box-toggle {
            float:right;
            margin-right:15px;
            cursor:pointer;
          }
          .chat-box-header {
            background: #5A5EB9;
            height:70px;
            border-top-left-radius:5px;
            border-top-right-radius:5px; 
            color:white;
            text-align:left;
            font-size:20px;
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
            background: #5A5EB9;
            width:20%; /* change this */
          }
          .chat-logs {
            padding:15px; 
            height:370px;
            word-wrap: break-word;
            user-select: none;
            overflow-y: scroll;
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
        
        

        `;
        var style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);

        // Inject HTML
        var html = `
        
  <div id="body"> 
    
  <div id="chat-circle" class="btn btn-raised">
    <div id="chat-overlay"></div>
      <button id="chat-circle" class="btn btn-raised">  
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" x="0px" y="0px"><g><path d="M12.19141,30.62549a.49986.49986,0,0,1-.35352-.14649L8.33105,26.97217H7.05371a3.18907,3.18907,0,0,1-3.18555-3.18555v-.95508H2.45508A1.49789,1.49789,0,0,1,.959,21.335V15.05908A1.498,1.498,0,0,1,2.45508,13.562H3.86816v-.95508A3.18906,3.18906,0,0,1,7.05371,9.42139H8.98926a2.16658,2.16658,0,0,1,2.15821-2.26025l4.35253,0V4.52148a1.55081,1.55081,0,0,1-1.11816-1.53711,1.6189,1.6189,0,0,1,3.23632.00049A1.55651,1.55651,0,0,1,16.5,4.52148V7.16113h4.35254a2.16659,2.16659,0,0,1,2.1582,2.26026h1.93555a3.18906,3.18906,0,0,1,3.18555,3.18554V13.562h1.41308a1.498,1.498,0,0,1,1.4961,1.49707V21.335a1.49789,1.49789,0,0,1-1.4961,1.49658H28.13184v.95508a3.18907,3.18907,0,0,1-3.18555,3.18555H12.69141v3.15332A.50255.50255,0,0,1,12.19141,30.62549Zm-5.1377-20.2041a2.18807,2.18807,0,0,0-2.18555,2.18554V23.78662a2.18807,2.18807,0,0,0,2.18555,2.18555c.39925.03868,1.67912-.1165,1.83789.14645l2.79981,2.79984V26.47217a.49971.49971,0,0,1,.5-.5H24.94629a2.18807,2.18807,0,0,0,2.18555-2.18555V12.60693a2.18807,2.18807,0,0,0-2.18555-2.18554ZM28.13184,21.83154h1.41308a.4969.4969,0,0,0,.4961-.49658V15.05908a.49733.49733,0,0,0-.4961-.49707H28.13184ZM2.45508,14.562a.49733.49733,0,0,0-.4961.49707V21.335a.4969.4969,0,0,0,.4961.49658H3.86816V14.562ZM9.98926,9.42139H22.01074a1.16934,1.16934,0,0,0-1.15821-1.26025l-9.70507,0A1.16933,1.16933,0,0,0,9.98926,9.42139Zm5.39258-6.42871a.61819.61819,0,0,0,1.23633-.00779A.61819.61819,0,0,0,15.38184,2.99268Zm9.39062,21.814H7.22754a1.192,1.192,0,0,1-1.19043-1.19043V12.77783A1.192,1.192,0,0,1,7.22754,11.5874H24.77246a1.192,1.192,0,0,1,1.19043,1.19043V23.61621A1.192,1.192,0,0,1,24.77246,24.80664ZM7.22754,12.5874a.19036.19036,0,0,0-.19043.19043V23.61621a.19036.19036,0,0,0,.19043.19043H24.77246a.19036.19036,0,0,0,.19043-.19043V12.77783a.19036.19036,0,0,0-.19043-.19043Zm8.79394,9.26221A7.37252,7.37252,0,0,1,11.50781,20.103a.49986.49986,0,1,1,.61133-.791c2.63867,2.042,5.17578,2.042,7.75781.00293a.5.5,0,1,1,.61914.78516A7.20485,7.20485,0,0,1,16.02148,21.84961Zm4.165-4.51758A1.359,1.359,0,0,1,18.79,15.93945a1.39762,1.39762,0,0,1,2.79394,0A1.36161,1.36161,0,0,1,20.18652,17.332ZM19.79,15.94775a.397.397,0,0,0,.79395-.00828A.397.397,0,0,0,19.79,15.94775ZM11.81348,17.332A1.35916,1.35916,0,0,1,10.416,15.93945a1.39763,1.39763,0,0,1,2.79394,0A1.3614,1.3614,0,0,1,11.81348,17.332ZM11.416,15.94775a.397.397,0,0,0,.79394-.00828A.397.397,0,0,0,11.416,15.94775Z"/></g></svg>
      </button>
    </div>
    
    <div class="chat-box">
      <div class="chat-box-header">
        Váš nákupní asistent
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
    var chatHistory = []; 
    var greeted = false;         
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

        // Update chat history with the new message from the user
        chatHistory.push({ 'HumanMessage': message });

        var messageElement = $('<div class="chat-self"><div class="icon"><i class="material-icons"><b>Vy</b></i></div><div class="chat-message">' + message + '</div></div>');
        $('.chat-logs').append(messageElement);
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
                var urlRegex = "/(https?:\\/\\/[^\\s]+)/g";
                var answerWithLinks = data.answer.replace(new RegExp(urlRegex), '<a href="$$1" target="_blank">$$1</a>');
                chatHistory.push({ 'AIMessage': data.answer });
                var messageElement = $('<div class="chat-friend"><div class="icon"><i class="material-icons"><b>Chatbot</b></i></div><div class="chat-message"></div></div>');
                $('.chat-logs').append(messageElement);
                typeMessage(answerWithLinks, messageElement.find('.chat-message'));

                // Re-enable the input and submit button
                setFormAvailability(false);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
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
  `;

  document.body.appendChild(script);

    }
})();
