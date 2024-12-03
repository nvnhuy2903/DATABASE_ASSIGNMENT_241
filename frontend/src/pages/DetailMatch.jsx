import Navbar from "../components/nav_standard"
import { useEffect } from "react"
import { useState } from "react";
import { useParams } from 'react-router';
import axios from 'axios';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";


function DtMatch() {
    let navigate = useNavigate();
    let [line1, SetL1] = useState(0);
    let [line2, SetL2] = useState(0);
    let [info, SetInfo] = useState(0);
    let [infoRef, SetRef] = useState(0);
    let [sName, SetSname] = useState(0);
    let [sAdd, SetSadd] = useState(0);
    let [sCap, SetScap] = useState(0);

    const { id } = useParams();
    const newD = useRef();

    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        document.title = "Detail Match";
        axios.get(`http://localhost:3001/getDetailMatch/` + id)
        .then(res => {
            // console.log(res.data);
            let elist = [];
            for (let ele of res.data) {
                if(ele.EventType == "Substitute") {
                    if(ele.isOut) ele.des = ele.PlayerFirstName + " " + ele.PlayerLastName + " is out!";
                    else ele.des = ele.PlayerFirstName + " " + ele.PlayerLastName + " is in!";
                } else if(ele.EventType == "Goal") ele.des = ele.PlayerFirstName + " " + ele.PlayerLastName + " has scored a "+ ele.GoalType +" goal!!";
                else if(ele.EventType == "RedCard") ele.des = ele.PlayerFirstName + " " + ele.PlayerLastName + " has received a red card!";
                else ele.des = ele.PlayerFirstName + " " + ele.PlayerLastName + " has received a yellow card!";
                elist.push(ele);
            }

            SetInfo(elist.map(ele => 
                <li class="ms-4 mb-10">
                    <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-200 dark:bg-gray-100"></div>
                    <time class="mb-1 text-sm font-normal leading-none text-gray-400" >Minute {ele.EventTime}</time>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white"> {ele.EventType} </h3>
                    <p class="text-base font-normal text-gray-500 dark:text-gray-400"> {ele.des} </p>
                </li>
            ));
        });

        axios.get(`http://localhost:3001/getLineup/` + id)
        .then(res => {
            // console.log(res.data);
            let elist1 = [];
            let elist2 = [];
            for (let ele of res.data) {
                if(ele.IsCaptain) ele.PlayerName += " - Captain";
                if(ele.Team == "Home") elist1.push(ele);
                else elist2.push(ele);
            }

            SetL1(elist1.map(ele => 
            <li display = "block" style={{width: "35vw", height: "30px", border: "solid gray", borderWidth: "0px 0px 1px 0px", margin: "10px"}}>
                <span style={{marginLeft: "20px", width: "40px", display: "inline-block", fontWeight: "500"}} > {ele.PlayerID} </span>
                <span style={{marginLeft: "20px", width: "16vw", display: "inline-block", fontWeight: "500"}} > {ele.PlayerName} </span>
                <span style={{marginLeft: "20px", width: "10vw", display: "inline-block"}} > {ele.PlayerPosition} </span>
            </li>));


            SetL2(elist2.map(ele => 
            <li display = "block" style={{width: "35vw", height: "30px", border: "solid gray", borderWidth: "0px 0px 1px 0px", margin: "10px"}}>
                <span style={{marginLeft: "20px", width: "40px", display: "inline-block", fontWeight: "500"}} > {ele.PlayerID} </span>
                <span style={{marginLeft: "20px", width: "16vw", display: "inline-block", fontWeight: "500"}} > {ele.PlayerName} </span>
                <span style={{marginLeft: "20px", width: "10vw", display: "inline-block"}} > {ele.PlayerPosition} </span>
            </li>));

        });
        
        axios.get(`http://localhost:3001/getReferee/` + id)
        .then(res => {
            let elist = [];
            let i = 1;
            for (let ele of res.data) {
                ele.i = i; i++;
                ele.name = ele.Name;
                elist.push(ele);
            }

            // console.log(res);

            SetRef(elist.map(ele => 
            <li class = "relative" style={{width: "35vw", height: "50px", margin: "10px", display: "flex", alignItems: "center", paddingLeft: "\
            30px", borderRadius: "0.5rem"}}>
                <span class = "w-10 font-medium text-white" > {ele.i} </span>
                <span class = "w-5 text-white" > | </span>
                <span class = "w-40 font-medium text-white" > {ele.name} </span>
                <span class = "w-16 text-white" >  </span>
                <span class = "w-32 text-white" > {ele.position} </span>
            </li>
            ));
          });

          axios.get(`http://localhost:3001/getStadium/` + id)
          .then(res => {
                SetSname(res.data[0].Name);
                SetSadd(res.data[0].Address);
                SetScap(res.data[0].Capacity);
            });
    }, [])

    const updateMatch = function () {
        if(!newD.current.value) return;
        if(!window.confirm("Are you sure to change this match to date " +  newD.current.value)) return;
        axios({
            method: 'post',
            url: "http://localhost:3001/updateMatch",
            headers: {}, 
            data: {
                Id: id,
                newdate: newD.current.value
            }
          }).then(res => {
            alert("Change match's date successfully");
            
          }).catch(error => {
            alert(error.response.data.message);
          });
    };

    const deleteMatch = function () {
        window.confirm("Are you sure to delete this match in database");
        axios({
            method: 'post',
            url: "http://localhost:3001/deleteMatch",
            headers: {}, 
            data: {
                Id: id,
            }
          }).then(res => {
            alert("Delete successfully");
            navigate("/match");
          }).catch(error => {
            alert(error.response.data.message);
          });
    }

    return (
    <>
        <Navbar> </Navbar>    
        <div style={{height: "95vh", border: "solid 0px red"}}>
        <div style={{position:"relative", top: "7vh", left: "8vw", border: "solid 1px gray", width: "fit-content", borderRadius: "10px"}}>
            <h1 class = "m-4 text-2xl font-bold" > Home Team </h1>
            <ul >
                <li display = "block" style={{paddingTop: "10px", width: "35vw", height: "40px", border: "solid gray", borderWidth: "0px 0px 1px 0px", margin: "10px", backgroundColor: "#f2f2f2"}}>
                    <span style={{marginLeft: "20px", width: "40px", display: "inline-block", fontWeight: "700"}} > ID </span>
                    <span style={{marginLeft: "20px", width: "16vw", display: "inline-block", fontWeight: "700"}} > Name </span>
                    <span style={{marginLeft: "20px", width: "10vw", display: "inline-block", fontWeight: "700"}} > Position </span>
                </li>
                {line1} 
            </ul>
        </div>
        
        <div style={{position:"relative", top: "12vh", left: "8vw", border: "solid 1px gray", width: "fit-content", borderRadius: "10px"}}>
            <h1 class = "m-4 text-2xl font-bold" > Away Team </h1>
            <ul >
                <li display = "block" style={{paddingTop: "10px", width: "35vw", height: "40px", border: "solid gray", borderWidth: "0px 0px 1px 0px", margin: "10px", backgroundColor: "#f2f2f2"}}>
                    <span style={{marginLeft: "20px", width: "40px", display: "inline-block", fontWeight: "700"}} > ID </span>
                    <span style={{marginLeft: "20px", width: "16vw", display: "inline-block", fontWeight: "700"}} > Name </span>
                    <span style={{marginLeft: "20px", width: "10vw", display: "inline-block", fontWeight: "700"}} > Position </span>
                </li>
                {line2} 
            </ul>
        </div>
        <img src="https://i.ibb.co/w0S30YD/bbb.jpg" alt = "hello" style={{position: "absolute", top: "20vh", right: "10vw", width: "40rem", height: "28rem", borderRadius: "1.5rem"}} />
        
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 \
        dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" style={{margin: "10vh", marginRight: "1vw\
            ", position: "absolute", right: "33vw", top: "60vh", height: "50px"}} onClick={updateMatch} >Change match date</button>

        <input type = "text" style={{position: "absolute", right: "20vw", top: "70vh", height: "50px", width: "13vw", border: "solid 1px gray\
        ", borderRadius: "7px", paddingLeft: "10px"}} placeholder="YYYY-MM-DD" ref = {newD} />

        <button type="button" class="text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2\
        " style={{margin: "10vh", marginRight: "1vw\
            ", position: "absolute", right: "33vw", top: "67vh", height: "50px"}} onClick ={deleteMatch} >Delete this match!!!</button>
        
        </div>

        
        <div style={{width: "100vw", height: "fit-content", backgroundColor: "#441752", zIndex: 1, marginBottom: "10vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <h1 class = "text-white" style={{fontSize: "90px", fontWeight: "800", padding: "1rem", paddingLeft: "3rem"}}> REFEREE </h1>
        <ul style={{ height: "auto", border: "solid 0px red", paddingLeft: "17rem", paddingBottom: "3rem"}} >
           {infoRef}
        </ul>
        </div>

        <div style={{width: "100vw", height: "fit-content", backgroundColor: "white", zIndex: 1, marginBottom: "10vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <h1 class = "text-main-color" style={{fontSize: "90px", fontWeight: "800", padding: "1rem"}}> {sName} </h1>
            <h1 class = "text-main-color" style={{fontSize: "40px", fontWeight: "800", padding: "1rem"}}> Addr: {sAdd} </h1>
            <h1 class = "text-main-color" style={{fontSize: "40px", fontWeight: "800", padding: "1rem"}}> Capacity: {sCap} people </h1>
        </div>

        <div style={{width: "100vw", height: "auto", minHeight: "140vh"}} class = "bg-main-color"> 
        <h1 class = "text-white" style={{fontSize: "90px", fontWeight: "800", paddingTop: "5rem", paddingLeft: "14rem"}}> Match progress </h1>
            <div style={{position: "relative", left: "55vw", width: "35vw", paddingTop: "10vh"}}>
                <img src="https://i.ibb.co/HVM4hWj/goal.jpg" alt="goal" border="0" style={{position: "absolute", right: "45vw", borderRadius: "1.5rem"}} />
                <img src="https://i.ibb.co/9cFZ4kJ/redc.jpg" alt="redc" border="0" style={{position: "absolute", right: "45vw", top: "50vh", borderRadius: "1.5rem", marginTop: "20vh"}} />
                <ol class="relative border-s border-gray-200 dark:border-gray-400" style={{position: "relative", top: "0vh", paddingBottom: "10vh", width: "35vw"}}>                  
                    {info}
                </ol>
            </div>
        </div>
    </>
  );
}
  
export default DtMatch;