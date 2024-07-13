import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import Preloader from '../Preloader/Preloader'
import DoctorHeader from '../Header/DoctorHeader'

const headerData = {
  "logo": "/images/logo.svg"
}

const footerData = {
  "logo": "/images/logo.svg",
  "bgImg": "/images/footer-bg.png",
  "subTitle": " Lorem ipsum dolor sit consectet adipisicing sed do eiusmod temp incididunt ut labore. Lorem Ipsum is simply dummy.",
}
const Layout2 = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);


  return (
    <>
      {
        isLoading ? <Preloader /> : (
          <>
            <DoctorHeader/>
            <Outlet />
            <Footer data={footerData} />
          </>
        )
      }
    </>
  )
}

export default Layout2;
