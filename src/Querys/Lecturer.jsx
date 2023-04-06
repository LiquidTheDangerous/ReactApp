import axios from "axios";
import { URL } from "./ApiProps";


export default class Lecturer{
    static async getFullDescription(){
        const response = await axios.get(`${URL}/lecturer/fullDescription/getAll`)
        return response.data
    }
}