

var client = new Parse.LiveQueryClient({
    applicationId: '"iVLYheYwSFeyR7mT14SzAbZMWsL3nCbLNvMDiFK4"',
    serverURL: 'wss://' + 'nacossvoting.back4app.io', // Example: 'wss://livequerytutorial.back4app.io'
    javascriptKey: 'RA8dHQmj8ftCG1NXQw3j8ks4bIyOZZ6JhGQ4YNCV',
    masterKey: 'zMpzbi7FpKbsAUMMJyl7CC0Goe2YELem4VC1BJ8t'
  });
client.open();

var candidateListAnalytics = [];
var candidateListAnalyticsDummy = [];
var candidateListAnalyticsDummyVotes = [];
var candidateListAnalyticsDummyCandidate = [];
var candidateProfile = Parse.Object.extend("candidateProfile");

var ctx = document.getElementById('Candidates_chart');
var myChart = new Chart(ctx, {
type: 'horizontalBar',
data: {
    labels: candidateListAnalyticsDummy,
    datasets: [{
        label: 'Live Charts of Votes',
        data: candidateListAnalyticsDummyVotes,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        pointColor : "#fff",
        pointStrokeColor : "#9DB86D",
        borderWidth: 1
    }]
},
options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                fontSize:6
            }
        }]
    }
}
});


var query = new Parse.Query('candidateProfile');
var VotingBool = Parse.Object.extend("VotingBool");
query.ascending('createdAt').limit(5);
var subscription = client.subscribe(query);
subscription.on('open', () => {
    console.log('subscription opened');
   });

subscription.on('create', candidate => {
    
});

subscription.on('delete', todo => {

           

        }
    );

subscription.on('update', (object) => {
    console.log("updated");
    UpdateChartData();
  
});
var choices = ["spc1","spc2"];
window.addEventListener('DOMContentLoaded', function() {
    // if(Current_User() === null){
    //     window.location.href = "index.html";
    // }
    PopulateCandidates();
   
});


function updateChartTrig(){
    myChart.data.datasets[0].data = candidateListAnalyticsDummyVotes;
    myChart.data.labels= candidateListAnalyticsDummy;
    myChart.update( duration=0);
    candidateListAnalyticsDummy.forEach(function(item, index, array) {
        document.getElementById(item + "nm").innerHTML = item.toString() + "\t" + candidateListAnalyticsDummyVotes[candidateListAnalyticsDummy.indexOf(item)]  + "\t" + "votes\n" + candidateListAnalyticsDummyCandidate[candidateListAnalyticsDummy.indexOf(item)];
    });
    
}
function PopulateCandidates(){
    valInd = 0;
    query = new Parse.Query(candidateProfile);
    // query.equalTo("name", textName);
    // document.getElementById("userProfile").innerHTML =  sessionStorage.getItem("userNameB");
    query.find().then(function(results){
        if(results){
            for (let i = 0; i < results.length; i++) {
                var object = results[i];

                candidateListAnalytics.push([object.get("candidate_name"), object.get("Candidate_position"), object.get("Candidate_profileImage"), object.get("Candidate_vote")]);
                candidateListAnalyticsDummy.push(object.get("candidate_name"));
                candidateListAnalyticsDummyVotes.push(object.get("Candidate_vote"));
                candidateListAnalyticsDummyCandidate.push(object.get('Candidate_position'));
              
                
               
               if(candidateListAnalyticsDummy.length > 0){
                    myChart.update();
              
                    // VotingPrivil_DASH();
                    
                   
               }
                // $("#profileImg")[0].src = object.get("Candidate_profileImage").url();
                
              }
              var filterCandList = [...new Set(candidateListAnalyticsDummyCandidate)];
              filterCandList.forEach(function(item, index, array) {
                document.getElementById( choices[valInd]).appendChild(candsegment(item));
                valInd+=1;
                if(valInd >1){
                    valInd = 0;
                }
              
               
              });
              candidateListAnalytics.forEach(function(item, index, array) {
                document.getElementById( item[1] + "cand").appendChild(popPup(item));
              });
          
            //   candidateList.forEach(function(it choices[valInd]em, index, array) {
            //     creatingCandDOM(item);
            //     populateCandRemove(item[0]);
            //   });
              
        } else {
           console.log("Nothing found, please try again");
        }
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);       
    });
 }

 //updateChart
 function UpdateChartData(){
    candidateListAnalyticsDummyVotes = []
    candidateListAnalyticsDummy = []
    candidateListAnalyticsDummyCandidate = [];
    
    query = new Parse.Query(candidateProfile);
    // query.equalTo("name", textName);
    query.find().then(function(results){
        if(results){
            for (let i = 0; i < results.length; i++) {
                var object = results[i];
                // candidateListAnalytics.push([object.get("candidate_name"), object.get("Candidate_position"), object.get("Candidate_profileImage"), object.get("Candidate_vote")]);
                candidateListAnalyticsDummy.push(object.get("candidate_name"));
                candidateListAnalyticsDummyVotes.push(object.get("Candidate_vote"));
                candidateListAnalyticsDummyCandidate.push(object.get('Candidate_position'));
                updateChartTrig();}
               
        } else {
           console.log("Nothing found, please try again");
        }
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);       
    });
 }


    

 function logOut(){
    console.log(sessionStorage.getItem("userToken"));
    sessionStorage.removeItem("userToken");
    window.location.href = "index.html";
  
  }
  function Current_User(){
    var currentUser = localStorage.getItem("userToken");
    console.log(currentUser + "here at dash");
    return currentUser;
  }
// function readThenUpdateVTPRV(bool_val) {
//     query = new Parse.Query(VotingBool);
//     query.first().then(function (cand) {
//       if (cand) {
//         updateVTPRV(cand,bool_val);
//       } else {
//         console.log("Nothing found, please try again");
//       }
//     }).catch(function (error) {
//       console.log("Error: " + error.code + " " + error.message);
//     });
// }
// function updateVTPRV(voteactiven,bool_valu) {
//     // candprof.set('Candidate_vote', Number(candprof.get("Candidate_vote")) + 1);
//     voteactiven.set('votebool',bool_valu);
//     voteactiven.save().then(function (candg) {
//     //   console.log('Pet updated! Name: ' + pet.get("name") + ' and new age: ' + pet.get("agePet")); 
//     }).catch(function(error) {
//       console.log('Error: ' + error.message);
//       alert("please check that you've got internet connection and reload the page");
//     });
// }
// function VotingPrivil_DASH(){
//     query = new Parse.Query(VotingBool);
//     query.first().then(function (cand) {
//         if (cand) {
//             document.getElementById("voteActswitch").checked = cand.get("votebool");
//         } else {
//           console.log("Nothing found, please try again later");
//         }
//       }).catch(function (error) {
//         console.log("Errors: " + error.code + " " + error.message);
//       });
//   }
//   if(document.getElementById("voteActswitch") != null){
//     document.getElementById("voteActswitch").addEventListener('change', function() {
    
//         if( document.getElementById("voteActswitch").checked){
            
//              readThenUpdateVTPRV(true);
//              console.log("changed");
//         }
//         else{
//          readThenUpdateVTPRV(false);
//          console.log("Unchanged");
//         }
//      });
//   }
 

//  <div class="col s12 m8 offset-m2 l6 offset-l3">
//  <div class="card-panel grey lighten-5 z-depth-1">
//    <div class="row valign-wrapper">
//      <div class="col s2">
//        <img src="images/yuna.jpg" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
//      </div>
//      <div class="col s10">
//        <span class="black-text">
//          This is a square image. Add the "circle" class to it to make it appear circular.
//        </span>
//      </div>
//    </div>
//  </div>
// </div>
function candsegment(item){
    var elem1 = document.createElement('div');
    var headertg = document.createElement('h6');

    elem1.className = "col s12";
    elem1.id = item + "cand";
    headertg.innerHTML = item;
    elem1.appendChild(headertg);
    return elem1;
}
function popPup(item){

    var elem1 = document.createElement('div');
    var elem2 = document.createElement('div');
    var elem3 = document.createElement('div');
    var elemimg = document.createElement('div');
    var elemHSpn = document.createElement('div');
    
    var spanelem = document.createElement('span');
    var imgelem = document.createElement('img');
   
    elemimg.className = "col s4";
    imgelem.src = item[2].url();
    imgelem.className = "circle responsive-img";
    elemimg.appendChild(imgelem);
    elemHSpn.className = "col s10";
    spanelem.className = "black-text";
    spanelem.id = item[0] + "nm";
    spanelem.innerHTML = item[0] + "\t" + item[3] + "\t" + "votes\n" + item[1];
    elemHSpn.appendChild(spanelem);
    elem3.className = "row valign-wrapper";
    elem2.className = "card-panel grey lighten-5 z-depth-1";
    elem1.className = "col s12 ";
    elem3.appendChild(elemimg);
    elem3.appendChild(elemHSpn);
    elem2.appendChild(elem3);
    elem1.appendChild(elem2);
    return elem1;
}