import axios from "axios";
import {useEffect} from "react";

import md5 from 'md5';

const API_URL = 'http://api.valantis.store:40000/';
const PASSWORD = 'Valantis';

const generateXAuthHeader = () => {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const authString = `${PASSWORD}_${timestamp}`;
    return md5(authString)
}

const fetchData = async () => {
    const xAuth = generateXAuthHeader();

    const requestData = {
        action: 'get_ids',
        // params: {field: "brand", "offset": 3, "limit": 5}
        params: {offset: 0, limit: 50}
    };
    try {
        const response = await axios.post(API_URL, requestData, {
            headers: {
                'Content-Type': 'application/json',
                'X-Auth': xAuth
            }
        });

        console.log(response.data.result);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const App = () => {
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            blabla
        </div>
    );
}