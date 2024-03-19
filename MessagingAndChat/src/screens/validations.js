const Validations = {
    isEmailValid: async email => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    },
 
    isPasswordValid : async password => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    },
 
    isContactNumberValid: async (contactNumber) => {
        const contactNumberRegex = /^\d{10}$/;
        return contactNumberRegex.test(contactNumber);
    },
 
    isPhoneNumberValid : async loginId => {
        const phoneNumberRegex = /^\d{12}$/;
        return phoneNumberRegex.test(loginId);
    },
   
    isOtpValid : async otp => {
        const OTPRegex = /^\d{6}$/;
        return OTPRegex.test(otp);
    },
    isNewPasswordValid : (newPassword) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(newPassword);
    },
    isValidTime : async time => {
        const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
        return regex.test(time);
    }
 
}
export default Validations;