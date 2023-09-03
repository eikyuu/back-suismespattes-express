import { AppDataSource } from '../data-source';
import { Destination } from '../entity/Destination';
import { DestinationImage } from '../entity/DestinationImage';

export const DestinationImageRepository = AppDataSource.getRepository(DestinationImage).extend({

    async findDestinationImageByFilename(filename: string): Promise<DestinationImage> {
        return await this.findOne({
            where: { name : filename },
        });
    },

    async findDestinationImageById(id: number): Promise<DestinationImage> {
        return await this.findOne({
            where: { id },
        });
    },

    async saveDestinationImage(destinationImage: DestinationImage): Promise<DestinationImage> {
        return await this.save(destinationImage);
    },

    async removeDestinationImageByDestination(destination: Destination): Promise<DestinationImage> {
        return await this.delete({
            destination: destination
        });
    }


    
});