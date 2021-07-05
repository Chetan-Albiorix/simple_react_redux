class Person {
    id: string;
    name: string;
    email: string;
    mobileNo: string;
    gender: string;
    isStarred: boolean;
    isDeleted: boolean;

    constructor() {
        this.id = "";
        this.name = "";
        this.email = "";
        this.mobileNo = "";
        this.gender = "";
        this.isStarred = false;
        this.isDeleted = false;
    }
}
export default Person;
