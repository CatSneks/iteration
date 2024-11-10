//npm install --save @supabase/supabase-js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'; // for loading environment variables

dotenv.config(); // ensure the environment variables are loaded

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey); // create Supabase client instance to interact with Supabase proj

const getDailyHabits = async () => { // fetch daily habits from Supabase
  try{
    const { data, error } = await supabase // query Supabase
      .from('Habits') // from the Habits table
      .select('*'); // selecting all columns
    if (error) throw error;
    return data; // return fetched data
  } catch (error) {
    console.error('Error fetching daily habits: ', error)
    throw error;
  }
};

export default { getDailyHabits };
