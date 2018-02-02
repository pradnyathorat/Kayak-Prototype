export const adminAllUsers=(users) => {
    return(
    {
        type:"ADMIN_ALL_USERS",
        data: users
    }
    );
}
