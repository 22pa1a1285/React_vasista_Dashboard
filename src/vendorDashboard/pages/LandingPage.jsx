import React,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProduct from '../components/AllProduct'

const LandingPage = () => {
  const [showLogin,setshowLogin] = useState(false)
  const [showRegister,setshowRegister] = useState(false)
  const [showFirm,setshowFirm] = useState(false)
  const [showProduct,setshowProduct]=useState(false)
  const [showWelcome,setshowWelcome] = useState(false)
  const [showAllProducts,setShowAllProducts]= useState(false);
  const [showLogOut , setShowLogOut] = useState(false);
  const [showFirmTitle , setShowFirmTitle] = useState(true);


  useEffect(()=>{
    const loginToken  = localStorage.getItem('loginToken')
    if(loginToken){
      setShowLogOut(true)
    }

  },[])

  useEffect(()=>{
    const firmName = localStorage.getItem('firmName');
    if(firmName){
      setShowFirmTitle(false)
    }
  },[])
  
  const logOutHandler = ()=>{
    confirm("Are U Sure to LogOut?")
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId');
    localStorage.removeItem('firmName');
    setShowLogOut(false)
    setShowFirmTitle(true)

  }

  const showLoginHandler =()=>{
    setshowLogin(true)
    setshowRegister(false)
    setshowFirm(false)
    setshowProduct(false)
    setshowWelcome(false)
    setShowAllProducts(false)
  }
  const showRegisterHandler = ()=>{
    setshowRegister(true)
    setshowLogin(false)
    setshowFirm(false)
    setshowProduct(false)
    setshowWelcome(false)
    setShowAllProducts(false)
  }

  const showFirmHandler = ()=>{
    if(showLogOut){
    setshowRegister(false)
    setshowLogin(false)
    setshowFirm(true)
    setshowProduct(false)
    setshowWelcome(false)
    setShowAllProducts(false)
    }else{
      alert("please login")
      setshowLogin(true)
    }
  }
  const showProductHandler = ()=>{
    if(showLogOut){
    setshowRegister(false)
    setshowLogin(false)
    setshowFirm(false)
    setshowProduct(true)
    setshowWelcome(false)
    setShowAllProducts(false)
    }else{
      alert("please login")
      setshowLogin(true)
    }
  }
  const showWelcomeHandler = ()=>{
    setshowRegister(false)
    setshowLogin(false)
    setshowFirm(false)
    setshowProduct(false)
    setshowWelcome(true)
    setShowAllProducts(false);
  }
  const showAllProductsHandler = ()=>{
    if(showLogOut){
    setshowRegister(false)
    setshowLogin(false)
    setshowFirm(false)
    setshowProduct(false)
    setshowWelcome(false)
    setShowAllProducts(true);
    }else{
      alert("please login")
      setshowLogin(true)
    }
  }

  return (
    <>
    <section className='landingsection'>
        <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogOut={showLogOut}
        logOutHandler={logOutHandler}/>
        <div className="collectionsection">
        <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler}
        showAllProductsHandler = {showAllProductsHandler} showFirmTitle={showFirmTitle}/>
        {showLogin && <Login showWelcomeHandler={showWelcomeHandler}/>}
        {showRegister && <Register showLoginHandler={showLoginHandler}/>}
        {showFirm && showLogOut && <AddFirm/> }
        {showProduct && showLogOut && <AddProduct/>}
        {showWelcome && <Welcome/>}
        {showAllProducts  && showLogOut && <AllProduct/>}
        </div>
    </section>
    </>
  )
}

export default LandingPage