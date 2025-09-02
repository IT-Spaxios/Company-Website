import pkg from "bcryptjs";

const { compareSync } = pkg;

export const validateUserInput =(email,password) =>{

    return(
        email && password
    )

}

export const comparePassword =  (password , hashedPassword) =>{

    return  compareSync(password,hashedPassword)

}

