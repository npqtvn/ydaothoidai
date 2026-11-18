// Lấy danh sách YouTube Shorts mới nhất của kênh lúc build web (không cần API key).
// YouTube có sẵn nguồn RSS cho riêng Shorts: danh sách phát "UUSH" + mã kênh bỏ "UC".
// Web tự build lại theo lịch (xem .github/workflows/deploy.yml) nên Short mới sẽ tự hiện.

export type Short = { id: string; title: string; published: string; thumb: string };

const cache = new Map<string, Promise<Short[]>>();

const decode = (s: string) =>
  s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

async function load(channelId: string): Promise<Short[]> {
  const playlist = 'UUSH' + channelId.replace(/^UC/, '');
  const url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlist}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .map(([, e]) => {
        const id = e.match(/<yt:videoId>([^<]+)</)?.[1] ?? '';
        return {
          id,
          title: decode(e.match(/<title>([^<]*)</)?.[1] ?? ''),
          published: e.match(/<published>([^<]+)</)?.[1] ?? '',
          thumb: `https://i.ytimg.com/vi/${id}/oar2.jpg`,
        };
      })
      .filter((s) => s.id);
  } catch (err) {
    // Không để lỗi mạng làm hỏng cả lần build: khối Shorts sẽ tạm ẩn
    console.warn(`[youtube] Không lấy được Shorts của kênh ${channelId}:`, (err as Error).message);
    return [];
  }
}

export function getShorts(channelId: string): Promise<Short[]> {
  if (!channelId) return Promise.resolve([]);
  if (!cache.has(channelId)) cache.set(channelId, load(channelId));
  return cache.get(channelId)!;
}
