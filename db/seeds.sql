INSERT INTO department (name) values
('Administration/operations'),
('Research and development'),
('Marketing and sales'),
('Human resources'),
('Customer service'),
('Accounting and finance');

INSERT INTO role(title, salary, department_id) values
('Manager', '100000', 1),
('Engineer', '90000', 1),
('Manager', '130000', 2),
('Engineer', '110000', 2),
('Manager', '85000', 3),
('Engineer', '65000', 3),
('Manager', '90000', 4),
('Engineer', '70000', 4),
('Manager', '95000', 5),
('Engineer', '75000', 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
values
('Omar', 'Ahmed', 6,1),
('Khaoula', 'Bouchine', 6,Null),
('Houyam', 'Hammani', 2,3),
('Bader', 'Jabour', 5,1),
('Adnan', 'Jabour', 7,3),
('Lamy', 'Bouaam', 7,3),
('Oumy', 'Jabour', 6,1),
('Souad', 'Fahssi', 6,3);

-- employee_id, first_name, last_name, job_title, department, salaries, and managers that the employees report to

-- select role.id, title as job_title, department.name as department, salary from role left join department on role.department_id=department.id
-- select employee.id, first_name, last_name, role.title as job_title, department.name as department, salary, manager_id from employee left join role on employee.role_id=role.id left join department on role.department_id=department.id order by manager_id
-- select e.id, e.first_name, e.last_name, role.title as job_title, department.name as department, salary,
--  CONCAT(m.first_name, ' ', m.last_name) AS manager_name 
--  from employee e 
--  left join employee m on e.manager_id=m.id 
--  left join role on employee.role_id=role.id 
--  left join department on role.department_id=department.id 
--  order by manager_id


--  select e.id, e.first_name, e.last_name, role.title as job_title, department.name as department, salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name from employee e left join employee m on e.manager_id=m.id left join role on e.role_id=role.id left join department on role.department_id=department.id order by manager_name;