import { exec } from 'child_process';
import { send } from '../email/nodemailer';

const CronJob = require("node-cron");
const fs = require('fs')

//TODO : A fix ne fonctionne pas en prod

export const dumpDatabase = () => {
  const scheduledJobFunction = CronJob.schedule("*/1 * * * *", async () => {

    const dumpToFile = async (path: string): Promise<void> => {
      console.log(`Dumping database to file at ${path}...`);
    
      await new Promise((resolve, reject) => {
        exec(
          `mysqldump --host=${process.env.DB_HOST} --port=${process.env.DB_PORT} --user=${process.env.DB_USER} --password=${process.env.DB_PASSWORD} ${process.env.DB_NAME} > ${path}`,
          (error, _, stderr) => {
            if (error) {
              reject({ error: JSON.stringify(error), stderr });
              return;
            }
            resolve(undefined);
          }
        );
      });
    
      console.log("Dump created.");
    }

    const sendMail = async (filename: string, path: string): Promise<void> => {

      const sqlFileContent = fs.readFileSync(path, 'utf-8');

     await send({
        "form": "v.duguet.dev@gmail.com",
        "to": "v.duguet.dev@gmail.com",
        "subject": `Dump database ${process.env.DB_NAME}, ${new Date().toLocaleString()}`,
        "text": `Dump database ${process.env.DB_NAME}, ${new Date().toLocaleString()}`,
        "html": `<b>Dump database ${process.env.DB_NAME}, ${new Date().toLocaleString()}</b>`,
        "attachments": [
          {
            "filename": `${filename}`,
            "path": `${path}`,
            "contents": sqlFileContent,
          }
        ]
      })
    }

    const filename = `${Math.round(Date.now() / 1000)}.dump.sql`;
    const path = `${process.env.UPLOAD_PATH}/${filename}`;

    await dumpToFile(path);
    await sendMail(filename, path);

  });

  scheduledJobFunction.start();
}
