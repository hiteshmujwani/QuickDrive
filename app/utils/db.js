const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  const db = await mongoose
    .connect(
      "mongodb+srv://hiteshmujwaniofficial:hitevya@cluster0.8cnvzue.mongodb.net/quickdrive"
    )
    .then((conn) => conn.connection.host)
    .catch((err) => console.log(err));
};

export default connectDB;
