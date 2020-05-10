class Employee {
    constructor(id, name, lastName, role, manager) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.role = role;
        this.manager = manager;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getLastName() {
        return this.lastName;
    }

    getRole() {
        return this.role;
    }

    getManager() {
        return this.manager;
    }
}

module.exports = Employee;