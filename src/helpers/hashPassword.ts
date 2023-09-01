import bcrypt from 'bcrypt';
import config from '../config';

const hashPassword = async (password: string): Promise<string> => {
    const salt = Number(config.salt_rounds);
    return bcrypt.hash(password, salt);
}



const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
}

export const hashPasswordHelper = {
    hashPassword,
    comparePassword,
};