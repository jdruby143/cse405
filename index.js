const Joi = require('joi');
const expresss = require('express');
const app = expresss();

app.use(expresss.json());

const courses = [
    {id: 1, name: 'course1' },
    {id: 2, name: 'course2' },
    {id: 3, name: 'course3' },
];

// Simple display of Hello World 
app.get('/', (req, res) => {
    res.send('Hello World!!!!!');
});

// returns a list of courses 
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Requesting a year and month, e.g /api/courses/2018/3
app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.params);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); // result.error 
    if(error) {
        res.status(404).send('error.details[0].message');
        return;
    }
    
    const course = { 
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// getting a course with id, if not found error message will appear. 
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) res.status(404).send('The course with the given id was not found');
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //look up course 
    // if not exsisting, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
       if(!course) res.status(404).send('The course with the given id was not found'); 

    // validate 
    const schema = {
        name: Joi.string().min(3).required()
    };
 
    const { error } = validateCourse(req.body); // result.error 
    if(error) {
        res.status(404).send('error.details[0].message');
        return;
    }
    
    // Update course 
    //Return update course 
    course.name = req.body.name;
    res.send(course);

});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return  Joi.validate(course, schema);

}

// Declaring a port 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ${port}...'));
