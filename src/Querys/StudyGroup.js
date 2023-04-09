import axios from "axios";
import { URL } from "./ApiProps";

export default class StudyGroup{
    static async getAllShortView(){
        const response = await axios.get(`${URL}/studyGroup/shortView/getAll`)
        return response.data
    }
    static async getAllFullView(){
        const response = await axios.get(`${URL}/studyGroup/fullDescription/getAll`)
        return response.data
    }
    static async getAllBaseFullView(){
        const response = await axios.get(`${URL}/studyGroup/base/fullDescription/getAll`);
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
    static async putBase(obj){
        const response = await axios.post(`${URL}/studyGroup/base/create`,obj)
        return response.data
    }
}