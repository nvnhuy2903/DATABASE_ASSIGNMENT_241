import Navbar from "../components/nav_standard"
import { useEffect } from "react"
import { useState } from "react";
import { useParams } from 'react-router';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function DetailPlayer() {
    let navigate = useNavigate();

    let [infoName, SetInfo] = useState();
    let [Position, SetPosition] = useState();
    let [Salary, SetSalary] = useState();
    let [Age, SetAge] = useState();
    let [BD, SetBD] = useState();
    let [YellowCards, SetYellowCards] = useState();
    let [RedCards, SetRedCards] = useState();
    let [Goals, SetGoals] = useState();
    let [Club, SetClub] = useState();
    let [min, SetMin] = useState();
    const { id } = useParams();

    const fname = useRef();
    const lname = useRef();
    const posit = useRef();
    const sal = useRef();
    const bid = useRef();

    useEffect(() => {
        document.title = "Detail Player";
        axios.get(`http://localhost:3001/getInfo/` + id)
        .then(res => {
            // console.log(res.data);
            SetInfo(res.data[0].FullName);
            SetPosition(res.data[0].Position);
            SetSalary(res.data[0].Salary);
            SetAge(res.data[0].Age);
            SetYellowCards(res.data[0].YellowCards);
            SetRedCards(res.data[0].RedCards);
            SetGoals(res.data[0].Goals);
            SetBD((new Date(res.data[0].Birthday)).toString().slice(4,16));
        });

        axios.get(`http://localhost:3001/getMin/` + id)
        .then(res => {
            // console.log(res.data);
            SetMin(res.data);
        });

        axios.get(`http://localhost:3001/getHistory/` + id)
        .then(res => {
            // console.log(res.data);
            let elist = [];
            console.log(res);
            for (let ele of res.data[0]) {
                console.log(ele);
                elist.push(ele);
            }

            SetClub(elist.map(ele => 
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-main-color">
                        {ele.ClubName}
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {ele.ContractStart.slice(0,10)} to {ele.ContractEnd.slice(0,10)}
                    </dd>
                </div>
            ));
        });
    }, []);

    const showChange = function () {
        // alert("X");
        document.getElementById("backfill").style.display = "block";
        document.getElementById("fillbox").style.display = "block";
    };



    const closeTab = function () {
        document.getElementById("backfill").style.display = "none";
        document.getElementById("fillbox").style.display = "none";
      };
  
    const submitChange = function () {
        axios({
            method: 'post',
            url: "http://localhost:3001/updatePlayer",
            headers: {}, 
            data: {
              Id: id,
              Salary: sal.current.value,
              Birthday: bid.current.value,
              FirstName: fname.current.value,
              LastName: lname.current.value,
              Position: posit.current.value
            }
          }).then(res => {
            alert("Change player's infomation successfully");
            navigate("/detailplayer/" + id);
          }).catch(error => {
            alert(error.response.data.message);
          });

        closeTab();
    };

    const deletePlayer = function () {
        if(!window.confirm("Are you sure to delete this player?")) return;
        axios({
            method: 'post',
            url: "http://localhost:3001/deletePlayer",
            headers: {}, 
            data: {
              Id: id,
            }
          }).then(res => {
            alert("Delete player infomation successfully");
            navigate("/player");
          }).catch(error => {
            alert(error.response.data.message);
          });
    };

    return (
    <>
        <Navbar> </Navbar>   

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
                     " style={{marginLeft: "20px", height: "40px", marginBottom: "40px"}} onClick={submitChange} > Submit</button>
                </dl>
            </div>
        </div>

        {/* <img src="https://i.ibb.co/Vmk4cj2/shirt.png" alt="shirt" border="0" style={{position: "absolute", left: "7vw", top: "17vh"}} /> */}
        <div>
        <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg" style={{position: "relative", left: "5vw", top: "7vh"}} >
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
                            Full name
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {infoName}
                        </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-main-color">
                            Position
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {Position}
                        </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-main-color">
                            Salary
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            $ {Salary}
                        </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-main-color">
                            Birth Day
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {BD}
                        </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-main-color">
                            Yellow Cards
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {YellowCards}
                        </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-main-color">
                            Red Cards
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {RedCards}
                        </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-main-color">
                            Goals
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {Goals}
                        </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-main-color">
                            Minute play
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {min}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 \
        dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" style={{margin: "10vh", marginRight: "1vw"}} onClick = {showChange} >Change basic infomation</button>
        <button type="button" class="text-white bg-red-800 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2\
        " style={{margin: "10vh", marginLeft: "0"}} onClick = {deletePlayer} >Delete player!</button>
        </div>

        <div style={{position: "absolute", right: "20vw", top: "15vh"}}>
            <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg"  >
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Tranfer history
                    </h3>
                    <p class="mt-1 max-w-2xl text-sm text-main-color">
                        Details about player's club.
                    </p>

                    {Club}

                </div>
            </div>
            <div>
                
            </div>
        </div>
    </>
    );
}
  
export default DetailPlayer;