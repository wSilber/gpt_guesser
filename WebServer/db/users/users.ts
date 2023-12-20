import { userRepo } from "./userSchema"
import { User } from "./userTypes"

export async function createUser(user: User): Promise<User | null> {

    const exists = await userExists(user)

    if(exists)
        return null
    
    const result: User = await userRepo.save(user) as any as User

    if(result !== undefined)
        return result;

    return null

}

export async function userExists(user: User): Promise<Boolean> {

    const userRetreived = await getUser(user)

    return userRetreived !== null
}

export async function getAllUsers(): Promise<User[]> {
    try {


        const userRetreived = await userRepo.search().return.all()

        console.log(userRetreived)

        if(userRetreived.length > 0)
            return userRetreived as any as User[]

        return []

    } catch (err) {
        console.error(err.message)

        if(err.message == "user:index: no such index") {
            console.log("User does not exist")
            return null;
        }

        console.log("Unknown error")
        return null;
    }
}

export async function getUser(user: User): Promise<User | null> {

    try {

        const userRetreived = await userRepo.search()
        .where('email').eq(user.email)
        .or('id').eq(user.id)
        .return.all()

        if(userRetreived.length > 0)
            return userRetreived as any as User

        return null

    } catch (err) {
        console.error(err.message)

        if(err.message == "user:index: no such index") {
            console.log("User does not exist")
            return null;
        }

        console.log("Unknown error")
        return null;
    }

}
