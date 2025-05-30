const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login' });
});

app.get('/employees', (req, res) => {
    res.render('employees/list', { title: 'Employee List' });
});

app.get('/add', (req, res) => {
    res.render('employees/add', { title: 'Add Employee' });
});

app.get('/employees/edit/:id', (req, res) => {
    const employeeId = req.params.id;
    res.render('employees/editEmployee', { employeeId, title: 'Edit Employee' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
