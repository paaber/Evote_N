var UName = Parse.Object.extend("UName");
document.addEventListener('DOMContentLoaded', function() {

        CheckForCurrentUser();
});

function logIn() {
    // Create a new instance of the user class
    //  CheckForCurrentUser();

    var userName = document.getElementById("user_name").value;
    var passWord = document.getElementById("password").value;
    console.log(userName + passWord);
    
    query = new Parse.Query(UName);
    query.equalTo("useName", userName);
    query.first().then(function(results){
        if(results){
            if(passWord === results.get("password")){
                sessionStorage.setItem("userToken",results.get("useName"));
                sessionStorage.setItem("userNameB",results.get("name"));
                    window.location.href = "Voters.html";
                }
              
        } else {
            alert("invalid Username or Password");
        }
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);       
    });
//     Parse.User.logIn(userName.trim(), passWord.trim()).then(function(user) {
//             console.log('User Login successful with name: ' + user.get("username") + ' and email: ' + user.get("username").substring("Admin") );
//             console.log(user.get("session_token"));
//             if(Parse.User.current() != null){
//                 console.log(Parse.User.current());
//                 localStorage.setItem("userToken",Parse.User.current());
//             }
           
//             if(user.get("username") === "Admin"){

//                 window.location.href = "candidatem.html";
//                 console.log("yeah");
               
//                 // Parse.User.become("session-token-here").then(function (user) {
//                 //     // The current user is now set to user.
//                 //   }, function (error) {
//                 //     // The token could not be validated.
//                 //   });
//             }
//             else{
//                  window.location.href = "Voters.html";
//             }
// //            window.location.href = "Voters.html";
//     }).catch(function(error){
//         console.log("Error: " + error.code + " " + error.message);

//         if(error.code === 100){
//          alert("Please check that you've got internet connection");
//         }
//         else if(error.code === 101){
//         alert(error.message);
//         }
//     });
}

function CheckForCurrentUser(){
   console.log("this is the token" + sessionStorage.getItem("userToken"));
    if(sessionStorage.getItem("userToken") != null){
         window.location.href = "Voters.html";
    }
    else{
    return 0;
    }
}


