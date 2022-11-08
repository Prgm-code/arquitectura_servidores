const express = require('express');
const router = express.Router();
const employees = require('../models/employees.json');

// Routes here

router.get('/employees', (req, res) => {
    console.log(req.query);

    if (req.query.page) { // this if statement is to check the page query and covers exercise 1 , 2 and 3
        const page = req.query.page

        let start = (page - 1) * 2
        let end = ((page - 1) * 2) + 1
        let employeesPage = [employees[start], employees[end]];
        res.json(employeesPage);

    } else if (req.query.user) { // this if statement is to check the user query and covers exercise 4

        let employeesUsers = employees.filter(employee => employee.privileges === 'user');
        res.json(employeesUsers);



    } else if (req.query.badges) { // this if statement is to check the badges query and covers exercise 7

        let employeesBadges = employees.filter(employee => employee.badges.includes('black'));
        res.json(employeesBadges);
    }
    else {
        console.log('no query');
        res.json(employees);
    }
});

router.get('/employees/oldest', (req, res) => { // this route is to check the oldest query and covers exercise 4
    let oldest = employees[0];
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].age > oldest.age) {
            oldest = employees[i];
        }
    }
    res.status(200).json(oldest);
});

router.get('/employees/youngest', (req, res) => { // this route is to check the youngest query and is the same as the oldest route but with the < sign
    let youngest = employees[0];
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].age < youngest.age) {
            youngest = employees[i];
        }
    }
    res.status(200).json(youngest);
});

router.post('/employees', (req, res, next) => { // this route is to check the new employee match with the first level of keys in the json file
    const newEmployee = req.body;
    let exit = false;
    Object.keys(employees[0]).forEach(key => {
        if (!newEmployee[key])  return exit = true;
        
    });
    if (exit) return res.status(400).json({400: 'Bad Request'});
    
    employees.push(newEmployee);
    res.status(201).json(newEmployee);


});


router.get('/employees/:NAME', (req, res) => {
    const name = req.params.NAME;
    console.log(name);
    const employee = employees.find(employee => employee.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    if (employee) {

        res.json(employee);
    } else {
        res.status(404).json({ 404: 'not_found' });
    }
});






router.get('/employees/:id', (req, res) => {
    const found = employees.some(employee => employee.id === parseInt(req.params.id));

    if (found) {
        res.json(employees.filter(employee => employee.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No employee with the id of ${req.params.id}` });
    }
});





module.exports = router;
