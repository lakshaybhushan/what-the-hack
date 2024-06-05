import Image from "next/image"
import hackerNewsLogo from "../public/hackerNews.png"
import Link from "next/link"

const Heading = () => {
  return (
    <section className="flex flex-col items-center justify-center pt-12 sm:pt-24 px-4 text-center">
      <Image
        src={hackerNewsLogo}
        alt="Hacker News logo"
        width={96}
        height={96}
        className="rounded-xl shadow-xl shadow-primary/30 mb-6"
      />
      <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-2">
        What the Hack?!
      </h1>
      <p className="text-lg sm:text-xl text-gray-500 px-3">
        Get to know the top comments of a{" "}
        <Link
          href="https://news.ycombinator.com/"
          rel="noopenner noreferrer"
          target="_blank"
          className="font-medium underline underline-offset-4 transition duration-150 ease-linear md:hover:text-primary/70">
          Hacker News
        </Link>{" "}
        post in a glance!
      </p>
    </section>
  )
}

export default Heading
