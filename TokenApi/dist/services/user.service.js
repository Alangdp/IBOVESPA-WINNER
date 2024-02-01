import User from '../model/User.js';
import { resp } from '../utils/resp.js';
export class UserService {
    model;
    constructor() {
        this.model = User;
        return this;
    }
    async getById(id) {
        const user = await this.model.findByPk(id);
        if (!user)
            return resp(400, 'User not found', null);
        return resp(200, 'User found', user);
    }
}
