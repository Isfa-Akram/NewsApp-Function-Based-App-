import './App.css';
import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App  =()=> {

 const[progress,setProgress]= useState(false);

    return (
      <div>
      
      <Navbar/>

      <LoadingBar
        color='#f119410'
        progress={progress}/>
      
     
<Router>
      <Routes>

        <Route exact path="/"
        element={ <News setProgress={setProgress} country={"us"}   pageSize={10} category={"general"}/>}/>

        <Route exact path="/general"
        element={ <News setProgress={setProgress} country={"us"}   pageSize={10} category={"general"}/>}/>
        
        <Route exact path='/business'
        element={ <News setProgress={setProgress} country={"us"}   pageSize={10} category={"business"}/>}/>

        <Route exact path='/entertainment'
        element={ <News setProgress={setProgress} country={"us"}   pageSize={10} category={"entertainment"}/>}/>

        <Route exact path="/health"
        element={ <News setProgress={setProgress} country={"sa"}   pageSize={10} category={"health"}/>}/>
        
        <Route exact path='/sports'
        element={ <News setProgress={setProgress} country={"us"}   pageSize={10} category={"sports"}/>}/>

        <Route exact path='/science'
        element={ <News setProgress={setProgress} country={"us"}   pageSize={10} category={"science"}/>}/>

        <Route exact path='technology'
        element={ <News setProgress={setProgress} country={"us"}   pageSize={10} category={"technology"}/>}/>


       

       </Routes>
</Router>

      </div>
    )
  
}

export default App

