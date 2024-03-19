const baseurl='http://172.18.3.72:7071/api/user';
const APIs={
    forgotpassword:baseurl+'/forgotpassword?loginId=',
    resetpassword:baseurl+'/resetpassword',

}
export default APIs;