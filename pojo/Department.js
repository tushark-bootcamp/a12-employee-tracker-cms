class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
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

}
module.exports = Department;