export const adminSetActivePage=(name) => {
    return(
    {
        type:"ADMIN_SET_ACTIVE_PAGE",
        data: name
    }
    );
}
