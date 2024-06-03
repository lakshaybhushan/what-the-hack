"use client"
import { handleURL } from "@/app/actions"
import { useState } from "react"

export default function InputForm() {
  const [summarized, setSummarized] = useState<string>("")

  return (
    <div className="w-full my-10 flex flex-col items-center justify-center">
      <form
        action={async (e) => {
          const response = await handleURL(e)
          setSummarized(response)
        }}
        className="flex flex-col items-center">
        <input
          type="text"
          name="hnUrl"
          placeholder="https://news.ycombinator.com/item?id="
          className="border border-gray-300 p-4 rounded-xl text-slate-100 bg-black w-[60vw]"
        />
        <button
          type="submit"
          className="bg-white text-black p-2 rounded-md w-64 mt-8">
         Summarize
        </button>
      </form>

      {summarized ? (
        <div className="w-full mt-8 p-4 bg-gray-800 text-white rounded-md">
          <p className="text-xl">{summarized}</p>
        </div>
      ) : (
        <>
          <div className="w-full mt-8 p-4 bg-gray-800 text-white rounded-md">
            <p className="text-xl">
                Hey! It&apos;s great to see you here. Enter a URL from HackerNews to get started. 🚀
            </p>
          </div>
        </>
      )}
    </div>
  )
}
