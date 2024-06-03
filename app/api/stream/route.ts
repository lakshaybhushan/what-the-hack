export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const hnUrl = searchParams.get("hnUrl")

  if (!hnUrl) {
    return "Please provide a valid Hacker News URL!"
  }

  const res = await fetch(`${process.env.API_URL}?hnURL=${hnUrl}`)
  const reader = res.body?.pipeThrough(new TextDecoderStream()).getReader()

  if (!reader) {
    return "Failed to read the response!"
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

  return new Response(stream)
}
