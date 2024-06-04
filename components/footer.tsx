import Link from "next/link"
import React from "react"

const Footer = () => {
  return (
    <footer className="bottom-0 mt-auto flex w-screen items-center justify-center border-t-2 p-4 text-xs font-light md:w-full md:justify-start md:p-8 md:text-sm border-gray-100">
      <p className="text-gray-400">
        Brought to you by{" "}
        <Link
          href="https://lakshb.dev"
          target="_blank"
          rel="noopenner noreferrer"
          className="font-medium underline underline-offset-4 transition duration-150 ease-linear md:hover:text-orange-500">
          lakshaybhushan
        </Link>
      </p>
    </footer>
  )
}

export default Footer
