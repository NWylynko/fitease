
export const submitRequest = async (message: string) => {

  if (process.env.AIXPLAIN_TOKEN === undefined) {
    throw new Error("AIXPLAIN_TOKEN is not defined")
  }

  const headers = new Headers()

  headers.set("x-api-key", process.env.AIXPLAIN_TOKEN)
  headers.set("Content-Type", "application/json")

  const response = await fetch(
    "https://models.aixplain.com/api/v1/execute/6414bd3cd09663e9225130e8",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        data: message,
      }),
    }
  )

  if (!response.ok) {
    throw new Error("Failed to submit request")
  }

  const data = await response.json() as {
    "completed": false,
    "data": string,
    "requestId": string
  }

  console.log(data)

  return data

}

export const getRequestStatus = async (requestId: string) => {

  if (process.env.AIXPLAIN_TOKEN === undefined) {
    throw new Error("AIXPLAIN_TOKEN is not defined")
  }

  const headers = new Headers()

  headers.set("x-api-key", process.env.AIXPLAIN_TOKEN)
  headers.set("Content-Type", "application/json")

  const response = await fetch(
    `https://models.aixplain.com/api/v1/data/${requestId}`,
    {
      method: "GET",
      headers,
    }
  )

  if (!response.ok) {
    throw new Error("Failed to get request status")
  }

  const data = await response.json() as {
    "completed": true,
    "data": string,
    "usedCredits": number,
    "runTime": number,
    "details": any
  }

  console.log(data)

  return data

}