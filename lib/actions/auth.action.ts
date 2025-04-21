'use server'

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";



export async funtion signUp(params: SignUpParams){
    const {uid, name, email} = params;

    try{
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists){
            return {
                success: false,
                error: 'User already exists'
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
        })
    } catch(e : any) {
        console.error('Error creating a user', e);

        if(e.code === 'auth/email-already-exists'){
            return {
                success: false,
                error: 'Email already exists'
            }
        }

        return {
            success: false,
            error: 'Something went wrong'
        }
    }
}

export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();

    const sessionCookie = await auth
}
