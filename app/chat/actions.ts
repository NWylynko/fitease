"use server";

import { generate_video, get_video_gen_status } from "@/lib/generate_video";
import { getRequestStatus, submitRequest } from "@/lib/text_gen";

export const submitMessage = async (message: string) => {
  const { requestId } = await submitRequest(message);

  return {
    requestId
  }
}

export const getTextStatus = async (requestId: string) => {
  const textStatus = await getRequestStatus(requestId);

  console.log(textStatus)

  return textStatus
}

export const startVideoGen = async (message: string) => {
  const startVideoGen = await generate_video(message);

  console.log(startVideoGen)

  return {
    videoId: startVideoGen.data.video_id
  }
}

export const getVideoStatus = async (videoId: string) => {
  const videoStatus = await get_video_gen_status(videoId);

  console.log(videoStatus)

  if (videoStatus.data.status === 'completed') {
    return {
      status: videoStatus.data.status,
      videoUrl: videoStatus.data.video_url
    }
  }

  return {
    status: videoStatus.data.status,
    videoUrl: null
  }
}