let joinedMembers = document.querySelector(".joined-members");
let shareLinkCont = document.querySelector(".share-link-cont");

let popup = document.querySelector(".popup");
let closeShareLinkCont = popup.querySelector(".close");


let profileSection = document.querySelector(".profile-section");


let whatsapp= document.querySelector(".whatsapp");
let facebook= document.querySelector(".facebook");
let twitter= document.querySelector(".twitter");
let linkedin = document.querySelector(".linkedin");
let telegram= document.querySelector(".telegram");


// start share through varrious social media handles
const pageUrl=encodeURIComponent(location.href);
const message= encodeURI(`is inviting you to join a team-board session with him. Click the link to join the room `);

const whatsappApi = `https://wa.me/?text=${encodeURIComponent(user)} ${message}. ${pageUrl}`;
const facebookApi = `https://www.facebook.com/share.php?u=${pageUrl}`;
const twitterApi = `http://twitter.com/share?&url=${pageUrl}&text=${encodeURIComponent(user)} ${message}&hashtags=`;
const linkedinApi= `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`
const telegramApi = `https://t.me/share/url?url=${pageUrl}&text=${encodeURIComponent(user)} ${message}`;


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
// end share through varrious social media handles

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
avatarDiv.style.cursor="pointer";
avatarDiv.style.border="3px solid rgba(152, 41, 67, 0.5)";
avatarDiv.style.boxShadow=`0 0 2px 2px rgb(${red-10},${green-10},${blue-10})`;

let headingRightCont = document.querySelector(".heading-right-cont");
headingRightCont.append(avatarDiv);

var avatarDiv2 =document.createElement("div")
avatarDiv2.setAttribute("class","avatar");
let data_label2= user.substring(0, 2).toUpperCase();
avatarDiv2.setAttribute("data-label",`${data_label2}`);
avatarDiv2.style.backgroundColor =`rgb(${red},${green},${blue})`;
avatarDiv2.style.height="4rem";
avatarDiv2.style.width="4rem";



let profileSectionCont=document.querySelector(".profile-section-cont");
profileSectionCont.insertBefore(avatarDiv2, profileSectionCont.firstChild);

profileSectionCont.querySelector('span').innerHTML=user;
let pb=profileSectionCont.querySelector('p');
pb.innerHTML=user_email;
pb.style.fontSize="10px";

// start profileSection eventListner

let closeProfileSection= profileSection.querySelector(".close");
closeProfileSection.addEventListener("click",()=>{
    document.querySelector(".profile-section").style.display="none";
});

let profileButton=headingRightCont.querySelector(".avatar");
profileButton.addEventListener("click",()=>{
    document.querySelector(".profile-section").style.display="block";

});

// end profileSection eventListner


// start copy link button listener

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
    // return true;

});
// end copy link button listener

let logout=document.getElementById("log-out");
logout.addEventListener("click",()=>{
    window.location.href="/user/logout";


});

const createTodo = async (todo) => {
    let options = {
            method: "POST",
            headers: {
                    "Content-type": "application/json"
            },
            body: JSON.stringify(todo),
    }
    let p = await fetch('/user/switchaccount', options)
    let response = await p.json()
    return response
}

let switchAccount = document.getElementById("switch-button");
switchAccount.addEventListener("click",async()=>{
    console.log(location.href);
    const pageURL=location.href;
    const index = pageURL.indexOf("room/");
    const result = index !== -1 ? pageURL.substring(index + 5) : null;
    console.log(result);
    const postData = {
        id: result,
      };
     let id = await createTodo(postData);
    //  console.log(id);
    //   const result= response.json();
    //   console.log(response.id);
      window.location.href=`${id.id}`;


});



// start shareLinkCont addEventListener
shareLinkCont.addEventListener("click",(e)=>{
    popup.style.display="block";
});

closeShareLinkCont.addEventListener("click",(e)=>{
    popup.style.display="none";

});
// end shareLinkCont addEventListener

// let joinedMemberNameSection= document.querySelector(".joined-member-name-section");

function makeAvtar(user){
    
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
    return avatarDiv;
}
// let avatarPortion= document.querySelector(".avatar-portion");
let joinedMemberSection= document.querySelector(".joined-member-section");

function AddUserCellJoinedMemberSection(all_users){
    let divToDelete = document.querySelector('.joined-member-name-section');

    while (divToDelete.firstChild) {
        divToDelete.removeChild(divToDelete.firstChild);
    }
    let numberOfMembersJoined=joinedMemberSection.querySelector("span");
    numberOfMembersJoined.innerHTML=`${all_users.length} people`;
    all_users.forEach(user => {
        
        let userCell= document.createElement("div");
        userCell.setAttribute("class","user-cell");
        
        let avatarPortion= document.createElement("div");
        avatarPortion.setAttribute("class","avatar-portion");

        let namePortion= document.createElement("div");
        namePortion.setAttribute("class","name-portion");

        var avatarDiv=makeAvtar(user[1]);
        avatarPortion.append(avatarDiv);

        namePortion.innerHTML=user[1];

        let iconPortion=document.createElement("i")
        iconPortion.setAttribute("class","icon-portion fa-solid fa-circle");
        

        userCell.append(avatarPortion);
        userCell.append(namePortion);
        userCell.appendChild(iconPortion);
        
        divToDelete.append(userCell);
        
    });

}

socket.on("updateUserList",(all_users)=>{
    let all_joined_users=all_users;
    AddUserCellJoinedMemberSection(all_joined_users);
    let divToDelete = document.querySelector('.joined-members');

    while (divToDelete.firstChild) {
        divToDelete.removeChild(divToDelete.firstChild);
    }

    console.log(all_users);
    all_users = all_users.filter(user_details => user_details[0]!= user_email);
    
    for(let i=0;i<Math.min(3,all_users.length);i++){
        let user=all_users[i][1];
        var avatarDiv =makeAvtar(user);
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

let joinedMemberSectionclose=joinedMemberSection.querySelector(".close");
joinedMembers.addEventListener("click",()=>{
    
    joinedMemberSection.style.display="flex";
})
joinedMemberSectionclose.addEventListener("click",()=>{
    joinedMemberSection.style.display="none";
})
