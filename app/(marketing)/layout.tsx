import React from "react"
import NavBar from "../_components/NavBar"
import { FooterLinks } from "../_components/users/Footer/Footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

const MarketingLayout: React.FC<MarketingLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <FooterLinks />
    </>
  )
}

export default MarketingLayout
