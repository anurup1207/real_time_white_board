const form = document.getElementById('message-cont-send-cont');
const messageInput = document.getElementById('messageInp');
var messageContainer = document.querySelector('.message-cont-box');



form.addEventListener("submit",(e)=>{

    e.preventDefault();
    const message=messageInput.value;
    console.log(message);
    if (message != ""){
    socket.emit("sendMessage", {roomId , data: message});
    }
    messageInput.value = '';

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