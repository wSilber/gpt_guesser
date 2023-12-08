import { userRepo } from "./userSchema"

export const UserParameters = ['id', 'username', 'email']

export function validateUser(user) {

    if(!user) return false

    let validate = true;

    UserParameters.forEach((property) => { 
        if(!user.hasOwnProperty(property)) {
            validate = false;
            return
        } 
    })
    
    return validate
}

export function blankUser() {
    const user = {}

    UserParameters.forEach((param) => user[param] = undefined)

    return user;
}

export async function createUser(user) {

    const checkUser = await getUser(user)

    if(checkUser.length !== 0)
        return { success: false, userExists: true}
    
    const result = await userRepo.save(user)

    const response = {
        success: result !== undefined,
        user: result
    }

    return response

}

export async function getUser(userParams) {

    try {

        const user = await userRepo.search()
        .where('email').eq(userParams.email)

        .or('username').eq(userParams.username)
        .or('id').eq(userParams.id)
        .return.all()

        return user

    } catch (err) {
        console.error(err.message)

        if(err.message == "user:index: no such index")
            console.log("User does not exist")
            return;

        console.log("Unknown error")
        return;
    }

}