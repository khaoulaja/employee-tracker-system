INSERT INTO department (name) values
('Administration'),
('Egineering'),
('Sales'),
('Finance'),
('Legal');

INSERT INTO role(title, salary, department_id) values
('Salesperson', '50000', 3),
('Lead Engineer', '90000', 2),
('Software Engineer', '130000', 2),
('Account Manager', '110000', 4),
('Accountant', '55000', 1),
('Legal Team Lead', '85000',5),
('Lawyer', '90000', 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
values
('Khaoula', 'Jabour', 2,Null),
('Driss', 'Bouchine', 4,null),
('Adnan', 'yun', 6,null),
('Bader', 'oon', 3,1),
('Lamy', 'Boam', 7,3 ),
('Omar', 'Ahmed', 3,1),
('Oumy', 'Jabour', 1,2),
('Soad', 'Fassi', 5,2);

