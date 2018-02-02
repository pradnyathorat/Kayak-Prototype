export const adminCurrentUpdate=(hotel) => {
    return(
    {
        type:"ADMIN_CURRENT_UPDATE",
        data: hotel
    }
    );
}
