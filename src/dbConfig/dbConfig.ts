import mongoose from 'mongoose'

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!)
    /* Here we used exclamatry because typescript confirm this typpe will give data or not so we confirmed it will give data */
    const connection = mongoose.connection;
    connection.on('connected',()=>{
        console.log('Mongoose Connected Successfully')
    })
    connection.on('error',(err)=>{
        console.log('Mongoose Connection Error')
    })
  } catch (error) {
    console.log('Something goes wrong')
    console.log(error)
  }
}
