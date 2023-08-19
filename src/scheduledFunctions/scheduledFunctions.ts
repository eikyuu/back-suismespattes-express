import { send } from '../email/nodemailer';

const CronJob = require("node-cron");
const fs = require('fs')
const spawn = require('child_process').spawn

export const dumpDatabase = () => {
  const scheduledJobFunction = CronJob.schedule("*/2 * * * *", () => {

    const dumpFileName = `${Math.round(Date.now() / 1000)}.dump.sql`
    const writeStream = fs.createWriteStream(dumpFileName)

    const dump = spawn('mysqldump', [
      '-h',
      `${process.env.DB_HOST}`,
      '-P',
      `${process.env.DB_PORT}`,
      '-u',
      `${process.env.DB_USER}`,
      `-p${process.env.DB_PASSWORD}`,
      `${process.env.DB_NAME}`,
    ], { shell: true })

    dump.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    dump.stdout.pipe(writeStream).on('finish', () => {
      // attend que le dump soit fini
      writeStream.close()
      console.log(`Finished dumping database`);
      send({
        "form": "v.duguet.dev@gmail.com",
        "to": "v.duguet.dev@gmail.com",
        "subject": `Dump database ${process.env.DB_NAME}, ${new Date().toLocaleString()}`,
        "text": `Dump database ${process.env.DB_NAME}, ${new Date().toLocaleString()}`,
        "html": `<b>Dump database ${process.env.DB_NAME}, ${new Date().toLocaleString()}</b>`,
        "attachments": [
          {
            "filename": dumpFileName,
            "path": `${dumpFileName}`,
            "cid": `${dumpFileName}`
          }
        ]
      })

      // fs.unlink(dumpFileName, () => {
      //   console.log(`Deleted dump file ${dumpFileName}`)
      // })

    })

  });

  scheduledJobFunction.start();
}
