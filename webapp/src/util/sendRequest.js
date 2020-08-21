import axios from 'axios';

const sendRequest = (endpoint, method, body) => {
    return axios({
        method,
        url: `http://localhost:8080${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
}

export default sendRequest;