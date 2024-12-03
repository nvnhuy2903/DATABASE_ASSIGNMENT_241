import Navbar from "../components/nav_standard"
import { useEffect } from "react"
import { useState } from "react";
import { useParams } from 'react-router';
import axios from 'axios';
import { Link } from "react-router-dom";

function DetailClub() {
    let [matches, SetM] = useState();
    let [info, SetInfo] = useState(0);
    let [Cinfo, SetCInfo] = useState(0);
    let [clubname, setClubName] = useState();
    const { id } = useParams();

    useEffect(() => {
        // console.log("XX");
        document.title = "Detail Club";
        axios.get(`http://localhost:3001/clubs`)
        .then(res => {
            for (let ele of res.data) {
                if(ele.ClubID == id) {
                    setClubName(
                        <h1 class = "text-main-color" style={{fontSize: "90px", fontWeight: "800"}}> {ele.Name} </h1>
                    );
                    break;
                }
            }
        });

        axios.get(`http://localhost:3001/getPlayer/` + id)
        .then(res => {
            let elist = [];
            for (let ele of res.data[0]) {
                ele.name = ele.FullName;
                elist.push(ele);
            }
            
            for (let ele of res.data[1]) {
                ele.name = ele.FullName;
                elist.push(ele);
            }

            // console.log(res);

            SetInfo(elist.map(ele => 
            <Link class = "relative bg-main-color hover:bg-purple-900" style={{width: "35vw", height: "50px", margin: "10px", display: "flex", alignItems: "center", paddingLeft: "\
            30px", borderRadius: "0.5rem"}} to = {"/detailplayer/" +  ele.PlayerID}>
                <span class = "w-10 font-medium text-white" > {ele.PlayerID} </span>
                <span class = "w-5 text-white" > | </span>
                <span class = "w-32 font-medium text-white" > {ele.name} </span>
                <span class = "w-16 text-white" >  </span>
                <span class = "w-32 text-white " > {ele.Age} </span>
                <span class = "w-40 text-white" > {ele.Position} </span>
                <span class = "w-32 text-white" > {ele.Salary} </span>
            </Link>
            ));
        });

        axios.get(`http://localhost:3001/getCoaches/` + id)
        .then(res => {
            let elist = [];
            for (let ele of res.data) {
                elist.push(ele);
            }
            
            // console.log(res);

            SetCInfo(elist.map(ele => 
            <Link class = "relative bg-main-color hover:bg-purple-900" style={{width: "35vw", height: "50px", margin: "10px", display: "flex", alignItems: "center", paddingLeft: "\
            30px", borderRadius: "0.5rem"}}>
                <span class = "w-10 font-medium text-white" > {ele.CoachID} </span>
                <span class = "w-5 text-white" > | </span>
                <span class = "w-32 font-medium text-white" > {ele.CoachName} </span>
                <span class = "w-16 text-white" >  </span>
                <span class = "w-32 text-white " > {ele.ExperienceYears} </span>
                <span class = "w-40 text-white" > {ele.CoachType} </span>
                <span class = "w-32 text-white" > {ele.Salary} </span>
            </Link>
            ));
        });
    }, []);
  


    return (
    <>
        <Navbar> </Navbar>    
        <div style={{width: "100vw", alignItems: "center", justifyContent: "center", display: "flex"}} > {clubname} </div>
        <div style={{width: "40vw", height: "70vh", border: "solid 0px red", position: "absolute", left: "5vw", top: "20vh"}}>
            <h1 class = "text-main-color" style={{fontSize: "40px", fontWeight: "800", paddingLeft: "3.5vw"}}> Player List </h1>
            <Link class = "relative" style={{width: "40vw", height: "50px", margin: "10px", display: "flex", alignItems: "center", paddingLeft: "3vw", borderRadius: "0.5rem"}}>
                <span class = "w-10 font-medium text-main-color" > ID </span>
                <span class = "w-5 text-main-color" > | </span>
                <span class = "w-32 font-medium text-main-color" > Name </span>
                <span class = "w-16 font-medium text-main-color" >  </span>
                <span class = "w-32 font-medium text-main-color " > Age </span>
                <span class = "w-40 font-medium text-main-color" > Position </span>
                <span class = "w-32 font-medium text-main-color" > Salary </span>
            </Link>
            <ul style={{width: "40vw", height: "50vh", border: "solid 0px red", overflowY: "scroll", paddingLeft: "2rem"}} >
                {info}
            </ul>
        </div>

        <div style={{width: "40vw", height: "70vh", border: "solid 0px red", position: "absolute", right: "5vw", top: "20vh"}}>
            <h1 class = "text-main-color" style={{fontSize: "40px", fontWeight: "800", paddingLeft: "3.5vw"}}> Coach List </h1>
            <Link class = "relative" style={{width: "40vw", height: "50px", margin: "10px", display: "flex", alignItems: "center", paddingLeft: "3vw", borderRadius: "0.5rem"}}>
                <span class = "w-10 font-medium text-main-color" > ID </span>
                <span class = "w-5 text-main-color" > | </span>
                <span class = "w-32 font-medium text-main-color" > Name </span>
                <span class = "w-16 font-medium text-main-color" >  </span>
                <span class = "w-32 font-medium text-main-color " > Exp. Year </span>
                <span class = "w-40 font-medium text-main-color" > Type </span>
                <span class = "w-32 font-medium text-main-color" > Salary </span>
            </Link>
            <ul style={{width: "40vw", height: "50vh", border: "solid 0px red", overflowY: "scroll", paddingLeft: "2rem"}} >
                {Cinfo}
            </ul>
        </div>
    </>
    );
}
  
export default DetailClub;