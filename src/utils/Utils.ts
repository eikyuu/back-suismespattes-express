const fs = require('fs')

export const formatSlug = (slug) => {
    slug = slug.replace(/[^a-zA-Z0-9 ]/g, "");
    slug = slug.replace(/\s+/g, "-");
    return slug.toLowerCase();
}
/**
 * Method to get all files in a directory
 */
export const getFiles = (dir: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
};
