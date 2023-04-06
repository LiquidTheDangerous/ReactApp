
import axios from "axios";
import { URL } from "./ApiProps";


export default class AcademicTitle{
    static async getAll(){
        const response = await axios.get(`${URL}/academicTitle/getAll`)
        return response.data
    }
}