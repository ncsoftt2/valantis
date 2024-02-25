import axios from "axios";
import md5 from "md5";

const generateXAuthHeader = () => {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const authString = `Valantis_${timestamp}`;
    return md5(authString)
}

const xAuth = generateXAuthHeader()


export const instance = axios.create({
    // baseURL: 'http://api.valantis.store:40000/',
    headers: {
        'Content-Type': 'application/json',
        'X-Auth': xAuth
    }
})