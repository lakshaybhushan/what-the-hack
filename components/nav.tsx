import Link from "next/link"
import React from "react"
import { FaGithub } from "react-icons/fa"

const Nav = () => {
  return (
    <nav className="flex ml-auto mr-4 pt-4 md:mr-10 md:pt-10">
      <Link
        href="https://github.com/lakshaybhushan/what-the-hack"
        rel="noopener noreferrer"
        target="_blank"
        className="font-medium transition duration-300 ease-linear flex items-center gap-3 bg-primary/10 px-6 py-4 rounded-full hover:bg-primary/30 hover:text-primary text-primary/80">
        <FaGithub className="text-xl" />
        <p className="text-sm hidden md:block">Open Source</p>
      </Link>
    </nav>
  )
}

export default Nav
