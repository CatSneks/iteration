//npm install --save @supabase/supabase-js
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'; // for loading environment variables
dotenv.config(); // ensure the environment variables are loaded

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;


// index.js
app.get('/dayview', (req, res) => {})


// routers.js
import express from 'express'; // imports express
import exerciseController from '../controllers/exerciseController.js'; // imports exerciseController module

const router = express.Router(); // imports Router() from Express

router.get('/dayview', userController.getDaily);


// controller.js
userController.getDaily = async (req, res, next) => {
  try {
  } catch (error) {
  }
}


// 1) get request for users daily habits (hardcoded info in supabase at first)

// 2) get request to query spotify and handle the response

// MVP STRETCH
// 3) post/put/patch method to actually add habits