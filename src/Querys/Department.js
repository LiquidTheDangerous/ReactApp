
import axios from "axios";
import { URL } from "./ApiProps";


export default class Department{
    static async getAll(){
        const response = await axios.get(`${URL}/department/getAll`)
        return response.data
    }
    static async put(object){
        const responce = await axios.post(`${URL}/department/create`,object)
        return responce
    }
    static async getAllFullDescription(){
        const response = await axios.get(`${URL}/department/fullDescription/getAll`)
        return response.data;
    }
}