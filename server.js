process.on('uncaughtException', (err) => {
    console.log(err)
    console.log('uncaughtException...shutting dowm...')
    process.exit(1)
  })
const app=require('./app')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('connecting to db was successful');
})
const server=app.listen(process.env.PORT,()=>{
    console.log('here we go');
})
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message)
    console.log('unhandledRejection...shutting dowm...')
    server.close(() => {
      process.exit(1)
    })
  })