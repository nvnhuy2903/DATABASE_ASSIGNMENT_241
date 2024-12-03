import Navbar from "../components/nav_standard"
import { useEffect } from "react"
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useRef } from "react";

function Match() {
  let [matches, SetM] = useState();
  
  let keyName = useRef();

  useEffect(() => { 
    document.title = "Match";
    axios.get(`http://localhost:3001/getAllMatch/1`)
      .then(res => {
        
        let match_list = [];
        for (let ele of res.data) {
          // console.log(ele);
          match_list.push(ele);
        }

        SetM(match_list.map(ele => <Link style={{position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center\
          "}} class = "hover:bg-violet-200 hover:cursor-pointer" to={"/detailmatch/" + ele.MatchID} > 
          <div style={{width: "10rem", position: "absolute", top: "10px", left: "70px", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <img style={{height: "6rem", width: "6rem"}} src = {ele.HomeTeam + ".png"} alt = ""/>
            <p class = "font-arial font-bold" > {ele.HomeTeam} </p> 
          </div>  
          <div style={{width: "10rem", position: "absolute", top: "10px", right: "70px", display: "flex", flexDirection: "column", alignItems: "center"}}> 
            <img style={{height: "6rem", width: "6rem"}} src = {ele.AwayTeam + ".png"} alt = ""/>
            <p class = "font-arial font-bold" > {ele.AwayTeam} </p> 
          </div>
          <div class = "text-4xl font-bold" > {ele.HomeScore}   -   {ele.AwayScore} </div>
          <div class = "mt-4" > {(new Date(ele.date)).toString().slice(0,16)} </div>
        </Link>));
        // this.setState({matchData: matches});
      })
    }, []);

  const searchByName = function () {
    let keywork = keyName.current.value;
    if(!keywork) return;

    axios.get(`http://localhost:3001/getMatchbyName/?name=` + keywork)
      .then(res => {
        
        let match_list = [];
        for (let ele of res.data) {
          console.log(ele);
          match_list.push(ele);
        }

        SetM(match_list.map(ele => <Link style={{position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center\
          "}} class = "hover:bg-violet-200 hover:cursor-pointer" to={"/detailmatch/" + ele.MatchID} > 
          <div style={{width: "10rem", position: "absolute", top: "10px", left: "70px", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <img style={{height: "6rem", width: "6rem"}} src = {ele.HomeTeam + ".png"} alt = ""/>
            <p class = "font-arial font-bold" > {ele.HomeTeam} </p> 
          </div>  
          <div style={{width: "10rem", position: "absolute", top: "10px", right: "70px", display: "flex", flexDirection: "column", alignItems: "center"}}> 
            <img style={{height: "6rem", width: "6rem"}} src = {ele.AwayTeam + ".png"} alt = ""/>
            <p class = "font-arial font-bold" > {ele.AwayTeam} </p> 
          </div>
          <div class = "text-4xl font-bold" > {ele.HomeScore}   -   {ele.AwayScore} </div>
          <div class = "mt-4" > {(new Date(ele.Date)).toString().slice(0,16)} </div>
        </Link>));
        // this.setState({matchData: matches});
      })
  };

  return (
  <>
    <Navbar> </Navbar>   
    <div style={{width: "100vw", height: "100vh", position: "absolute", top: "0px", backgroundColor: "#441752", zIndex: -1}}>
      <ul style={{width: "50vw", height: "85vh", overflowY: "scroll", overflowX: "hidden", position: "absolute", right: "8vw", top: "10vh"}} class = "\
      [&>*]:w-auto [&>*]:h-36 [&>*]:bg-white [&>*]:m-6 [&>*]:rounded-2xl" > {matches } </ul>
      <div style={{width: "30vw", height: "32vh", position: "absolute", left: "8vw", top: "12vh", backgroundColor: "white", borderRadius: "2rem"}}>

      <form class="max-w-md mx-auto mt-16">   
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50\
               focus:ring-blue-500 focus:border-blue-500" placeholder="Search match by club name" required ref = {keyName}/>
              <button type="button" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none\
               focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={searchByName} >Search</button>
          </div>
      </form>

      <form class="max-w-md mx-auto mt-2">
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <option selected>Choose a tournament</option>
          <option value="US">Tournament 1</option>
          <option value="CA">Tournament 1</option>
          <option value="FR">Tournament 1</option>
          <option value="DE">Tournament 1</option>
        </select>
      </form>



      </div>
    </div>

  </>
  );
}
  
export default Match;