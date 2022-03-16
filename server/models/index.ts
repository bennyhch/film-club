'use strict';

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
  .then(() => {
    console.log('connected');
  })
  .catch((e) => {
    console.log('error connecting', e);
  });

export default mongoose;
