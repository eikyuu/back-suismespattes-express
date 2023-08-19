import { exec } from 'child_process';
import { send } from '../email/nodemailer';

const CronJob = require("node-cron");
const fs = require('fs')
const spawn = require('child_process').spawn

// export const dumpDatabase = () => {
//   const scheduledJobFunction = CronJob.schedule("*/2 * * * *", () => {

//     const dumpFileName = `${Math.round(Date.now() / 1000)}.dump.sql`
//     const writeStream = fs.createWriteStream(dumpFileName)

//     const dump = spawn('mysqldump', [
//       '-h',
//       `${process.env.DB_HOST}`,
//       '-P',
//       `${process.env.DB_PORT}`,
//       '-u',
//       `${process.env.DB_USER}`,
//       `-p${process.env.DB_PASSWORD}`,
//       `${process.env.DB_NAME}`,
//     ], { shell: true })

//     dump.stderr.on('data', (data) => {
//       console.log(`stderr: ${data}`)
//     })

//     dump.stdout.pipe(writeStream).on('finish', () => {
//       // attend que le dump soit fini
//       writeStream.close()
//       console.log('dump terminé')
//       // envoi du mail
//       send({
//         "form": "v.duguet.dev@gmail.com",
//         "to": "v.duguet.dev@gmail.com",
//         "subject": `Dump database ${process.env.DB_NAME}, ${new Date().toLocaleString()}`,
//         "text": `Dump database ${process.env.DB_NAME}, ${new Date().toLocaleString()}`,
//         "html": `<b>Dump database ${process.env.DB_NAME}, ${new Date().toLocaleString()}</b>`,
//         "attachments": [
//           {
//             "filename": dumpFileName,
//             "path": `${dumpFileName}`,
//             "cid": `${dumpFileName}`
//           }
//         ]
//       })
//     })

//   });

//   scheduledJobFunction.start();
// }


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

    const sendMail = async (filename: string): Promise<void> => {
     await send({
        "form": "v.duguet.dev@gmail.com",
        "to": "v.duguet.dev@gmail.com",
        "subject": `Dump database ${process.env.DB_NAME}, ${new Date().toLocaleString()}`,
        "text": `Dump database ${process.env.DB_NAME}, ${new Date().toLocaleString()}`,
        "html": `<b>Dump database ${process.env.DB_NAME}, ${new Date().toLocaleString()}</b>`,
        "attachments": [
          {
            "filename": `${filename}`,
            "path": `${filename}`,
            "cid": `${filename}`
          }
        ]
      })
    }

    const filename = `${Math.round(Date.now() / 1000)}.dump.sql`;
    const path = `${process.env.UPLOAD_PATH}/${filename}`;

    await dumpToFile(path);
    await sendMail(path);

  });

  scheduledJobFunction.start();
}
