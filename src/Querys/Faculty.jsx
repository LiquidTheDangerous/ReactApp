
import axios from "axios";
import { URL } from "./ApiProps";


export default class Faculty{
    static async getAll(){
        const response = await axios.get(`${URL}/faculty/getAll`)
        return response.data
    }
    static async put(obj){
        const responce = await axios.post(`${URL}/faculty/create`,obj)
        return responce.data
    }
    static async update(obj){
        const response = await axios.put(`${URL}/faculty/update/${obj.id}`,obj)
        return response.data
    }
}