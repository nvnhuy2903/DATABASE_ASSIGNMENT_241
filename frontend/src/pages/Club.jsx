import Navbar from "../components/nav_standard";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function Club() {
  let [info, SetInfo] = useState(0);
  const input = useRef();

  useEffect(() => {
    document.title = "Player";
    axios.get(`http://localhost:3001/clubs`)
      .then(res => {
        let elist = [];
        for (let ele of res.data) {
          elist.push(ele);
        }

        // console.log(res);

        SetInfo(elist.map(ele => 
          <Link class = "relative bg-main-color hover:bg-purple-900" style={{width: "50vw", height: "50px", margin: "10px", display: "flex", alignItems: "center", paddingLeft: "\
          30px", borderRadius: "0.5rem"}} to = {"/detailclub/" +  ele.ClubID}>
            <span class = "w-10 font-medium text-white" > {ele.ClubID} </span>
            <span class = "w-5 text-white" > | </span>
            <img class = "w-10"  style={{display: "inline-block", height: "1.5rem", width: "1.5rem", marginRight: "0.5rem"}} src = {ele.Name + ".png"} alt = ""/>
            <span class = "w-40 font-medium text-white" > {ele.Name} </span>
            <span class = "w-32 text-white" >  </span>
          </Link>
        ));
      });
  }, [])
  
  return (
  <>
    <Navbar> </Navbar>    

    {/* <div style={{width: "100vw", height: "100vh", position: "absolute", top: "0px", backgroundColor: "#441752", zIndex: -1}}></div> */}
    {/* <div style={{width: "30vw", height: "80vh", border: "solid 0px red", borderRadius: "1rem", position: "absolute", marginTop: "5vh", marginLeft: "3vw", backgroundColor: "rgb(221 214 254)"}}>
      <div class="flex rounded-md border-2 border-main-color overflow-hidden max-w-md mx-auto font-[sans-serif] mt-16">
          <input type="email" placeholder="Search for player..."
            class="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3" ref={input} />
          <button type='button' class="flex items-center justify-center bg-main-color px-5" onClick={getPlayerByKey} >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" class="fill-white" >
              <path
                d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
              </path>
            </svg>
          </button>
      </div>
      
    <form class="mx-auto mt-8">
      <select id="selectpos" class="bg-gray-50 border-2 border-main-color text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full max-w-md mx-auto p-2.5">
        <option value="Any" selected>Choose a position</option>
        <option value="Goalkeeper">Goalkeeper</option>
        <option value="Midfielder">Midfielder</option>
        <option value="Forward">Forward</option>
        <option value="Defender">Defender</option>
      </select>
    </form>

    <div class="mx-auto mt-8" style={{paddingLeft: "60px"}}>
      <span style={{display: "inline-block", width: "8vw"}} > Age Range: </span>
      <input type="text" class=" w-20 outline-none bg-white border border-main-color rounded-lg text-gray-600 text-sm px-4 py-2" />
      <span> -- </span>
      <input type="text" class=" w-20 outline-none bg-white border border-main-color rounded-lg text-gray-600 text-sm px-4 py-2" />
    </div>

    <div class="mx-auto mt-8" style={{paddingLeft: "60px"}}>
      <span style={{display: "inline-block", width: "8vw"}} > Salary Range: </span>
      <input class=" w-20 outline-none bg-white border border-main-color rounded-lg text-gray-600 text-sm px-4 py-2" />
      <span> -- </span>
      <input class=" w-20 outline-none bg-white border border-main-color rounded-lg text-gray-600 text-sm px-4 py-2" />
    </div>

    </div> */}

    <div style={{width: "55vw", height: "70vh", border: "solid 0px red", position: "absolute", right: "20vw", top: "10vh"}}>
    <h1 class = "text-main-color" style={{fontSize: "40px", fontWeight: "800", paddingLeft: "3.5vw", marginBottom: "4vh", marginTop: "3vh"}}> Club List </h1>
    {/* <Link class = "relative" style={{width: "50vw", height: "50px", margin: "10px", display: "flex", alignItems: "center", paddingLeft: "3.5vw", borderRadius: "0.5rem"}}>
            <span class = "w-10 font-medium text-main-color" > ID </span>
            <span class = "w-5 text-main-color" > | </span>
            <span class = "w-40 font-medium text-main-color" > Name </span>
    </Link> */}
    <ul style={{width: "55vw", height: "68vh", border: "solid 0px red", overflowY: "scroll", paddingLeft: "2rem"}} >
      {info}
    </ul>
    </div>
  </>
  );
}
  
export default Club;