import { AppDataSource } from '../data-source';
import { WalkImage } from '../entity/WalkImage';

export const WalkImageRepository = AppDataSource.getRepository(WalkImage).extend({

    async findWalkImageByFilename(filename: string): Promise<WalkImage> {
        return await this.findOne({
            where: { name : filename },
        });
    },

    async findWalkImageById(id: number): Promise<WalkImage> {
        return await this.findOne({
            where: { id },
        });
    },

    async saveWalkImage(walkImage: WalkImage): Promise<WalkImage> {
        return await this.save(walkImage);
    }
    
});