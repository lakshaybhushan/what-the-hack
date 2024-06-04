import Image from "next/image"
import hackerNewsLogo from "../public/hackerNews.png"

const Heading = () => {
  return (
    <section className="flex flex-col items-center justify-center pt-12 sm:pt-24 px-4 text-center">
      <Image
        src={hackerNewsLogo}
        alt="HackerNews Logo"
        width={75}
        height={75}
        className="rounded-xl mb-6 w-auto h-auto"
        priority
      />

      <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter">
        <span className="text-orange-500">HackerNews</span> Comments Summarizer
      </h1>
      <p className="pt-1.5 text-lg sm:text-xl">
        Summarize the top comments on HackerNews using Cloudflare Workers AI
      </p>
    </section>
  )
}

export default Heading
