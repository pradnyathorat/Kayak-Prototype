export const adminSetCurrentItem=(name) => {
    return(
    {
        type:"ADMIN_SET_CURRENT_ITEM",
        data: name
    }
    );
}
