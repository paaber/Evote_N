
  
// Reading data in utf-8 format 
// which is a type of character set. 
// Instead of 'utf-8' it can be  
// other character set also like 'ascii' 

var UserDict = {};
var UName = Parse.Object.extend("UName");
var User = Parse.Object.extend("User");

function openfile(){
    var file  = document.getElementById('users').files[0]; 
   
   
    var reader = new FileReader();
    reader.onload = function(event) {
            var contents = event.target.result;
//            logIn();
            // console.log("File contents: " + contents.split("\n"));
             contents.split("\n").forEach(function(item, index, array) {
                createUser(item.split(",")[0],`${item.split(",")[3] + " " + item.split(",")[4] +
                 " " + item.split(",")[5] }`,item.split(",")[item.split(",").length - 1]);
                // console.log(item.split(",")[0],`${item.split(",")[3] + " " + item.split(",")[4] +
                // " " + item.split(",")[5] }`,item.split(",")[item.split(",").length - 1]);
               
               });
            
        };

        reader.onerror = function(event) {
            console.error("File could not be read! Code " + event.target.error.code);
        };

    reader.readAsText(file);
    
}

function signUp() {
    // Create a new instance of the user class
   var password_val = Math.random().toString(36).substr(2, 8);
   createUser("Shina",password_val,"Paaber");
    // console.log(password_val);
    // var user = new Parse.User();
    // user.set("username", "97171112IF");
    // user.set("password","bgqijtux");
  
    // user.signUp().then(function(userl) {
    //     if(userl){
    //         // console.log(user_name + "\t" + matric_no + "\t" + password_val+ "\t" + phone_no+ "\t" + email);
    //         // createUser(user_name,userl);
    //         console.log("suscess");
    //     }
    //     // console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("password"));
    // }).catch(function(error){
    //     console.log("Error: " + error.code + " " + error.message);
    // });
}

function createUser(name,uname,email) {
    var password_val = Math.random().toString(36).substr(2, 8);
    // console.log(name+uname+password_val+email);
    category = new UName();
    category.set("useName", name);
    category.set("password", password_val);
    category.set('name',uname);

    
    category.save().then(function(catg){
      if(catg){
           console.log(name.trim() + ","+ uname.trim() + "," + password_val.trim() +  "," + email.trim());
      }
    }).catch(function(error){
         console.log('Error: ' + error.message);
         alert("Please check that theres internet connection before proceeding ")
    });
}