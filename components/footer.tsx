import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bottom-0 mt-auto flex flex-col md:flex-row w-full items-center justify-center md:justify-between border-t-2 p-4 md:p-8 text-xs md:text-sm font-light border-primary/20">
      <p className="text-primary/90 mb-2 md:mb-0">
        Brought to you by{" "}
        <Link
          href="https://lakshb.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4 transition duration-150 ease-linear md:hover:text-primary/70"
        >
          lakshaybhushan
        </Link>
      </p>

      <p className="text-primary/90">
        Built with{" "}
        <Link
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4 transition duration-150 ease-linear md:hover:text-primary/70"
        >
          Nextjs
        </Link>
        ,{" "}
        <Link
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4 transition duration-150 ease-linear md:hover:text-primary/70"
        >
          Tailwind CSS
        </Link>
        , &amp;{" "}
        <Link
          href="https://ai.cloudflare.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4 transition duration-150 ease-linear md:hover:text-primary/70"
        >
          Cloudflare Workers AI
        </Link>
      </p>
    </footer>
  );
};

export default Footer;