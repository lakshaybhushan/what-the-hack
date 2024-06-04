export const dynamic = 'force-dynamic'
export const maxDuration = 45

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const hnUrl = searchParams.get("hnUrl")

  if (!hnUrl) {
    return new Response("Please enter a valid URL", { status: 400 })
  }

  try {
    const res = await fetch(`${process.env.API_URL}image?hnURL=${hnUrl}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return new Response("Failed to fetch image from API", {
        status: res.status,
      })
    }

    const imageBlob = await res.blob()

    return new Response(imageBlob, {
      headers: {
        "Content-Type": "image/png",
      },
    })
  } catch (error) {
    return new Response(`Error fetching image: ${(error as Error).message}`, {
      status: 500,
    })
  }
}
