class Employee {
    constructor(id, name, lastName, role, manager) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.role = role;
        this.manager = manager;
    }

    setId(id) {
        this.id = id;
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

    setManager(manager) {
        this.manager = manager;
    }
}

module.exports = Employee;