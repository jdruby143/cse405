
const firebaseConfig = {
    apiKey: "AIzaSyAmqvxYrofNYrgDH2ssT8NNO5P1Gnckc04",
    authDomain: "project1-3fb42.firebaseapp.com",
    databaseURL: "https://project1-3fb42.firebaseio.com",
    projectId: "project1-3fb42",
    storageBucket: "project1-3fb42.appspot.com",
    messagingSenderId: "1007884133667",
    appId: "1:1007884133667:web:2072c229ede763013cd896",
    measurementId: "G-JFCHVC7WQ3"
  };
  firebase.initializeApp(firebaseConfig);
  var firestore = firebase.firestore();

  const docRef = firestore.doc("samples/data");
  const outputHeader = document.querySelector("#names");
  const inputTextField = document.querySelector("#Studentsinclass");
  const saveButton = document.querySelector("#saveButton");

  saveButton.addEventListener("click", function() {
    const textToSave = inputTextField.value;
    console.log("I am going to save " + textToSave + "to Firestone");
    docRef.set({
      nameStatus: textToSave
    }).then(function(){
      console.log("Status saved!");
    }).catch(function(error){
      console.log("Got an error:", error);
    });
  })