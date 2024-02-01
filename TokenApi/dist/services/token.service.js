import Token from '../model/Token.js';
import { generateToken } from '../utils/Utilities.js';
import { resp } from '../utils/resp.js';
export class TokenService {
    model;
    constructor() {
        this.model = Token;
        return this;
    }
    async generateToken(userId) {
        try {
            const model = this.model;
            const user = await model.findOne({ where: { user_id: userId } });
            if (user)
                this.deleteToken(user.token);
            const tokenData = generateToken(16);
            const token = await model.create({
                token: tokenData,
                user_id: userId,
            });
            return resp(200, 'Token generated', { token: token });
        }
        catch (error) {
            return resp(500, error.message, null, error);
        }
    }
    async getToken(token) {
        const tokenData = await this.model.findOne({ where: { token } });
        if (!tokenData)
            return resp(400, 'Token not found', null);
        return resp(200, 'Token found', tokenData);
    }
    async deleteToken(token) {
        await this.model.destroy({ where: { token } });
    }
}
