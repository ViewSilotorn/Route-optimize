import axios from 'axios';
import { StudentGetResponse } from '../model/StudentGetResponse';

const HOST = 'http://localhost:3000/api';

export class StudentService {
    async getAllStudent() {
        const url = `${HOST}/students`;
        const response = await axios.get(url);
        const students = response.data.map(studentData =>
            new StudentGetResponse(
                studentData.id,
                studentData.first_name,
                studentData.last_name,
                studentData.age,
                studentData.gender,
                studentData.address,
                studentData.latitude,
                studentData.longitude,
                studentData.status,
                studentData.user_id,
            )
        );
        return students;
    }
}