import React, {useState } from "react";
import { useDispatch } from 'react-redux';
import { FormControl,Button,TextField,FormHelperText,Grid,Paper } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { addPlayers } from "./TableTopSlice";

export const TableTopAdd=()=>{

    const dispatch = useDispatch();

    const [firstNameInput,setFirstName] = useState();
const [lastNameInput,setLastName] = useState();
const [contactInput,setContact] = useState();
const [campaignInput,setCampaign] = useState();
const [sessionInput,setSession] = useState();


const handleSubmit = async(e)=>{
    e.preventDefault();

    const newData = {
      "id" : uuidv4(),
      "firstName": firstNameInput,
      "lastName": lastNameInput,
      "contact": contactInput,
      "campaign": campaignInput,
      "session":sessionInput,
    }
    if(newData){
        const response =await axios.post("http://localhost:3001/data",newData);
        dispatch(addPlayers(response));
    }
}

const handleReset =()=>{
    setFirstName("");
    setLastName("");
    setContact("");
    setCampaign("");
    setSession("");
}


return(
        <div>
            <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '100vh' }}
>
    <h1>Edit Form</h1>

  <Grid item xs={4}>
      <Paper   sx={{
        width: 500,
        height: 700,
        display:"flex",
        justifyContent:"center",alignItems:"center"
      }} >
  <form onSubmit={handleSubmit}>
            <FormControl> 
  <TextField value={firstNameInput} onChange={(e)=>setFirstName(e.target.value)} required  id="firstName" aria-describedby="first-name"  placeholder="Enter First Name"/>
  <FormHelperText id="firstName">FirstName.</FormHelperText>

  <TextField value={lastNameInput} onChange={(e)=>setLastName(e.target.value)} required id="lastName" aria-describedby="last-name" placeholder="Enter Last Name" />
  <FormHelperText id="lastName">lastName</FormHelperText>

  <TextField value={contactInput} onChange={(e)=>setContact(e.target.value)} required id="contact" aria-describedby="contact" placeholder="Enter Contact" />
  <FormHelperText id="contact">Contact</FormHelperText>

  <TextField value={campaignInput} onChange={(e)=>setCampaign(e.target.value)} required id="campaign" aria-describedby="campaign" placeholder="Enter Campaign" />
  <FormHelperText id="campaign">campaign</FormHelperText>

  <TextField value={sessionInput} onChange={(e)=>setSession(e.target.value)} required id="session" aria-describedby="session" placeholder="Enter Session" />
  <FormHelperText id="session">session</FormHelperText>

  <Button type="submit" variant="contained">Submit</Button>
  <br />
  <Button type="button" variant="outlined" onClick={handleReset}>Reset</Button>
</FormControl>

            </form>
</Paper>
  </Grid>   
   
</Grid> 

           
           
        </div>
    )

}