import Navbar from "../components/nav"
import { useEffect } from "react"

const Home = () => {
  useEffect(() => {
    document.title = "Football tournament"
  }, [])

  return (
    <>
      <Navbar> </Navbar>    
      <div class='image-slider-wrapper' >
        <img src='./wall5.jpg' style={{width: 100 + 'vw', height: 100 + 'vh', overflow: "hidden", position: "absolute", top: 0 + 'px', zIndex: -1}} alt = ""/>
        <h1 style={{fontSize: 60 + 'px', position: "absolute", bottom: 80 + 'px', right: 40 + 'px',  zIndex: 1, fontWeight: "700", color: "rgb(217, 217, 217)"}}> Football Tournament </h1>
        <h1 style={{fontSize: 45 + 'px', position: "absolute", bottom: 30 + 'px', right: 40 + 'px',  zIndex: 1, fontWeight: "400", color: "rgb(217, 217, 217)"}}> The best sport </h1>
        <div style={{position: "absolute", bottom: 0 + 'px', right: 0 + 'px', width: "100vw", height: "92vh", backgroundImage: "linear-gradient(to top left, rgb(26, 0, 26), rgba(26, 0, 26, .6), rgba(26, 0, 26, .45), rgba(26, 0, 26, .2) ,rgba(51, 0, 51, .0))", zIndex: 0}} > </div>
        <div style={{position: "absolute", bottom: 0 + 'px', right: 0 + 'px', width: "100vw", height: "30vh", backgroundImage: "linear-gradient(to top, rgb(26, 0, 26), rgba(51, 0, 51, .0))", zIndex: 0}} > </div>
      </div>
    </>
  )
};

export default Home;