import ContentGeneration from "@/components/generation"
import Footer from "@/components/footer"
import Heading from "@/components/heading"

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Heading />
        <ContentGeneration />
        <Footer />
      </main>
    </>
  )
}
