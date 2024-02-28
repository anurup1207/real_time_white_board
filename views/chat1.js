

const sendMessageButton = document.querySelector(".send-message-button");
const audioMessageButton = document.querySelector(".audio-message-button");
const messageInput = document.getElementById("messageInp");
var messageContainer = document.querySelector(".message-cont-box");
const messageContCrossIcon = document.querySelector(".message-cont-cross-icon");

let audioMouseDown = false;
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

var content ='';

const recognition = new SpeechRecognition();
recognition.interimResults = true;

recognition.onstart = function () {
  audioMessageButton.style.color = "white";
  audioMessageButton.style.backgroundColor = "black";
};
recognition.onerror = function () {};
recognition.onabort = function () {};
recognition.addEventListener("result", (e) => {

  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  messageInput.value = content +' '+ transcript;
  
  console.log(content);
});

audioMessageButton.addEventListener("click", async (e) => {
  e.preventDefault();
  audioMouseDown = !audioMouseDown;

  console.log(audioMouseDown);
  if (audioMouseDown) {
    content='';
    await recognition.start();
    recognition.addEventListener("end", startRecognitionWhenEnd);
  } else {
    audioMessageButton.style.color = "black";
    audioMessageButton.style.backgroundColor = "white";
    recognition.removeEventListener("end", startRecognitionWhenEnd);
    await recognition.stop();
  }
});

sendMessageButton.addEventListener("click", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  if (message != "") {
    socket.emit("sendMessage", { roomId, data: message, name: user });
  }
  messageInput.value = "";
});

messageContCrossIcon.addEventListener("click", (e) => {
  messageSection = false;
  messageCont.style.display = "none";
});

function startRecognitionWhenEnd() {
  content= messageInput.value;
  recognition.start();
}

async function recieveMessage(message) {
  let recieved_cont = document.createElement("span");
  const date = new Date();

  let hours=  date.getHours();
  let minutes=  date.getMinutes();
  // console.log(hours);
  // console.log(minutes);
  let sendPersonCont = document.createElement("div");
  sendPersonCont.setAttribute("class", "send-person-cont");

  let sendPerson= document.createElement("div");
  let sendPersonTime=document.createElement("div");

  sendPersonTime.setAttribute("class","send-person-time");
  sendPerson.setAttribute("class", "send-person");

  sendPersonTime.innerHTML=`${hours}:${minutes}`
  sendPerson.innerHTML=message.name;
  sendPerson.style.fontWeight="bold";

  recieved_cont.setAttribute("class", "message");
  recieved_cont.innerHTML = message.data;
  
  sendPersonCont.append(sendPerson);
  sendPersonCont.append(sendPersonTime);

  messageContainer.append(sendPersonCont);
  messageContainer.append(recieved_cont);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

socket.on("recieveMessage", (data) => {
  recieveMessage(data);
});
