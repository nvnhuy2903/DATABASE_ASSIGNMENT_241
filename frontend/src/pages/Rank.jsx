import Navbar from "../components/nav_standard"
import { useEffect } from "react"
import { useState } from "react";
import axios from 'axios';

function Rank() {
  let [info, SetInfo] = useState();
  
  useEffect(() => {
    document.title = "Ranking";
    axios.get(`http://localhost:3001/getRank/1`)
      .then(res => {
        let elist = [];
        let ti = 1;
        for (let ele of res.data) {
          ele.top = ti;
          ti++;
          elist.push(ele);
        }

        SetInfo(elist.map(ele => 
          <li class = "relative" style={{width: "70vw", height: "50px", backgroundColor: "white", margin: "10px", display: "flex", alignItems: "center", paddingLeft: "30px"}}>
            <span class = "w-10 font-medium" > {ele.top} </span>
            <span class = "w-5" > | </span>
            <img class = "w-10"  style={{display: "inline-block", height: "1.5rem", width: "1.5rem", marginRight: "0.5rem"}} src = {ele.ClubName + ".png"} alt = ""/>
            <span class = "w-40 font-medium" > {ele.ClubName} </span>
            <span class = "w-32" >  </span>
            <span class = "w-32" > {ele.Wins} </span>
            <span class = "w-32" > {ele.Draws} </span>
            <span class = "w-32" > {ele.Losses} </span>
            <span class = "w-32" > {ele.GoalsAgainst} </span>
            <span class = "w-32" > {ele.GoalDifference} </span>
            <span class = "w-32 font-medium" > {ele.Points} </span>
          </li>
        ));
      });
  }, [])
  
  return (
  <>
    <Navbar> </Navbar>    
    <div style={{width: "100vw", height: "100vh", position: "absolute", top: "0px", backgroundColor: "#441752", zIndex: -1}}></div>
    <h1 style={{position: "absolute", right: "38vw", top: "10vh", fontSize: "100px", fontWeight: "800", color: "white"}}> RANKING </h1>
    
    <ul style={{width: "70vw", position: "absolute", right: "15vw", top: "30vh"}} class = "\
      [&>*]:w-auto [&>*]:h-36 [&>*]:bg-white [&>*]:rounded-md" >
      <li class = "relative" style={{width: "70vw", height: "50px", backgroundColor: "rgba(96, 32, 96, 0.5)", margin: "10px", display: "flex", alignItems: "center", paddingLeft: "30px", color: "white"}}>
            <span class = "w-16 font-medium" > Top </span>
            <span class = "w-32 font-medium" > Club Name </span>
            <span class = "w-44" >  </span>
            <span class = "w-32 font-medium" > Wins </span>
            <span class = "w-32 font-medium" > Draws </span>
            <span class = "w-28 font-medium" > Losses </span>
            <span class = "w-32 font-medium" > Goals Against </span>
            <span class = "w-36 font-medium" > Goal Difference </span>
            <span class = "w-32 font-medium" > Points </span>
          </li>
      {info} 
    </ul>
  </>
  );
}
  
export default Rank;