export class StudentGetResponse {
    constructor(id, first_name, last_name, age, gender, address, latitude, longitude, status, user_id) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
        this.gender = gender;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
        this.user_id = user_id;
    }
}
