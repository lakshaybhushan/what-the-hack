"use server"

export async function handleURL(e: FormData) {
  const hnUrl = e.get("hnUrl") as string
  console.log(hnUrl)

  if (!hnUrl) {
    return ("Please enter a valid URL")
  }

  const res = await fetch(
    "https://hnai-server.lakshb.workers.dev/?hnURL=" + hnUrl
  )

  const data = (await res.json()) as { response: string }

  return data.response
}
