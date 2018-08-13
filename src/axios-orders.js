import axios from 'axios';

const instance = axios.create({
    
    baseURL: 'https://burger-28984.firebaseio.com/'  
   
});

export default instance;