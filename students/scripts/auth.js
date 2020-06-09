// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user logged in: ', user);
      db.collection('students').onSnapshot(snapshot => {
        setupGuides(snapshot.docs);
        setupUI(user);
      }, err => console.log(err.message));
    } else {
      console.log('user logged out');
      setupUI();
      setupGuides([]);
    }
  });
// creating new student 
  const createform = document.querySelector('#create-form');
  createform.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('students').add({
      title: createform.title.value,
      content: createform.content.value

    }).then(() => {
      // close modal and reset the form 
      const modal = document.querySelector('#modal-create');
      M.Modal.getInstance(modal).close();
      createform.reset();
    }).catch(err => {
      console.log(err.message);
    });
  });
  
  // signup
  const signupForm = document.querySelector('#signup-form');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
  
    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    });
  });
  
  // logout
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  });
  
  // login
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
  
    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    });
  
  });
