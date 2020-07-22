
import mongoose from "mongoose"

export const connect = async () => {
  const { DB_HOST, DB_NAME } = process.env
  try {
    mongoose.set("useFindAndModify", false)
    await mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    mongoose.connection.on("error", function (err) {
      console.error(err)
    })

    mongoose.connection.on("disconnected", async () => {
      console.log("Mongoose disconnected")
    })

    //mongoose.set("useCreateIndex", true)
  } catch (e) {
    throw e
  }
}

export const disConnect = () => {
  mongoose.disconnect()
}