import InputForm from "@/components/form"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-24">
      <h1 className="font-bold text-6xl tracking-tighter">
        <span className="text-orange-500">HackerNews</span> Comments Summarizer
      </h1>

      <p className="text-xl pt-4">
        Summarize the top comments on HackerNews using AI 🧠
      </p>
      <InputForm />
      <footer className="mt-auto">
        <p className="text-center text-gray-500">
          Made with ❤️ by{" "}
          <a
            href="https://lakshb.dev"
            target="_blank"
            rel="noreferrer noopener"
            className="text-blue-500">
            Lakshay Bhushan
          </a>
        </p>
      </footer>
    </main>
  )
}
