const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const nameRagex = /^[a-zA-Z]+$/;

const passRegex = /^(?=.*[A-Z])(?=.*[\W_])(?!.*\s).{8,}$/;

export const verifyInput = (input:any, type:any) => {
    if(input.length === 0){
        return true;
    }
    switch(type){
        case 'email':
            return emailRegex.test(input);
        case 'name':
            return nameRagex.test(input);
        case 'pass':
            return passRegex.test(input);
    }
};
