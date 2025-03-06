const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  const db = await mongoose
    .connect(process.env.NEXT_PUBLIC_MONGO_URI)
    .then((conn) => conn.connection.host)
    .catch((err) => console.log(err));
};

export default connectDB;
