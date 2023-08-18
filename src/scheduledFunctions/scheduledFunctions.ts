import { send } from '../email/nodemailer';

const CronJob = require("node-cron");
const fs = require('fs')
const spawn = require('child_process').spawn

export const dumpDatabase = () => {
  const scheduledJobFunction = CronJob.schedule("0 0 * * *", () => {

    const dumpFileName = `${Math.round(Date.now() / 1000)}.dump.sql`
    const writeStream = fs.createWriteStream(dumpFileName)

    const dump = spawn('mysqldump', [
      '-u',
      `${process.env.DB_USER}`,
      `-p${process.env.DB_PASSWORD}`,
      `${process.env.DB_NAME}`,
    ], { shell: true })

    dump.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    dump.stdout.pipe(writeStream).on('finish', () => {
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
      console.log('Finished dumping database')
    })

  });

  scheduledJobFunction.start();
}
