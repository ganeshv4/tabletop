import React from 'react';
import './App.css';
import TableTop from './features/tabletop/TableTop';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TableTopFormEdit from './features/tabletop/TableTopEdit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadPlayers } from './features/tabletop/TableTopSlice';
import { TableTopAdd } from './features/tabletop/TableTopAdd';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    async function getData(){
        const res = await fetch("http://localhost:3001/data").then((res)=> res.json());

        console.log(res);
        dispatch(loadPlayers(res));
    }
    getData()


  }, [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/"  element={<TableTop />} />
      <Route path="/:userId" element={<TableTopFormEdit />}  />
      <Route path="/add" element={<TableTopAdd />}  />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
