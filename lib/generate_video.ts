

export const generate_video = async (script: string) => {

  if (process.env.KEYGEN_TOKEN === undefined) {
    throw new Error("KEYGEN_TOKEN is not defined")
  }

  const headers = new Headers()

  headers.set("X-Api-Key", process.env.KEYGEN_TOKEN)
  headers.set("Content-Type", "application/json")

  const response = await fetch(
    "https://api.heygen.com/v2/video/generate",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        "video_inputs": [
          {
            "character": {
              "type": "avatar",
              "avatar_id": "Gerardo_standing_nightscene_front",
              "avatar_style": "normal"
            },
            "voice": {
              "type": "text",
              "input_text": script,
              "voice_id": "1bd001e7e50f421d891986aad5158bc8",
              "speed": 1
            }
          }
        ],
        "test": true,
        "aspect_ratio": "16:9"
      })
    }
  )

  const data = await response.json()

  return data as {
    "error": null,
    "data": {
      "video_id": string
    }
  }
}

export const get_video_gen_status = async (video_id: string) => {

  if (process.env.KEYGEN_TOKEN === undefined) {
    throw new Error("KEYGEN_TOKEN is not defined")
  }

  const headers = new Headers()

  headers.set("X-Api-Key", process.env.KEYGEN_TOKEN)
  headers.set("Content-Type", "application/json")

  const response = await fetch(
    `https://api.heygen.com/v1/video_status.get?video_id=${video_id}`,
    {
      method: "GET",
      headers: headers
    }
  )

  const data = await response.json()

  return data as {
    "code": 100,
    "data": {
      "callback_id": null,
      "caption_url": string,
      "duration": number,
      "error": null,
      "gif_url": string,
      "id": string,
      "status": "completed",
      "thumbnail_url": string,
      "video_url": string,
      "video_url_caption": null
    },
    "message": "Success"
  } | {
    "code": 100,
    "data": {
      "callback_id": null,
      "caption_url": null,
      "duration": null,
      "error": null,
      "gif_url": null,
      "id": string,
      "status": "processing",
      "thumbnail_url": null,
      "video_url": null,
      "video_url_caption": null
    },
    "message": "Success"
  } | {
    "code": 100,
    "data": {
      "callback_id": null,
      "caption_url": null,
      "duration": null,
      "error": null,
      "gif_url": null,
      "id": string,
      "status": "pending",
      "thumbnail_url": null,
      "video_url": null,
      "video_url_caption": null
    },
    "message": "Success"
  } | {
    "code": 100,
    "data": {
      "callback_id": null,
      "caption_url": null,
      "duration": null,
      "error": {
        "code": number,
        "detail": string,
        "message": string
      },
      "gif_url": null,
      "id": string,
      "status": "failed",
      "thumbnail_url": null,
      "video_url": null,
      "video_url_caption": null
    },
    "message": "Success"
  }
}