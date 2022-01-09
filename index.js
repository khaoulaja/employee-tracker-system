const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

//Menu 
const menu = ()=>{
    inquirer.prompt({
        type : 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [ 'view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }).then(({action})=>{
        switch (action) {
            case 'view all departments': allDepartments();
                break;
            case 'view all roles': allRoles();
                break;
            case 'view all employees': allEmployees();
                break;
            case 'add a department': addDepartment();
                break;
            case 'add a role': addRole();
                break;
            case 'add an employee': addEmployee();
                break;
            case 'update an employee role': updateEmployee();
                break;
            default : menu();
        }
    });
}

const allDepartments = ()=>{
    const sql =`select * from department`;
    db.query(sql, (err, rows)=>{
        if(err){
            console.log(err);
        }
        console.log('======== All Departments ========\n');
        console.table(rows);
        console.log('===============================');
        
        menu();
    });
}

menu();