
import axios from "axios";
import { URL } from "./ApiProps";


export default class Department{
    static async getAll(){
        console.log("message")
        const response = await axios.get(`${URL}/department/getAll`)
        return response.data
    }
}