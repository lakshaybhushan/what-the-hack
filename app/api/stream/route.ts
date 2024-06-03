import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const hnUrl = searchParams.get("hnUrl")

  if (!hnUrl) {
    return NextResponse.error()
  }

  const res = await fetch(`${process.env.API_URL}?hnURL=${hnUrl}`)
  const reader = res.body?.pipeThrough(new TextDecoderStream()).getReader()

  if (!reader) {
    return NextResponse.error()
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

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
