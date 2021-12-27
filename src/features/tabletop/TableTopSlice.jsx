import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    data: []
}

const TableTopSlice = createSlice({
    name:"tableTopReducer",
    initialState,
    reducers:{
        loadPlayers:(state,action)=>{
            state.data = action.payload;
        },
        addPlayers:(state,action)=>{
            state.data.push(action.payload);
        },
        editPlayers :(state,action)=>{
            state.data.splice(action.payload.id,1,action.payload);
            console.log(state.data);
        },
        removePlayers:(state,action)=>{
            state.data = state.data.filter((item) => item.id !== action.payload);
        }
    }
})


export const { addPlayers,editPlayers,loadPlayers,removePlayers } = TableTopSlice.actions;
export default TableTopSlice.reducer;