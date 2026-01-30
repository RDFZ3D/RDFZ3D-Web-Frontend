import type { RequestEvent } from "@sveltejs/kit";

//.env好像在client不可用，先硬编码api地址了
const PUBLIC_API_HOST = "https://api.r3d.x-way.work";

type PlatformKeys = "windows" | "macos" | "linux" | "android" | "ios";

type PlatformInfo = {
  name: string;
  key: PlatformKeys;
  downloadUrl: string | undefined;
};

// 这都是copilot写的，通过检测UA标识获取目标设备的平台

const detectPlatform = (userAgent: string): PlatformKeys | null => {
  userAgent = userAgent.toLowerCase();

  // 1. 先检测明确的iOS设备（iPhone/iPod/iPad）
  if (/iphone|ipod|ipad/.test(userAgent)) return "ios";

  // 2. 检测新版iPadOS（UA同时包含Macintosh|Mac OS X和Mobile）
  if (/macintosh|mac os x/.test(userAgent) && /mobile/.test(userAgent)) return "ios";

  // 3. 其他平台检测
  if (/android/.test(userAgent)) return "android";
  if (/windows nt/.test(userAgent)) return "windows";
  if (/macintosh|mac os x/.test(userAgent)) return "macos";
  if (/linux/.test(userAgent) && !/android/.test(userAgent)) return "linux";

  return null;
};

export const load = async ({ request }: RequestEvent) => {
  const userAgent = request.headers.get("user-agent") || "";
  const detected = detectPlatform(userAgent);

  let platforms: PlatformInfo[] = [];
  try {
    const res = await fetch(`${PUBLIC_API_HOST}/static/download.json`);
    if (res.ok) {
      platforms = await res.json();
    }
  } catch (err) {
    // ignore, 返回空
  }

  // fallback: 如果没拉到数据，防止页面炸掉
  if (!platforms || platforms.length === 0) {
    platforms = [];
  }

  let top: PlatformInfo | undefined;
  let others: PlatformInfo[];

  if (detected) {
    top = platforms.find((p) => p.key === detected);
    others = platforms.filter((p) => p.key !== detected);
  } else {
    others = platforms;
  }

  return {
    detectedPlatform: top,
    otherPlatforms: others,
  };
};
