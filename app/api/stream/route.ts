export const dynamic = "force-dynamic"
export const maxDuration = 30;
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const hnUrl = searchParams.get("hnUrl")

  if (!hnUrl) {
    return new Response("Please enter a valid URL", { status: 400 })
  }

  const res = await fetch(`${process.env.API_URL}?hnURL=${hnUrl}`)
  const reader = res.body?.pipeThrough(new TextDecoderStream()).getReader()

  if (!reader) {
    return new Response("Summary can't be generated!", { status: 404 })
  }

  const stream = new ReadableStream({
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        controller.enqueue(value)
      }
      controller.close()
    },
  })

  return new Response(stream, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  })
}
