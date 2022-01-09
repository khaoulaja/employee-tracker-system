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
const allRoles = ()=>{
    const sql =`select role.id, title as job_title, department.name as department, salary from role left join department on role.department_id=department.id`;
    db.query(sql, (err, rows)=>{
        if(err){
            console.log(err);
        }
        console.log('======== All Roles ========\n');
        console.table(rows);
        console.log('===============================');
        
        menu();
    });
}
const allEmployees = ()=>{
    const sql =`select e.id, e.first_name, e.last_name, role.title as job_title, department.name as department, salary,
     CONCAT(m.first_name, ' ', m.last_name) AS manager_name 
     from employee e left join employee m on e.manager_id=m.id 
     left join role on e.role_id=role.id 
     left join department on role.department_id=department.id 
     order by manager_name`;

    db.query(sql, (err, rows)=>{
        if(err){
            console.log(err);
        }
        console.log('======== All Employees ========\n');
        console.table(rows);
        console.log(' =============================== ');
        
        menu();
    });
}
menu();