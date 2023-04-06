import axios from "axios";
import { URL } from "./ApiProps";

export default class StudyGroup{
    static async getAllShortView(){
        const response = await axios.get(`${URL}/studyGroup/shortView/getAll`)
        return response.data
    }
    static async getAllByDepartmentId(id){
        const response = await axios.get(`${URL}/studyGroup/base/getAllByDepartmentId/${id}`)
        return response.data
    }
    static async getAllBase(){
        const response = await axios.get(`${URL}/studyGroup/base/getAll`)
        return response.data
    }
}