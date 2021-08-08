  var firebaseConfig = {
    apiKey: "AIzaSyAI5ikzP60gkqYqVRh7Z97M6ePMNvrZx_M",
    authDomain: "anime-96513.firebaseapp.com",
    projectId: "anime-96513",
    storageBucket: "anime-96513.appspot.com",
    messagingSenderId: "319031762721",
    appId: "1:319031762721:web:5ba3c7a48dd328fef9e860"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  function handleSubmit(event) {
    event.preventDefault();
  
    const data = new FormData(event.target);
  
     const value = Object.fromEntries(data.entries());
  
    console.log(value);

    database.ref("users/"+ value.username).set({
        email:value.email,
        username:value.username,
        password:value.password
    })
    }
  
    const form = document.getElementById('formSignup');
    form.addEventListener('submit', handleSubmit)