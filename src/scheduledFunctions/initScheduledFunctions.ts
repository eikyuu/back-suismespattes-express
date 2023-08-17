const CronJob = require("node-cron");
const fs = require('fs')

export const initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule("* * * * * *", () => {
    console.log("I'm executed on a schedule!");
    // Add your custom logic here
  });

  scheduledJobFunction.start();
}

export const dumpDatabase = () => {
  const scheduledJobFunction = CronJob.schedule("* * * * * *", () => {
    const fs = require('fs')
    const spawn = require('child_process').spawn
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
        console.log('Finished dumping database')
    })
    
  });

  scheduledJobFunction.start();
}
