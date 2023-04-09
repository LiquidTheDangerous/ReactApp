

import axios from "axios";
import { URL } from "./ApiProps";



export default class Student{
    static async getAllFullDescription(){
        const response = await axios.get(`${URL}/student/fullDescription/getAll`)
        return response.data
    }
    static async put(obj){
        const response = await axios.post(`${URL}/student/create`,obj)
        return response.data
    }
    static async update(obj){
        const response = await axios.put(`${URL}/student/update/${obj.id}`,obj)
        return response.data
    }
}