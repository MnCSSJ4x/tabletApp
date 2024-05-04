const BASE_AUTH_URL: string = 'http://172.16.129.240:8084/';
const BASE_URL: string = 'http://172.16.129.240:8082/';
const BASE_EMR_URL: string = 'http://172.16.129.240:8083/';


// const BASE_AUTH_URL: string = 'https://1nf0cc0n-8084.inc1.devtunnels.ms/'
// const BASE_URL: string = 'https://1nf0cc0n-8082.inc1.devtunnels.ms/'
// const BASE_EMR_URL: string =  'https://1nf0cc0n-8083.inc1.devtunnels.ms/'


// const BASE_AUTH_URL: string = 'https://w2fbn2fr-8084.inc1.devtunnels.ms/'
// const BASE_URL: string = 'https://w2fbn2fr-8082.inc1.devtunnels.ms/'
// const BASE_EMR_URL: string =  'https://w2fbn2fr-8083.inc1.devtunnels.ms/'

const LOGIN: string = BASE_AUTH_URL + 'api/v1/auth/authenticate'
const GET_ALL_INPATIENTS: string = BASE_URL + 'patient/allInpatients'
const GET_ALL_NURSES: string = BASE_URL + 'employee/getAllNurses'
const GET_ALL_DOCTORS: string = BASE_URL + 'employee/getAllDoctors'
const GET_OUTPATIENTS_BY_DOCTOR_ID: string = BASE_URL + 'patientDoctor/getAllOutpatientsByDoctorID/'
const GET_INPATIENTS_BY_DOCTOR_ID: string = BASE_URL + 'patientDoctor/getAllInpatientsByDoctorID/'
const GET_EMPLOYEE_BY_ID: string = BASE_URL + 'employee/'
const GET_EMR_BY_EMRID: string = BASE_EMR_URL + 'emr/getEmrByEmrIdText/'
const PUT_EMR_BY_PATIENT_ID: string = BASE_EMR_URL + 'emr/updateEmrByIdText/'
const GET_EMRID_BY_PATIENT_DOCTOR_ID: string = BASE_EMR_URL + 'consultation/getEmrIdByPatientIdAndDoctorId'
const UPDATE_EMR_BY_EMR_ID: string = BASE_EMR_URL + 'emr/updateEmrByIdText'
const LOGOUT: string = BASE_AUTH_URL + 'api/v1/auth/logout'
const GET_LOGS_BY_ACTOR_ID_AND_USER_ID: string = BASE_URL+'logs/getLogsByActorandUserId/' 

export {
    BASE_AUTH_URL,
    BASE_URL,
    LOGIN,
    GET_ALL_INPATIENTS,
    GET_ALL_NURSES,
    GET_ALL_DOCTORS,
    GET_INPATIENTS_BY_DOCTOR_ID,
    GET_OUTPATIENTS_BY_DOCTOR_ID,
    GET_EMPLOYEE_BY_ID,
    GET_EMR_BY_EMRID,
    PUT_EMR_BY_PATIENT_ID,
    GET_EMRID_BY_PATIENT_DOCTOR_ID,
    UPDATE_EMR_BY_EMR_ID,
    LOGOUT,
    GET_LOGS_BY_ACTOR_ID_AND_USER_ID
} 