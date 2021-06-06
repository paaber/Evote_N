{/* <li id="categoryCollabsCandDel">
<div  class="collapsible-header" >Choose Categories</div>
  <!-- <div class="collapsible-body"><span>Lorem ipsum dolor</span><i class="material-icons right">delete</i></div> -->
</li> */}

var client = new Parse.LiveQueryClient({
  applicationId: 'St580xAp88tR8RPN71t6Z2H8lT7TbTsmQLgvlvJD',
  serverURL: 'wss://' + 'naccosevote.b4a.app', // Example: 'wss://livequerytutorial.back4app.io'
  javascriptKey: '231lG464fmk3ONG4i7txQmL88ZXwXar4m958QgzI',
  masterKey: 'quoqD55rkmlbp5deZNbVbNS31GNe8hKaOwTBTy5i'
});
client.open();
var query = new Parse.Query('VotingBool');
query.ascending('createdAt').limit(5);
var subscription = client.subscribe(query);
subscription.on('open', () => {
    console.log('subscription opened');
   });

subscription.on('update', candidate => {
    VotingPrivil();
});
var candidateListVoters = [];
var categoriesListVoters = [];
let totl = null
var candidateProfile = Parse.Object.extend("candidateProfile");
var VotedCategories = Parse.Object.extend("VotedCategories");
var Categories = Parse.Object.extend("Categories");
var VotedCategories = Parse.Object.extend("VotedCategories");
var VotingBool = Parse.Object.extend("VotingBool");
var votedCategory = [];
var votedCategorycanRes = [];
var votedCategoryDummy = [];
var catHolderDict = {};

var votingActive = null;

window.addEventListener('DOMContentLoaded', function() {

    // $('.modal').modal();
    // $('#preloaderModal').modal('open',0);
    // $(".MyModal").openModal();
    // $('.modal').modal('open');
    // var elems = document.querySelectorAll('.modal');
    // var instances = M.Modal.init(elems);

    // var singleModalElem = document.querySelector('#preloaderModal');
    // var instance = M.Modal.getInstance(singleModalElem);
    // instance.open();
    modal = document.getElementById("myModal");

    modal.style.display = "block";



  if(sessionStorage.getItem("userToken") === null){
    alert("session timeout");
    window.location.href = "index.html";
  //   }
    VotingPrivil();
    postLoginArrangement();
    // postLoginArrangement();
    // postLogin();
    console.log("this is the token" + sessionStorage.getItem("userToken"));

});
function readCategoriesVoters() {

    query = new Parse.Query(Categories);

    // query.equalTo("category_name", 'President');
    query.find().then(function(results){
        if(results){
            for (let i = 0; i < results.length; i++) {
                var object = results[i];
                categoriesListVoters.push(object.get("category_name"));
              }

              //filterout
              console.log(votedCategorycanRes);

              if(votedCategorycanRes.length > 0){
                categoriesListVoters = categoriesListVoters.filter(f => !votedCategorycanRes.includes(f));
              }
              console.log(categoriesListVoters + "values");
              categoriesListVoters.forEach(function(item, index, array) {
                populateVotersCand(item);
              });
              revealCandidatesToVoters();

        } else {
           console.log("Nothing found, please try again");
        }
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);
    });
}

function revealCandidatesToVoters(){

    query = new Parse.Query(candidateProfile);
    // query.equalTo("name", textName);
    query.find().then(function(results){
        if(results){
            modal.style.display = "none";
            for (let i = 0; i < results.length; i++) {
                var object = results[i];
                candidateListVoters.push([object.get("candidate_name"), object.get("Candidate_position"), object.get("Candidate_profileImage"), object.get("Candidate_vote"),object.get("Candidate_manifesto")]);
                catHolderDict[object.get("candidate_name")]= object.get("Candidate_position");
                // $("#profileImg")[0].src = object.get("Candidate_profileImage").url();

              }
              candidateListVoters.forEach(function(item, index, array) {
                // creatingCandDOM(item);

                populateVotersCandActuals(item);
              });

        } else {
           console.log("Nothing found, please try again");
          //  modal.style.display = "none";
        }
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);
    });
 }

 function populateVotersCand(item){
    var elemlist = document.createElement('li');
    var elemheaddiv = document.createElement('div');
    elemlist.id = item + "voters";
    elemheaddiv.className = "collapsible-header";
    elemheaddiv.innerHTML = item;
    elemlist.appendChild(elemheaddiv);
    document.getElementById("candidateVoters").appendChild(elemlist);
}

function populateVotersCandActuals(item){

  // <div class="card">
  //   <div class="card-image waves-effect waves-block waves-light">
  //     <img class="activator" src="images/office.jpg">
  //   </div>
  //   <div class="card-content">
  //     <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
  //     <p><a href="#">This is a link</a></p>
  //   </div>
  //   <div class="card-reveal">
  //     <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
  //     <p>Here is some more information about this product that is only revealed once clicked on.</p>
  //   </div>
  // </div>
    var elemcandidatediv = document.createElement('div');
    var elemcandidateImgdiv = document.createElement('div');
    var elemcandidateContntdiv = document.createElement('div');
    var elemcandidateRevdiv = document.createElement('div');
    var elemcontspan = document.createElement('span');
    var elemrevspan = document.createElement('span');
    var iconL = document.createElement('i');
    var iconCls = document.createElement('i');
    var iconMr = document.createElement('i');
    var hyperef = document.createElement('a');
    var candimg = document.createElement('img');
    var hintText = document.createElement('p');
    var manifest = document.createElement('p');


    hyperef.className = "btn btn-medium waves-effect waves-light z-depth-3";
    // hyperef.innerHTML = "VOTE";

    candimg.className = "activator";
    iconL.className = "material-icons right black-text";
    iconCls.className = "material-icons right black-text";
    iconCls.innerHTML = "close";
    iconMr.className = "material-icons right waves-effect tooltipped black-text";
    iconMr.innerHTML = "more_vert";
    iconL.innerHTML = "check";
    elemcandidatediv.className = "col s12 m6 l6 card medium sticky-action collapsible-body";
    elemcandidateImgdiv.className = "card-image waves-effect waves-block waves-light";
    elemcandidateContntdiv.className = "card-action";
    elemcandidateRevdiv.className = "card-reveal";
    elemcontspan.className = "card-title activator";
    elemrevspan.className = "card-title grey-text text-darken-4";
    elemrevspan.innerHTML = item[0] + "'s  Manifesto";
    candimg.className = "responsive-img";
    candimg.src = item[2].url();
    elemcontspan.innerHTML = item[0];
    hyperef.id = item[1] + "t";
    hyperef.style.color = "black";
    hyperef.innerHTML = "VOTE";
    manifest.innerHTML = item[4]
    hintText.style.fontSize = "14px";
    hintText.style.fontStyle = "bold";
    hintText.innerHTML = "Click the animated icon to view my Manifesto";
    iconMr.id = "popTipIcn";
    // elem.className = "collapsible-body";
    // elemS_cat.setAttribute("onClick","getDropdownVal(" + "'" + item +  "'"  + ")");
    hyperef.setAttribute("onClick","readThenUpdate(" + "'" + item[0]  +  "'"  + ")");
    elemrevspan.appendChild(iconCls);
    elemcontspan.appendChild(iconMr);
    elemcontspan.appendChild(hintText);
    iconL.style.cursor = "pointer";
    hyperef.appendChild(iconL);
    elemcandidateContntdiv.appendChild(elemcontspan);
    // elemcandidateContntdiv.appendChild(hintText);
    elemcandidateContntdiv.appendChild(hyperef);

    elemcandidateRevdiv.appendChild(elemrevspan);
    elemcandidateRevdiv.appendChild(manifest);


    elemcandidateImgdiv.appendChild(candimg);

    elemcandidatediv.appendChild(elemcandidateImgdiv);
    elemcandidatediv.appendChild(elemcandidateContntdiv);
    elemcandidatediv.appendChild(elemcandidateRevdiv);
    if(document.getElementById(item[1] + "voters") != null){
      document.getElementById(item[1] + "voters").appendChild(elemcandidatediv);
    }
    // document.getElementById(item[1] + "voters").appendChild(elemcandidatediv);
    // $('#preloaderModal').modal('close');

}

function readThenUpdate(candpos) {
    // var reader = new FileReader();
    // reader.onload = function(){
    //     console.log("reader");
    // };
    if(votingActive === false){
      alert("You are not allowed to Vote at the moment please contact the Admin");
      return 0;
    }

    if(votedCategoryDummy.length > 0 ){
      if(votedCategoryDummy.includes(catHolderDict[candpos])){
        alert("You already Voted for this category Please move on to another");
        return 0;
      }
    }

    votedCategoryDummy.push(catHolderDict[candpos]);
    query = new Parse.Query(candidateProfile);
    query.equalTo("candidate_name", candpos);
    query.first().then(function (cand) {
      if (cand) {
        // console.log('Pet found with name: ' + pet.get("name") + ' and age: ' + pet.get("age"));
        // console.log("hurray");
        update(cand);
      } else {
        console.log("Nothing found, please try again");
      }
    }).catch(function (error) {
      console.log("Error: " + error.code + " " + error.message);
      var index = votedCategoryDummy.indexOf(catHolderDict[candpos]);
      if (index > -1) {
        votedCategoryDummy.splice(index, 1);
      }
      alert("Your recent input was not updated do check your internet connections and try again..");
    });
}

function update(candprof) {

    // candprof.set('Candidate_vote', Number(candprof.get("Candidate_vote")) + 1);
    candprof.increment('Candidate_vote');
    candprof.addUnique("voters",Current_User());

    candprof.save().then(function (candg) {
    //   console.log('Pet updated! Name: ' + pet.get("name") + ' and new age: ' + pet.get("agePet"));
    collectCategoriesVotedFor(candprof.get("candidate_name"));

    }).catch(function(error) {
      console.log('Error: ' + error.message);
      alert("please check that you've got internet connection and reload the page");
    });
}
function populateVotedCat(Vcat){

}


function collectCategoriesVotedFor(categoryV){
    votedCategory.push(catHolderDict[categoryV]);
    readThenVatcatUpdate(catHolderDict[categoryV]);
    removeVotedCategory(catHolderDict[categoryV]);
}
function removeVotedCategory(valueToDel){
    var elementDel = document.getElementById(valueToDel  + "voters");

    if(elementDel != null){
        document.getElementById("candidateVoters").removeChild(elementDel);
    }
}

function postLoginArrangement(){
    votesVal = [];

    document.getElementById("userProfile").innerHTML =  sessionStorage.getItem("userNameB");
    query = new Parse.Query(VotedCategories);
      query.equalTo("current_user", Current_User());
      query.find().then(function (cand) {
        if (cand) {
            for (let index = 0; index < cand.length; index++) {
                votedCategorycanRes.push.apply(votedCategorycanRes,cand[index].get("Vtcategory_name"));

            }
            console.log("start");
            console.log(votedCategorycanRes);
          // console.log('Pet found with name: ' + pet.get("name") + ' and age: ' + pet.get("age"));
          // console.log(cand.get("Vtcategory_nme"));

          //   cand.get("Vtcategory_name").forEach(function(item,index,array){
          //   votedCategorycanRes.push(item);

          // });
             readCategoriesVoters();

        } else {
          console.log("Nothing found, please try again later");
          readCategoriesVoters();
        }
      }).catch(function (error) {
        console.log("Errors: " + error.code + " " + error.message);
      });


}
function Current_User(){
  var currentUser = sessionStorage.getItem("userToken");
  return currentUser;
}



function createVotedCategoriesExceptons(votedCatArray) {
  Vcategory = new VotedCategories();
  Vcategory.set("current_user",Current_User());
  Vcategory.addUnique("Vtcategory_name", votedCatArray);
  Vcategory.save().then(function(catg){
      console.log("vcat Added");
  }).catch(function(error){
       console.log('Error: ' + error.message);
       alert("Please check that theres internet connection before proceeding ")
  });
}
function logOut(){
  sessionStorage.removeItem("userToken");
  window.location.href = "index.html";

}
function VotingPrivil(){
  query = new Parse.Query(VotingBool);
  query.first().then(function (cand) {
      if (cand) {
          votingActive =  cand.get("votebool");
          console.log("votingActive " + votingActive);

      } else {
        console.log("Nothing found, please try again later");
      }
    }).catch(function (error) {
      console.log("Errors: " + error.code + " " + error.message);
    });
}

function readThenVatcatUpdate(votedCatArray ) {

  query = new Parse.Query(VotedCategories);
  query.equalTo("current_user", Current_User());
  query.first().then(function (cand) {
    if (cand) {
      updatevatcat(cand,votedCatArray);
    } else {
      createVotedCategoriesExceptons(votedCatArray);
      console.log("Nothing found, please try again");
    }
  }).catch(function (error) {
    console.log("Error: " + error.code + " " + error.message);
    // alert("Your recent input was not updated do check your internet connections and try again..");
  });
}

function updatevatcat(candprof,votedCatArray) {

  // candprof.set('Candidate_vote', Number(candprof.get("Candidate_vote")) + 1);

  candprof.addUnique("Vtcategory_name", votedCatArray);
  candprof.save().then(function (candg) {
  //   console.log('Pet updated! Name: ' + pet.get("name") + ' and new age: ' + pet.get("agePet"));
  console.log("vcat Added");

  }).catch(function(error) {
    console.log('Error: ' + error.message);
    alert("please check that you've got internet connection and reload the page");
  });
}
