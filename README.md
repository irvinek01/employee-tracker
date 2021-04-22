# Unit 12 MySQL Homework: Employee Tracker
## Description
Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **Content Management Systems**.  

This command-line application allows the user to manage his/her employees by the following actions:
 - Add departments, roles, employees
 - View departments, roles, employees
 - Update employee roles

This application is using the following dependencies:
 - console.table
 - inquirer
 - mysql

 ## Table of Contents

* [Installation](#installation)

* [ImportingCSV](#importingCSV)

* [Screenshots](#screenshots)

* [Demo](#demo)

* [Acknowledgements](#acknowledgements)

## Installation

Run dependencies:

```bash
npm i
```

For creating and using the same database structure:

```bash
mysql -u root -p < db/schema.sql
```

For pre-populating the database:

```bash
mysql -u root -p < db/schema.sql
```

For starting the command-line application:

```bash
npm start
```
## ImportingCSV

Importing .csv files guide

## Screenshots

- **Upon launching the command-line application.** 

![The command-line application.](./assets/cmd-prog-screenshots/cmd-prog-view.png)

- **Viewing employees.** 

![Viewing.](./assets/cmd-prog-screenshots/cmd-prog-view.png)

- **Adding new employee.**  

![Add employee function.](./assets/cmd-prog-screenshots/cmd-prog-add.png)

## Acknowledgments
- Mr. John
- Mr. Luis
- Would like to commend the following persons for helping directly(guiding me what to do next)/indirectly(asking questions that I'm not aware of):
  - Oliver Shi
  - Brian Hernandez

- https://gist.github.com/lhorie/1204893c2f0e3ba3c14ac204b2df4b24