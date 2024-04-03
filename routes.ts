const BASE_AUTH_URL: string = 'http://172.16.129.240:8084/';
const BASE_URL: string = 'http://172.16.129.240:8082/'; 
const LOGIN: string = BASE_AUTH_URL + 'api/v1/auth/authenticate'
const GET_ALL_INPATIENTS: string = BASE_URL + 'patient/allInpatients'
const GET_ALL_NURSES: string = BASE_URL + 'employee/getAllNurses'
const GET_ALL_DOCTORS: string = BASE_URL + 'employee/getAllDoctors'
export  {BASE_AUTH_URL, BASE_URL,LOGIN,GET_ALL_INPATIENTS, GET_ALL_NURSES, GET_ALL_DOCTORS} 