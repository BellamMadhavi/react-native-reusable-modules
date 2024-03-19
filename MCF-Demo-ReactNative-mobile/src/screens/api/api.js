const baseurl='http://172.20.100.13:7071/api/user';
const APIs={
    login:baseurl+'/login',
    otp:baseurl+'/send-otp',
    otpVerification:baseurl+'/verify-otp',
    forgotpassword:baseurl+'/forgotpassword?loginId=',
    resetpassword:baseurl+'/resetpassword',
    signup:baseurl+'/register',
    getemployees:baseurl+'/getAllEmployees',
    userProfile:baseurl+'/profile',
    payments:baseurl+'/payments/pay',
    event: baseurl+'/event/'

}
export default APIs;