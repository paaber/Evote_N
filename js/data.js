//"use strict";
var Categories = Parse.Object.extend("Categories");

var candidateProfile = Parse.Object.extend("candidateProfile");
var categoriesList = [];
var candidateList = [];
var candidateListLocal = [];
var indexV = 1;
var elemsi = document.querySelectorAll('.collapsible');

document.addEventListener('DOMContentLoaded', function() {


    // if(Current_User() === null){
    //     window.location.href = "index.html";
    // }
    readCategories();
    revealCandidates();
 
   
  });


  
function createCategories(category_title) {
   
    category = new Categories();
    category.set("category_name", category_title);
    
    category.save().then(function(catg){
         console.log('category created successful with name: ' + catg.get("category_name") + ' and age: ' + catg.get("agePet"));
         categoriesList.push(category_title); 
        $('.collapsible').collapsible('close', 0);
        runningsWl(category_title);
        $('.collapsible').collapsible('open', 0);
        document.getElementById("categorytitle").value = "";
        
    
    }).catch(function(error){
         console.log('Error: ' + error.message);
        //  alert("Please check that theres internet connection before proceeding ")
    });
}
function closeforaltcollbas(){
    $('.collapsible').collapsible('close', 0);
}
function readCategories() {
    query = new Parse.Query(Categories);

    // query.equalTo("category_name", 'President');
    query.find().then(function(results){
        if(results){
            for (let i = 0; i < results.length; i++) {
                var object = results[i];
                categoriesList.push(object.get("category_name")); 
              }
            
              categoriesList.forEach(function(item, index, array) {
                runningsWl(item);
              });
              
        } else {
           console.log("Nothing found, please try again");
        }
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);       
    });
}

function getDropdownVal(dropdownListID){
    var dropDownVal = document.getElementById(dropdownListID).firstChild.innerHTML;
    document.getElementById('candidate').value = dropDownVal;
    $('.collapsible').collapsible('close', 0);
}

function deleteCategoryfromList(dropdownListID){
    var dropDownValue = document.getElementById(dropdownListID).previousSibling.innerHTML;
    categoriesList.pop(dropDownValue);
    // categoriesList.forEach(function(item, index, array) {
    //     runningsWl(item, index, array);
    //   });  
    readCategoriesthenDelete(dropDownValue,dropdownListID);
}

function deleteCandidatefromList(dropdownListID){
    var dropDownValue = document.getElementById(dropdownListID).previousSibling.innerHTML;

    // categoriesList.forEach(function(item, index, array) {
    //     runningsWl(item, index, array);
    //   });  
    readCandidatethenDelete(dropDownValue,dropdownListID);
}

function deleteCategory(foundcat) {
    foundcat.destroy().then(function(response) {
      console.log('val '+ foundcat.get("name") + ' erased successfully');
    }).catch(function(response, error) {
      console.log('Error: '+ error.message);
    });
}
function deleteCandidate(foundcat) {
    foundcat.destroy().then(function(response) {
      console.log('val '+ foundcat.get("name") + ' erased successfully');
    }).catch(function(response, error) {
      console.log('Error: '+ error.message);
    });
}
function deleteCatParent(objToremove,parentId)
{
var elemtoremove = document.getElementById(objToremove).parentElement;
console.log(elemtoremove);
document.getElementById(parentId).removeChild(elemtoremove);
}

function readCategoriesthenDelete(valToDelete,dropdownListID) {
    query = new Parse.Query(Categories);
    query.equalTo("category_name", valToDelete);
    query.first().then(function(results){
        if(results){
            console.log("readandabouuttodelete");
            deleteCategory(results);  
            deleteCatParent(dropdownListID,"categoryCollabs");
            // console.log(dropdownListID.slice(0,-1) + " " + dropdownListID);
            deleteCatParent(dropdownListID.slice(0,-1),"categoryCollabsdp");
            
        } else {
           console.log("Nothing found, please try again");
        }
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);       
    });
}
function readCandidatethenDelete(valToDelete,dropdownListID) {
    query = new Parse.Query(candidateProfile);
    query.equalTo("candidate_name", valToDelete);
    query.first().then(function(results){
        if(results){        
            deleteCandidate(results);  
            deleteCatParent(dropdownListID,"categoryCollabsCandDel");
            deleteCatParent(dropdownListID.slice(0,-1) + "TABLE","tableBody");
            // console.log(dropdownListID.slice(0,-1) + " " + dropdownListID);
            
        } else {
           console.log("Nothing found, please try again");
        }
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);       
    });
}
function runningsWl(item){

    var elem = document.createElement('div');
    var elem_cat = document.createElement('div');
    var elemS = document.createElement('span');
    var elemS_cat = document.createElement('span');
    var iconL = document.createElement('i');
    
    iconL.className = "material-icons right red-text accent-4";
    iconL.innerHTML = "delete";
    elemS.innerHTML = item;
    elemS_cat.innerHTML = item;

    elem_cat.id = item;
    iconL.id = item + "S";
    
    elem.className = "collapsible-body";
    elem_cat.className = "collapsible-body";
    elem_cat.setAttribute("onClick","getDropdownVal(" + "'" + item +  "'"  + ")");
    iconL.setAttribute("onClick","deleteCategoryfromList(" + "'" + item + "S" +  "'"  + ")");
    elem_cat.style.cursor = "pointer";
    iconL.style.cursor = "pointer";
   
    elem.appendChild(elemS);
    elem_cat.appendChild(elemS_cat);
    elem.appendChild(iconL);
    document.getElementById("categoryCollabs").appendChild(elem);
    document.getElementById("categoryCollabsdp").appendChild(elem_cat);
    

}
function createCandidateCaller(){
   canididate_Names = document.getElementById("first_name").value + " " + document.getElementById("last_name").value ;
   canididate_Position = document.getElementById("candidate").value;
   Candidate_man = document.getElementById("manifestoo").value;
   createCandidate(canididate_Names,canididate_Position,Candidate_man);
   document.getElementById("first_name").value = "";
   document.getElementById("candidate").value = "";
   document.getElementById("last_name").value = "";
  

}
function createCandidate(Candidate_name,Candidate_position) {
    var parseFile = generateProfImage();
    console.log(parseFile);
    var votes = 0;
    candidateProfiles = new candidateProfile();
    candidateProfiles.set("candidate_name", Candidate_name);
    candidateProfiles.set("Candidate_position", Candidate_position);
    candidateProfiles.set("Candidate_profileImage", parseFile);
    candidateProfiles.set("Candidate_vote", votes);
    
    candidateProfiles.save().then(function(cang){
         console.log('category created successful with name: ' + cang.get("candidate_name") + ' and age: ' + cang.get("Candidate_position"));
        //  document.getElementById("candiadateImage").value = "";
         candidateListLocal.push([Candidate_name,Candidate_position,votes,votes]);
         if(candidateListLocal.length > 0){
            document.getElementById("candTable").style.display = "block";
        }
         creatingCandDOM([Candidate_name,Candidate_position,votes,votes]);
         populateCandRemove(Candidate_name);


    }).catch(function(error){
         console.log('Error: ' + error.message);
         alert("Please check that theres internet connection before proceeding ")
    });
}
 function generateProfImage(){
    var fileUploadControl = $("#profilePhotoFileUpload")[0];
    if (fileUploadControl.files.length > 0) {
    var file = fileUploadControl.files[0];
    var img_name = document.getElementById("candiadateImage").value;
    console.log(img_name)
    parseFile = new Parse.File(img_name, file);
    return parseFile;
    }
    return 0;
 }

 function revealCandidates(){

    query = new Parse.Query(candidateProfile);
    // query.equalTo("name", textName);
    query.find().then(function(results){
        if(results){
            for (let i = 0; i < results.length; i++) {
                var object = results[i];
                candidateList.push([object.get("candidate_name"), object.get("Candidate_position"), object.get("Candidate_profileImage"), object.get("Candidate_vote")]);
                console.log(candidateList) ;
//                $("#profileImg")[0].src = object.get("Candidate_profileImage").url();
                if(candidateList.length > 0){
                    document.getElementById("candTable").style.display = "block";
                }
              }
              candidateList.forEach(function(item, index, array) {
                creatingCandDOM(item);
                populateCandRemove(item[0]);
              });
              
        } else {
           console.log("Nothing found, please try again");
        }
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);       
    });
 }

function creatingCandDOM(item){
    var tableRow = document.createElement("tr");
    var tableData_candName = document.createElement("td");
    var tableData_candPos = document.createElement("td");
    var tableData_candVots = document.createElement("td");
    tableData_candName.id = item[0] + "TABLE";
    tableData_candName.innerHTML = item[0];
    tableData_candPos.innerHTML = item[1];
    tableData_candVots.innerHTML = item[3];
    tableRow.appendChild(tableData_candName);
    tableRow.appendChild(tableData_candPos);
    tableRow.appendChild(tableData_candVots);
    document.getElementById("tableBody").appendChild(tableRow);
}

function populateCandRemove(item){
    var elem = document.createElement('div');
    var elemS = document.createElement('span');
    var iconL = document.createElement('i');
    iconL.className = "material-icons right red-text accent-4";
    iconL.innerHTML = "delete";
    elemS.innerHTML = item;
    iconL.id = item + "S";
    
    elem.className = "collapsible-body";
    // elemS_cat.setAttribute("onClick","getDropdownVal(" + "'" + item +  "'"  + ")");
    iconL.setAttribute("onClick","deleteCandidatefromList(" + "'" + item + "S" +  "'"  + ")");
    iconL.style.cursor = "pointer";
   
    elem.appendChild(elemS);
    elem.appendChild(iconL);
    document.getElementById("categoryCollabsCandDel").appendChild(elem);
}         
function logOut(){
    sessionStorage.removeItem("userToken");
    window.location.href = "index.html";
  
}
function Current_User(){
  var currentUser = localStorage.getItem("userToken");
  return currentUser;
}

function createCandidate(Candidate_name,Candidate_position,Candidate_man) {
    var parseFile = generateProfImage();
    console.log(parseFile);
    var votes = 0;
    candidateProfiles = new candidateProfile();
    candidateProfiles.set("candidate_name", Candidate_name);
    candidateProfiles.set("Candidate_position", Candidate_position);
    candidateProfiles.set("Candidate_profileImage", parseFile);
    candidateProfiles.set("Candidate_vote", votes);
    candidateProfiles.set("Candidate_manifesto",Candidate_man)
    
    candidateProfiles.save().then(function(cang){
         console.log('category created successful with name: ' + cang.get("candidate_name") + ' and age: ' + cang.get("Candidate_position"));
        //  document.getElementById("candiadateImage").value = "";
         candidateListLocal.push([Candidate_name,Candidate_position,votes,votes]);
         if(candidateListLocal.length > 0){
            document.getElementById("candTable").style.display = "block";
        }
         creatingCandDOM([Candidate_name,Candidate_position,votes,votes]);
         populateCandRemove(Candidate_name);


    }).catch(function(error){
         console.log('Error: ' + error.message);
         alert("Please check that theres internet connection before proceeding ")
    });
}
