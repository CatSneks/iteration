const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv'); // for loading environment variables

require('dotenv').config(); // ensure the environment variables are loaded

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and key are required');
}

const supabase = createClient(supabaseUrl, supabaseKey); // create Supabase client instance to interact with Supabase proj

const createUser = async (userData) => {
  try {
    // First check if user already exists using email
    const { data: existingUser, error: checkError } = await supabase
      .from('Users')
      .select('*') // Select all fields to return the complete user object
      .eq('email', userData.email)
      .single();

    // If there's an error but it's not the "no rows returned" error, throw it
    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    // If user exists, return the existing user
    if (existingUser) {
      console.log('Existing user found:', existingUser);
      return existingUser;
    }

    console.log('Creating new user with data:', {
      name: userData.display_name,
      email: userData.email,
      habits: [],
    });

    // If user doesn't exist, create new user without specifying ID
    const { data, error } = await supabase
      .from('Users')
      .insert({
        name: userData.display_name,
        email: userData.email,
        habits: [],
      })
      .select()
      .single();

    if (error) {
      console.error('Error during user creation:', error);
      throw error;
    }

    console.log('New user created:', data);
    return data;
  } catch (error) {
    console.error('Error creating/fetching user: ', error);
    throw error;
  }
};

const getUserId = async (userName) => {
  try {
    const users = await supabase.from('Users').select('*'); // fetch daily mood from Supabase
    const { data, error } = await supabase // query Supabase, </user_id> Replace <user_id> with the actual user's ID
      .from('Users') // from Users table
      .select('id') // selecting the habits column
      .eq('name', userName); // filtered by user_id
    if (error) throw error;
    return data; // return fetched data
  } catch (error) {
    console.error('Error fetching daily habits: ', error);
    throw error;
  }
};

const getDailyHabits = async (user_id) => {
  // fetch daily habits from Supabase
  try {
    const { data, error } = await supabase // query Supabase, </user_id> Replace <user_id> with the actual user's ID
      .from('Users') // from Users table
      .select('habits') // selecting the habits column
      .eq('id', user_id); // filtered by user_id
    if (error) throw error;
    return data; // return fetched data
  } catch (error) {
    console.error('Error fetching daily habits: ', error);
    throw error;
  }
};

const makeDailyHabits = async (user_id, newHabit) => {
  // fetch daily habits from Supabase
  try {
    const { data: existingData, error: fetchError } = await supabase // query Supabase, </user_id> Replace <user_id> with the actual user's ID
      .from('Users') // from Users table
      .select('habits') // selecting the habits column
      .eq('id', user_id) // filtered by user_id
      .single(); //gets one object -- don't know if we need

    if (fetchError) throw fetchError;

    const currentHabits = existingData.habits || []; //get existing habits
    const updatedHabits = currentHabits.concat(newHabit);

    //update data
    const { data, error } = await supabase
      .from('Users') // from Users table
      .update({ habits: updatedHabits }) // selecting the habits column to new updated array
      .eq('id', user_id); // filtered by user_id

    if (error) throw error;
    return data; // return fetched data
  } catch (error) {
    console.error('Error updating daily habits: ', error);
    throw error;
  }
};

const deleteDailyHabit = async (user_id, habit) => {
  try {
    const { data: existingData, error: fetchError } = await supabase
      .from('Users')
      .select('habits')
      .eq('id', user_id)
      .single();

    if (fetchError) throw fetchError;

    if (!existingData || !existingData.habits) {
      throw new Error('No habits found for user');
    }

    const currentHabits = existingData.habits;

    // Filter out the habit by checking if the object has the habit name as a key
    const updatedHabits = currentHabits.filter((habitObj) => {
      return !Object.hasOwn(habitObj, habit);
    });

    // Update the database with new habits array
    const { data, error } = await supabase
      .from('Users')
      .update({ habits: updatedHabits })
      .eq('id', user_id)
      .select();

    if (error) throw error;

    return updatedHabits;
  } catch (error) {
    console.error('Error updating daily habits: ', error);
    throw error;
  }
};

module.exports = {
  getDailyHabits,
  makeDailyHabits,
  deleteDailyHabit,
  getUserId,
  createUser,
};
