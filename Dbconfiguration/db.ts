const mongoose = require("mongoose");
require('dotenv').config();

export async function connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.URI);
      console.log("DataBase Connected");
    } catch (error) {
      console.log(error);
    }
}

