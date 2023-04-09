
import axios from "axios";
import { URL } from "./ApiProps";


export default class Faculty{
    static async getAll(){
        const response = await axios.get(`${URL}/faculty/getAll`)
        return response.data
    }
}