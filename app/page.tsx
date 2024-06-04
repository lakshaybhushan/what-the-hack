"use client"

import React from "react"
import InputForm from "@/components/form"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col pt-24 pb-0">
      <section className="px-24">
        <h1 className="text-5xl font-bold tracking-tighter">
          <span className="text-orange-500">HackerNews</span> Comments
          summarizer
        </h1>
        <p className="pt-2 text-xl">
          Summarize the top comments on HackerNews using Cloudflare Workers AI
        </p>

        <div>
          <InputForm />
        </div>
      </section>

      <footer className="bottom-0 mt-auto flex w-screen items-center justify-center border-t-2 p-4 text-xs font-light md:w-full md:justify-start md:p-8 md:text-sm">
        <p>
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
    </main>
  )
}
