import Navbar from "../components/nav_standard"
import { useEffect } from "react"
import { useState } from "react";
import { useParams } from 'react-router';
import axios from 'axios';
import { Link } from "react-router-dom";

function Stat() {
  let [info, SetInfo] = useState(0);

  useEffect(() => {
    document.title = "Statistic";
    axios.get(`http://localhost:3001/topscorer/1`)
        .then(res => {
            let elist = [];
            for (let ele of res.data) {
                ele.name = ele.FirstName + ele.LastName;
                elist.push(ele);
            }

            // console.log(res);

            SetInfo(elist.map(ele => 
            <Link class = "relative bg-main-color hover:bg-purple-900" style={{width: "35vw", height: "50px", margin: "10px", display: "flex", alignItems: "center", paddingLeft: "\
            30px", borderRadius: "0.5rem"}} to = {"/detailplayer/" +  ele.PlayerID}>
                <span class = "w-10 font-medium text-white" > {ele.PlayerID} </span>
                <span class = "w-5 text-white" > | </span>
                <span class = "w-40 font-medium text-white" > {ele.name} </span>
                <span class = "w-16 text-white" >  </span>
                <span class = "w-32 text-white" > {ele.TotalGoals} Goal </span>
            </Link>
            ));
          });
        
  }, []);
  
  return (
  <>
    <Navbar> </Navbar>    
    {/* <div style={{width: "100vw", height: "100vh", position: "absolute", top: "0px", backgroundColor: "#441752", zIndex: -2}}></div> */}
    {/* <div style={{width: "100vw", height: "100vh", overflowY: "hidden"}} > */}
    <div class = "animate-slide" style={{width: "55vw", height: "fit-content", position: "absolute", top: "15vh", right: "0px", backgroundColor: "#441752", zIndex: -2}}>
      <h1 class = "text-white" style={{fontSize: "90px", fontWeight: "800", padding: "1rem", paddingLeft: "3rem"}}> TOP GOAL </h1>
      <ul style={{ width: "40vw", height: "auto", border: "solid 0px red", paddingLeft: "2rem", paddingBottom: "3rem"}} >
        {info}
      </ul>
    </div>

    <img src = "back2.jpg" style={{height: "100vh"}}/>
    

    {/* </div> */}
  </>
  );
}
  
export default Stat;