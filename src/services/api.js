//import axios
import axios from 'axios';

const Api = axios.create({
    //set default endpoint API
    baseURL: 'http://localhost:8080/api'
})

export default Api