export function changeUserState(pending,logged){
    return {
        type: "CHANGE_USER_STATE",
        pending,
        logged
    }
}