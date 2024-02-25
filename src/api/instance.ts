import axios from "axios";
import md5 from "md5";

const generateXAuthHeader = () => {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const authString = `Valantis_${timestamp}`;
    return md5(authString)
}

const xAuth = generateXAuthHeader()

export const instance = axios.create({
    baseURL: 'http://api.valantis.store:40000/',
    headers: {
        'X-Auth': xAuth
    }
})


// const proxyUrl = 'https://valantis-app.netlify.app/';
//
// export const instance = axios.create({
//     baseURL: 'http://api.valantis.store:40000/',
//     headers: {
//         'Content-Type': 'application/json',
//         'X-Auth': xAuth // Переменная xAuth, которую вы используете
//     },
//     transformRequest: [(data, headers) => {
//         // Здесь вы можете изменить URL запроса
//         headers['X-Proxy-URL'] = 'http://api.valantis.store:40000/'; // Исходный URL вашего API
//         console.log(data, headers)
//         return data;
//     }]
// });