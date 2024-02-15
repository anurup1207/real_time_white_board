let joinedMembers = document.querySelector(".joined-members");
let shareLinkCont = document.querySelector(".share-link-cont");
let closeShareLinkCont = document.querySelector(".close");
let popup = document.querySelector(".popup");


let whatsapp= document.querySelector(".whatsapp");
let facebook= document.querySelector(".facebook");
let twitter= document.querySelector(".twitter");
let linkedin = document.querySelector(".linkedin");
let telegram= document.querySelector(".telegram");



const pageUrl=encodeURIComponent(location.href);
const message= encodeURI(`is inviting you to join a team-board session with him. Click the link to join the room `);

const whatsappApi = `https://wa.me/?text=${encodeURIComponent(user)} ${message}. ${pageUrl}`;
const facebookApi = `https://www.facebook.com/share.php?u=${pageUrl}`;
const twitterApi = `http://twitter.com/share?&url=${pageUrl}&text=${encodeURIComponent(user)} ${message}&hashtags=`;
const linkedinApi= `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`
const telegramApi = `https://t.me/share/url?url=${pageUrl}&text=${encodeURIComponent(user)} ${message}`;





let field = document.querySelector(".field");
let copyVal = field.querySelector(".copy-val");
copyVal.value=location.href;


let copyButton = field.querySelector(".copy-button");

copyVal.addEventListener("focus",(e)=>{
    copyVal.select();
});
copyButton.addEventListener("click",(e)=>{
    const text=copyVal.value;
    copyVal.select();
    navigator.clipboard.writeText(text);

    copyButton.innerHTML='Copied';
    setTimeout(()=>copyButton.innerHTML='Copy',1000);

});

whatsapp.addEventListener("click",(e)=>{
    window.open(url = whatsappApi, target='blank');

});
facebook.addEventListener("click",(e)=>{
    window.open(url = facebookApi, target='blank');
    
});
twitter.addEventListener("click",(e)=>{
    window.open(url = twitterApi, target='blank');
});
linkedin.addEventListener("click",(e)=>{
    window.open(url = linkedinApi, target='blank');
});

telegram.addEventListener("click",(e)=>{
    window.open(url = telegramApi, target='blank');
    
});

shareLinkCont.addEventListener("click",(e)=>{
    
    popup.style.display="block";
});

closeShareLinkCont.addEventListener("click",(e)=>{
    popup.style.display="none";

});



socket.on("updateUserList",(all_users)=>{
    

    let divToDelete = document.querySelector('.joined-members');

    while (divToDelete.firstChild) {
        divToDelete.removeChild(divToDelete.firstChild);
    }

    console.log(all_users);
    all_users = all_users.filter(user_details => user_details[0]!= user_email);
    
    for(let i=0;i<Math.min(3,all_users.length);i++){

        let user=all_users[i][1];
        var avatarDiv =document.createElement("div")
        avatarDiv.setAttribute("class","avatar");
        let data_label= user.substring(0, 2).toUpperCase();
        avatarDiv.setAttribute("data-label",`${data_label}`);
  

        const charCodeRed =avatarDiv.dataset.label.charCodeAt(0);
        const charCodeGreen =avatarDiv.dataset.label.charCodeAt(1) || charCodeRed;

        const red = Math.pow(charCodeRed,7) % 200;
        const green = Math.pow(charCodeGreen,3) % 200;
        const blue =(red + green) % 200;
        avatarDiv.style.backgroundColor =`rgb(${red},${green},${blue})`;

        
        joinedMembers.append(avatarDiv);

    }

    if(all_users.length > 3){
        var avatarDiv = document.createElement("div");
        avatarDiv.setAttribute("class","hidden-user");
        var additional_user= all_users.length - 3;
        avatarDiv.setAttribute("data-label",`+${additional_user}`);
        
        joinedMembers.append(avatarDiv);

    }
    
})