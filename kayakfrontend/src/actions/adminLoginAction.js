export const changeValueAdmin=(event) => {
    return(
    {
        type:"CHANGE_VALUE_LOGIN_ADMIN",
        data: event
    }
    );
}


export const adminLoginSuccess=(adminData) => {
    return(
    {
        type:"LOGIN_SUCCESS_ADMIN",
        data: adminData
    }
    );
}