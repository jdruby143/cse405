const studentlist = document.querySelector('#student-list');
const form = document.querySelector('#add-students-form');

// creating element and rendering students 
function renderStudent(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let major = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    major.textContent = doc.data().major;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(major);
    li.appendChild(cross);

    studentlist.appendChild(li);
    
    // delete data 
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('students').doc(id).delete();
    })
}
//get data 
db.collection('students').orderBy('name').get().then((snapshot) => {
    snapshot.docs.forEach(doc =>{
       renderStudent(doc);
    })
})

//save data
form.addEventListener('submit', (e) => { 
    e.preventDefault();
    db.collection('students').add({
        name: form.name.value,
        major: form.major.value
    });
    form.name.value = '';
    form.major.value = '';
});


