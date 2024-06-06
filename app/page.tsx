import ContentGeneration from "@/components/generation"
import Footer from "@/components/footer"
import Heading from "@/components/heading"
import Nav from "@/components/nav"

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Nav/>
        <Heading />
        <ContentGeneration />
        <Footer />
      </main>
    </>
  )
}
