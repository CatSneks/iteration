import React from 'react';
import VibeDropDown from './VibeDropDown';
import seeds from './spotifySeeds';

//this will be updated to a post request to the database
//that adds the habit to the user in the database
// based on the habit chosen generte seed for post request
// seeds[vibe]() calls this once we extract the vibe from the dropdown

function CreateHabit({ seeds, setVibe }) {
  //const [vibe, setVibe] = useState(null);

  //this will be updated to a post request to the database
  //that adds the habit to the user in the database

  return (
    <section>
      {/* <form action='./addhabit' method='POST'>
        change this whole thing to a form / add a submit button }
        <label for='habit'>What habit would you like to create? </label>
        <input name='habit' id='habit' type='text' length='30'></input>
        <label for='vibe'>What's the vibe?</label>
         <VibeDropDown options={seeds} updateVibe={setVibe} />}
        {/*add input box frequency
       <input type='submit' id='addhabit'>
          Add habit
        </input>
      </form> */}
    </section>
  );
}

export default CreateHabit;
