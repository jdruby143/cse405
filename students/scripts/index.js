const guideList = document.querySelector('.guides');
const logout1 = document.querySelectorAll('.logged-out');
const login2 = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if (user) {
    const html = `
    <div>Logged in as ${user.email}</div>
    `;
    accountDetails.innerHTML = html;
    
    login2.forEach(item => item.style.display = 'block');
    logout1.forEach(item => item.style.display = 'none');
  } else {
    login2.forEach(item => item.style.display = 'none');
    logout1.forEach(item => item.style.display = 'block');
  }
}

// setup Students with guides 
const setupGuides = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
          <div class="collapsible-body white"> ${guide.content} </div>
        </li>
      `;
      html += li;
    });
    guideList.innerHTML = html
  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to view Studnets</h5>';
  }
  

};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});