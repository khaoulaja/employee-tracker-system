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
('Account Manager', '110000', 2),
('Accountant', '55000', 3),
('Legal Team Lead', '85000', 3),
('Lawyer', '90000', 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
values
('Omar', 'Ahmed', 6,1),
('Khaoula', 'Bouchine', 2,Null),
('Houyam', 'Hammani', 3,3),
('Bader', 'Jabour', 5,1),
('Adnan', 'Jabour', 4,3),
('Lamy', 'Bouaam', 7,3),
('Oumy', 'Jabour', 1,1),
('Souad', 'Fahssi', 5,3);

