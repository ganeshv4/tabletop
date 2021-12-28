import React,{ useEffect,useState} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { removePlayers } from "./TableTopSlice";
import  axios  from 'axios';


const columns = [
    { field: 'id', headerName: 'ID', width: 90 },

    {
      field: 'fullName',
      headerName: 'Full name',
      width: 300,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: 'session',
        headerName: 'Session',
        sortable: true,
        width: 400,
        editable: true,
      },
  ];



const TableTop = ()=>{

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rows,setRows] = useState();
 

  useEffect(() => {

    async function getData(){
        const res = await fetch("http://localhost:3001/data").then((res)=> res.json());
        setRows(res);
    }
    getData()
  }, [dispatch])
    const [selectedRows, setSelectedRows] = React.useState([]);
   
    const handleDelete=async()=>{
      if(selectedRows){
        const id = selectedRows[0].id;
        await axios.delete(`http://localhost:3001/data/${id}`);
        dispatch(removePlayers(id));
      }
    }

    return (
        <>
    <CssBaseline />
      <Container maxWidth="xl">
      <h1>Player Details</h1>
        <div style={{ height: 700, width: '100%'}}>
         {
            rows && <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
            onRowClick={(props)=>{ 
              navigate(`/${props.id}`)}}
              components={{
                Toolbar: GridToolbar,
              }}
             checkboxSelection

             onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = rows.filter((row) =>
                selectedIDs.has(row.id),
              );
              setSelectedRows(selectedRows);
            }}
            
          />
         }  
</div>
<div style={{display:"flex",justifyContent:"space-between"}}>

<Button variant="contained" color="primary" onClick={()=> {handleDelete(); window.location.reload();}}>
        Purge
      </Button>

      <Button  variant="contained" color="primary" onClick={()=> {navigate("/add")}}>
        Add 
      </Button>
</div>
      </Container>
            
        </>
    )
}

export default TableTop;