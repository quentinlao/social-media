import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export type SocialPlatform = "tiktok" | "instagram" | "rednote" | "x" | "youtubeShort";

export const SOCIALS: Record<SocialPlatform, { width: number; height: number; label: string }> = {
  tiktok: { width: 1080, height: 1920, label: "TikTok (9:16)" },
  instagram: { width: 1080, height: 1920, label: "Instagram Reel (9:16)" },
  rednote: { width: 720, height: 1280, label: "Rednote (9:16)" },
  x: { width: 1080, height: 1920, label: "X (9:16)" },
  youtubeShort: { width: 1080, height: 1920, label: "YouTube Short (9:16)" },
};

const ffmpeg = new FFmpeg();

export async function resizeVideoForAllSocials(file: File): Promise<Record<SocialPlatform, string>> {
  if (!ffmpeg.loaded) {
    await ffmpeg.load();
    console.log("🤯 ~ resizeVideoForAllSocials ~ ffmpeg:", ffmpeg);
  }

  ffmpeg.on("log", ({ type, message }) => {
    console.log("🤯 ~ ffmpeg.on ~ type:", { type, message });
  });
  const results: Record<SocialPlatform, string> = {} as any;
  const data = await fetchFile(file);
  console.log("🤯 ~ resizeVideoForAllSocials ~ data:", data);

  // for (const [platform, { width, height }] of Object.entries(SOCIALS)) {
  //   const outputName = `${platform}.mp4`;
  //   await ffmpeg.writeFile("input.mp4", data);
  //   console.log('🤯 ~ resizeVideoForAllSocials ~ outputName:', outputName);
  //   await ffmpeg.exec([
  //     "-i",
  //     "input.mp4",
  //     "-vf",
  //     `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2`,
  //     "-c:a",
  //     "copy",
  //     outputName,
  //   ]);
  //   const out = await ffmpeg.readFile(outputName);
  //   const blob = new Blob([out], { type: "video/mp4" });
  //   results[platform as SocialPlatform] = URL.createObjectURL(blob);
  //   await ffmpeg.deleteFile(outputName);
  // }
  // Replace the for loop with only the "instagram" platform for testing
  const { width, height } = SOCIALS.instagram;
  const outputName = `instagram.mp4`;
  // Clone the Uint8Array to avoid ArrayBuffer detachment issues
  const dataCopy = new Uint8Array(data);
  await ffmpeg.writeFile("input.mp4", dataCopy);
  try {
    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-vf",
      `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2`,
      "-c:a",
      "copy",
      outputName,
    ]);
    console.log("FFmpeg exec finished");
  } catch (e) {
    console.error("FFmpeg exec error:", e);
  }
  const out = await ffmpeg.readFile(outputName);
  console.log("🤯 ~ resizeVideoForAllSocials ~ out:", out);
  const blob = new Blob([out], { type: "video/mp4" });
  results.instagram = URL.createObjectURL(blob);
  await ffmpeg.deleteFile(outputName);
  await ffmpeg.deleteFile("input.mp4");
  console.log("🤯 ~ resizeVideoForAllSocials ~ results:", results);
  return results;
}
