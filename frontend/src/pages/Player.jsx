import Navbar from "../components/nav_standard"
import { useEffect } from "react"
import { useState } from "react";
import { useRef } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function Player() {
  let [info, SetInfo] = useState(0);
  const input = useRef();
  const pos = useRef();
  const minA = useRef();
  const maxA = useRef();
  const minS = useRef();
  const maxS = useRef();
  const nRed = useRef();

  const fname = useRef();
  const lname = useRef();
  const posit = useRef();
  const sal = useRef();
  const bid = useRef();

  useEffect(() => {
    document.title = "Player";
    axios.get(`http://localhost:3001/players`)
      .then(res => {
        let elist = [];
        for (let ele of res.data) {
          ele.name = ele.FirstName + " " + ele.LastName;
          elist.push(ele);
        }

        // console.log(res);

        SetInfo(elist.map(ele => 
          <Link class = "relative bg-white hover:bg-purple-100" style={{width: "50vw", height: "50px", margin: "10px", display: "flex", alignItems: "center", paddingLeft: "\
          30px", borderRadius: "0.5rem"}} to = {"/detailplayer/" +  ele.PlayerID}>
            <span class = "w-10 font-medium text-main-color" > {ele.PlayerID} </span>
            <span class = "w-5 text-main-color" > | </span>
            <span class = "w-40 font-medium text-main-color" > {ele.name} </span>
            <span class = "w-32 text-main-color" >  </span>
            <span class = "w-32 text-main-color " > {ele.Age} </span>
            <span class = "w-40 text-main-color" > {ele.Position} </span>
            <span class = "w-32 text-main-color" > {ele.Salary} </span>
          </Link>
        ));
      });
  }, [])

  const getPlayerByKey = function () {
    let key_name = input.current.value;
    let key_pos = ( pos.current.value == 'Any' ? '': pos.current.value );
    let key_minA = ( minA.current.value ? minA.current.value : '0');
    let key_minS = ( minS.current.value ? minS.current.value : '0');
    let key_maxA = ( maxA.current.value ? maxA.current.value : '100');
    let key_maxS = ( maxS.current.value ? maxS.current.value : '100000000');
    let key_nRed = ( nRed.current.value ? nRed.current.value : '0');

      let rq = "http://localhost:3001/searchPlayer/?";
      if(key_name) rq += "&name=" + key_name;
      if(key_pos) rq += "&position=" + key_pos;
      if(key_minA) rq += "&min_age=" + key_minA;
      if(key_minS) rq += "&min_salary=" + key_minS;
      if(key_maxA) rq += "&max_age=" + key_maxA;
      if(key_maxS) rq += "&max_salary=" + key_maxS;
      if(key_nRed) rq += "&numred=" + key_nRed;

      console.log(rq);

      axios.get(rq)
      .then(res => {
        let elist = [];
        for (let ele of res.data) {
          ele.name = ele.FullName;
          elist.push(ele);
        }

        console.log(res.data.length);

        SetInfo(elist.map(ele => 
          <Link class = "relative bg-white hover:bg-purple-100" style={{width: "50vw", height: "50px", margin: "10px", display: "flex", alignItems: "center", paddingLeft: "30px\
            ", borderRadius: "0.5rem"}} to = {"/detailplayer/" +  ele.PlayerID} >
            <span class = "w-10 font-medium main-color" > {ele.PlayerID} </span>
            <span class = "w-5 main-color" > | </span>
            <span class = "w-40 font-medium main-color" > {ele.name} </span>
            <span class = "w-32 main-color" >  </span>
            <span class = "w-32 main-color " > {ele.Age} </span>
            <span class = "w-40 main-color" > {ele.Position} </span>
            <span class = "w-32 main-color" > {ele.Salary} </span>
          </Link>
        ));
      });
  };

  const showInsert = function () {
    document.getElementById("backfill").style.display = "block";
    document.getElementById("fillbox").style.display = "block";
};

  const closeTab = function () {
    document.getElementById("backfill").style.display = "none";
    document.getElementById("fillbox").style.display = "none";
  };

  const submitInsert = function () {
    axios({
      method: 'post',
      url: "http://localhost:3001/insertPlayer",
      headers: {}, 
      data: {
        Salary: sal.current.value,
        Birthday: bid.current.value,
        FirstName: fname.current.value,
        LastName: lname.current.value,
        Position: posit.current.value
      }
    }).then(res => {
      alert("Add player successfully");
    }).catch(error => {
      alert(error.response.data.message);
    });

    closeTab();
  };
  
  return (
  <>
    <Navbar> </Navbar>    

    <div style={{width: "100vw", height: "100vh", position: "absolute", top: "0px", backgroundColor: "#441752", zIndex: -1}}></div>
    <div id = "backfill" style={{width: "100vw", height: "92vh", backgroundColor: "rgb(57, 19, 57, 0.6)", position: "absolute", zIndex: 1, display: "none"}} onClick={closeTab} >  </div>
        <div id = "fillbox" class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg" style={{position: "absolute", left: "30vw", top: "20vh", zIndex: 2, width: "50vw", display: "none"}} >
            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Player infomation
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-main-color">
                    Details and informations about user.
                </p>
            </div>
            <div class="border-t border-gray-200">
                <dl>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-main-color">
                            First name
                        </dt>
                        <input type = "text" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 p-2" placeholder="Tran" ref = {fname} />
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-main-color">
                            Last name
                        </dt>
                        <input type = "text" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 p-2" placeholder="John" ref = {lname} />
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-main-color">
                            Position
                        </dt>
                        <input type = "text" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 p-2" placeholder="Defender" ref = {posit} />
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-main-color">
                            Salary
                        </dt>
                        <input type = "text" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 p-2" placeholder="1000000" ref = {sal} />
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-main-color">
                            Birth Day
                        </dt>
                        <input type = "text" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 p-2" placeholder="YYYY-MM-DD" ref = {bid} />
                    </div>
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5\
                     me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800\
                     " style={{marginLeft: "20px", height: "40px", marginBottom: "40px"}} onClick={submitInsert} > Submit</button>
                </dl>
            </div>
        </div>

    <div style={{width: "30vw", height: "80vh", border: "solid 0px red", borderRadius: "1rem", position: "absolute", marginTop: "5vh", marginLeft: "3vw"}} class = "bg-white" >
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
      <select id="selectpos" class="bg-gray-50 border-2 border-main-color text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full max-w-md mx-auto p-2.5" ref = {pos}>
        <option value="Any" selected>Choose a position</option>
        <option value="Goalkeeper">Goalkeeper</option>
        <option value="Midfielder">Midfielder</option>
        <option value="Forward">Forward</option>
        <option value="Defender">Defender</option>
      </select>
    </form>

    <div class="mx-auto mt-8" style={{paddingLeft: "60px"}}>
      <span style={{display: "inline-block", width: "8vw"}} > Age Range: </span>
      <input type="text" class=" w-20 outline-none bg-white border border-main-color rounded-lg text-gray-600 text-sm px-4 py-2" ref= {minA} placeholder="0" />
      <span> -- </span>
      <input type="text" class=" w-20 outline-none bg-white border border-main-color rounded-lg text-gray-600 text-sm px-4 py-2" ref = {maxA} placeholder="100" />
    </div>

    <div class="mx-auto mt-8" style={{paddingLeft: "60px"}}>
      <span style={{display: "inline-block", width: "8vw"}} > Salary Range: </span>
      <input class=" w-20 outline-none bg-white border border-main-color rounded-lg text-gray-600 text-sm px-4 py-2" ref = {minS} placeholder="0" />
      <span> -- </span>
      <input class=" w-20 outline-none bg-white border border-main-color rounded-lg text-gray-600 text-sm px-4 py-2" ref = {maxS} placeholder="1000000" />
    </div>

    <div class="mx-auto mt-8" style={{paddingLeft: "60px"}}>
      <span style={{display: "inline-block", width: "8vw"}} > Number of redcard: </span>
      <input class=" w-20 outline-none bg-white border border-main-color rounded-lg text-gray-600 text-sm px-4 py-2" ref = {nRed} placeholder="0" />
    </div>

    <button type="button" class="text-white bg-main-color focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2\
    hover:bg-purple-900" style={{margin: "3vw", height: "40px", width: "18vw"}} onClick={showInsert} > Add player </button>

    </div>

    <div style={{width: "55vw", height: "70vh", border: "solid 0px red", position: "absolute", right: "8vw", top: "10vh"}}>
    <h1 class = "text-white" style={{fontSize: "40px", fontWeight: "800", paddingLeft: "3.5vw"}}> Player List </h1>
    <Link class = "relative" style={{width: "50vw", height: "50px", margin: "10px", display: "flex", alignItems: "center", paddingLeft: "3.5vw", borderRadius: "0.5rem"}}>
            <span class = "w-10 font-medium text-white" > ID </span>
            <span class = "w-5 text-white" > | </span>
            <span class = "w-40 font-medium text-white" > Name </span>
            <span class = "w-32 font-medium text-white" >  </span>
            <span class = "w-32 font-medium text-white " > Age </span>
            <span class = "w-40 font-medium text-white" > Position </span>
            <span class = "w-32 font-medium text-white" > Salary </span>
    </Link>
    <ul style={{width: "55vw", height: "68vh", border: "solid 0px red", overflowY: "scroll", paddingLeft: "2rem"}} >
      {info}
    </ul>
    </div>
  </>
  );
}
  
export default Player;