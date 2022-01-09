drop table if exists employee;
drop table if exists role;
drop table if exists department;

create table department(
    id integer AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

create table role (
    id integer AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary decimal NOT NULL,
    department_id integer,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

create table employee(
    id integer AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id integer NOT NULL,
    manager_id integer, 
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    CONSTRAINT fk_employee FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);


