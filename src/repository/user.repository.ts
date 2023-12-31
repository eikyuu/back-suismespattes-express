import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export const UserRepository = AppDataSource.getRepository(User).extend({


    async findUserByEmail(email: string) {
        return await this.findOneBy({ email });
    },

    async findUserByPseudo(pseudo: string) {
        return await this.findOneBy({ pseudo });
    },

    async findUserById(id: string) {
        return await this.findOneBy({ id });
    },
});