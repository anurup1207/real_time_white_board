
const sendMessageButton = document.querySelector(".send-message-button");
const audioMessageButton = document.querySelector(".audio-message-button");
const messageInput = document.getElementById('messageInp');
var messageContainer = document.querySelector('.message-cont-box');
const messageContCrossIcon = document.querySelector('.message-cont-cross-icon')

let audioMouseDown=false;
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 

const recognition = new SpeechRecognition(); 
recognition.interimResults = true; 
var content='';
recognition.onstart = function(){
    audioMessageButton.style.color="white";
    audioMessageButton.style.backgroundColor ="black";
    
}
recognition.onerror = function(){
    
}
recognition.onabort = function(){
  
}
recognition.addEventListener('result', e => { 
    const transcript = Array.from(e.results) 
        .map(result => result[0]) 
        .map(result => result.transcript) 
        .join('') 
    messageInput.value = transcript; 
    // content += transcript
    console.log(content); 
}); 

audioMessageButton.addEventListener("click",async(e)=>{
    
    e.preventDefault();
    audioMouseDown = !audioMouseDown;
    
    console.log(audioMouseDown);
    if (audioMouseDown){
        
        await recognition.start();
        recognition.addEventListener('end', recognition.start); 


    }else{
        audioMessageButton.style.color="black";
        audioMessageButton.style.backgroundColor ="white";

        // Get the microphone stream.
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Get the audio track.
        const audioTrack = stream.getAudioTracks()[0];

        // Disable the audio track.
        audioTrack.enabled = false;
        console.log( audioTrack.enabled)
        await recognition.stop();
        

    }

})


sendMessageButton.addEventListener("click",(e)=>{

    e.preventDefault();
    const message=messageInput.value;
    if (message != ""){
    socket.emit("sendMessage", {roomId , data: message});
    }
    messageInput.value = '';

})

messageContCrossIcon.addEventListener("click",(e)=>{
    
    messageSection=false;
    messageCont.style.display="none";
    
})

function recieveMessage (message){
    let recieved_cont = document.createElement("div");
    recieved_cont.setAttribute("class", "message");
    recieved_cont.innerHTML = message;
    
    messageContainer.append(recieved_cont);
    messageContainer.scrollTop=messageContainer.scrollHeight;
}

socket.on("recieveMessage", (data) => {
    recieveMessage(data);
  });