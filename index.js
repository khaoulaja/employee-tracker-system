const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

var departments = [];
var roles = [];

function getDepartments(){
db.query('select name from department', (err, rows)=>{
        if(err){
            throw err;
        }
        //console.log(rows);
        rows.map(row => departments.push(row.name));
        departments.push(rows) ;
      // console.log(departments);
    });
}
function getRoles(){
db.query('select title from role', (err, rows)=>{
        if(err){
            throw err;
        }
        //console.log(rows);
        rows.map(row => roles.push(row.title));
        //roles.push(rows) ;
        console.log(roles);
    });
}
getDepartments();
getRoles();
//Menu 
const menu = ()=>{
   return inquirer.prompt({
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
        console.log('=================================');
        
        menu();
    });
}
const allRoles = ()=>{
    const sql =`select role.id, title as job_title, department.name as department, salary from role left join department on role.department_id=department.id`;
    db.query(sql, (err, rows)=>{
        if(err){
            console.log(err);
        }
        console.log('========== All Roles ==========\n');
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
        console.log('================================ ');
        
        menu();
    });
}
const addDepartment = ()=>{
    return inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?(Required)',
        validate: department =>{
            if(department){
                return true;
            }else{
                return false;
            }
        }
    }).then(({departmentName})=>{
        //insert department into db
        const sql =`insert into department (name) values ("${departmentName}")`;
        db.query(sql, (err, result)=>{
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Added ${departmentName}`);
            menu();
        });
    });

}

// console.log(departments);
menu();
