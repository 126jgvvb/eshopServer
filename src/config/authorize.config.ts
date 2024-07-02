/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config';

export default registerAs('authorize',()=>({
    apiLoginId:process.env.AUTHORIZE_API_LOGIN_ID,
    transactionKey:process.env.AUTHORIZE_TRANSACTION_KEY,
    environment:process.env.AUTHORIZE_ENVIRONMENT
}))
