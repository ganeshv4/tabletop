import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useParams,useNavigate } from "react-router-dom";
import { FormControl,Button,TextField,FormHelperText,Grid,Paper } from '@mui/material';
import { editPlayers } from "./TableTopSlice";
import axios from "axios";

const TableTopFormEdit = ()=>{

const dispatch = useDispatch();
const navigate = useNavigate();
let params = useParams();
const [editData,setEditData] = useState();
const [firstNameInput,setFirstName] = useState("");
const [lastNameInput,setLastName] = useState("");
const [contactInput,setContact] = useState("");
const [campaignInput,setCampaign] = useState("");
const [sessionInput,setSession] = useState("");


useEffect(() => {
  async function getData(){
    const {data} = await axios.get(`http://localhost:3001/data/${params.userId}`);
    setEditData(data);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setContact(data.contact);
    setCampaign(data.campaign);
    setSession(data.session);
  }
getData();
 
},[params.userId]);
console.log(editData?.firstName);


console.log(firstNameInput,"after");
const handleSubmit =async (e)=>{
    const newData = {
      "id" : params.userId,
      "firstName": firstNameInput,
      "lastName": lastNameInput,
      "contact": contactInput,
      "campaign": campaignInput,
      "session":sessionInput,
    }
    if(newData){
       await axios.put(`http://localhost:3001/data/${params.userId}`,newData);
       dispatch(editPlayers(newData));
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
  <TextField value={firstNameInput} onChange={(e)=>setFirstName(e.target.value)}  id="firstName" aria-describedby="first-name"  placeholder="Enter First Name"/>
  <FormHelperText id="firstName">FirstName.</FormHelperText>

  <TextField value={lastNameInput} onChange={(e)=>setLastName(e.target.value)} id="lastName" aria-describedby="last-name" placeholder="Enter Last Name" />
  <FormHelperText id="lastName">lastName</FormHelperText>

  <TextField value={contactInput} onChange={(e)=>setContact(e.target.value)} id="contact" aria-describedby="contact" placeholder="Enter Contact" />
  <FormHelperText id="contact">Contact</FormHelperText>

  <TextField value={campaignInput} onChange={(e)=>setCampaign(e.target.value)} id="campaign" aria-describedby="campaign" placeholder="Enter Campaign" />
  <FormHelperText id="campaign">campaign</FormHelperText>

  <TextField value={sessionInput} onChange={(e)=>setSession(e.target.value)} id="session" aria-describedby="session" placeholder="Enter Session" />
  <FormHelperText id="session">session</FormHelperText>

  <Button type="submit" onClick={()=> {
    handleSubmit();
    navigate("/");
  }  } variant="contained">Submit</Button>
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

export default TableTopFormEdit;