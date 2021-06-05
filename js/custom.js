

// // function changeLogappr(){
   
// //     var e = document.getElementById("cat_admin");
// //     var val = e.options[e.selectedIndex].text;
    
// //     if(!(val==="Admin")){
// //         // alert(val);
// //         document.getElementById("admin_name").style.display = 'none';
// //         document.getElementById("user_name").style.display = 'block';
// //     }
// //     else{
// //         document.getElementById("admin_name").style.display = 'block';
// //         document.getElementById("user_name").style.display = 'none';
// //     }

// // }

 
 



// // datasets : [
// //   {
// //       fillColor : "rgba(172,194,132,0.4)",
// //       strokeColor : "#ACC26D",
     
// //       data : [203000,15600,99000,25100,30500,24700]
// //   }





// function login(){
    
//     // var user = new Parse.User();
//     // user.save({
//     // username:"AnihsEmma",
//     // email: "oriyominov2@gmail.com",
//     // password: document.getElementById("password").value
//     // }).then(function(response) {
//     // alert('New object create with success! ObjectId: ' + response.id + ', '+ user.get('username'));
//     // }).catch(function(error) {
//     // alert('Error: ' + error.message);
//     // });
//     // window("candidatem.html");
//     window.location.href = "candidatem.html";
//     alert("left")
//     // asyncReadCall();
//     // read();
//     // console.log("hi");
   
// }




// function read() {
//     // alert("hi");
    
//     //  alert("hi");
// }
// async function asyncReadCall() {
//     console.log('calling');
   
    
//     // expected output: 'resolved'
//     const query = new Parse.Query(UsersEntry);
//     query.equalTo("name", textName);
    
//     const results = await query.find();
//     for (let i = 0; i < results.length; i++) {
//         var object = results[i];
//         alert(object.id + ' - ' + object.get('playerName'));
//       }
//     console.log(results);
//   }