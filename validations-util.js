
const validatePhoneNo = (phoneNumber) => {
    var re = /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/;
    return re.test(phoneNumber);
};

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isUserInvalid = user => {
        if(user.phone && !validatePhoneNo(user.phone))
            return `invalid phone number provided`;
        if(!user.firstname)
            return `'first name' is required`;
        if(!user.lastname)
            return `'last name' is required`;
        if(!user.email)
            return `'email' is required`;
        if(user.email && !validateEmail(user.email))
            return `invalid email provided`;
        if(!user.password)
            return `'password' is required`;
        if(user.password && user.password.length < 8)
            return `'password' must be 8 or more characters`;
        if(!user.confirmpassword)
            return `'confirm password' is required`;
        if(user.confirmpassword!==user.password)
            return `password and confirm password doesn't match`;
        if(!user.address)
            return `'address' is required`;
        if(!user.city)
            return `'city' is required`;
        if(!user.state)
            return `'state' is required`;
        
        return null;
}

module.exports = {
    validatePhoneNo,
    validateEmail,
    isUserInvalid
};