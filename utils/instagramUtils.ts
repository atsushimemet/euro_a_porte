// Instagram埋め込みコードから画像URLを抽出する関数
export function extractImageUrlFromEmbedCode(embedCode: string): string | null {
  try {
    // 埋め込みコードから画像URLを抽出する正規表現
    const imgMatch = embedCode.match(/<img[^>]+src="([^"]+)"/);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }

    // 代替方法: InstagramのOGP画像URLを構築
    const permalinkMatch = embedCode.match(/data-instgrm-permalink="([^"]+)"/);
    if (permalinkMatch && permalinkMatch[1]) {
      const postId = permalinkMatch[1].split('/p/')[1]?.split('/')[0];
      if (postId) {
        return `https://www.instagram.com/p/${postId}/media/?size=m`;
      }
    }

    return null;
  } catch (error) {
    console.error('Error extracting image URL from embed code:', error);
    return null;
  }
}

// 埋め込みコードから投稿IDを抽出する関数
export function extractPostIdFromEmbedCode(embedCode: string): string | null {
  try {
    const permalinkMatch = embedCode.match(/data-instgrm-permalink="([^"]+)"/);
    if (permalinkMatch && permalinkMatch[1]) {
      const postId = permalinkMatch[1].split('/p/')[1]?.split('/')[0];
      return postId || null;
    }
    return null;
  } catch (error) {
    console.error('Error extracting post ID from embed code:', error);
    return null;
  }
}

// 埋め込みコードが有効かどうかをチェックする関数
export function isValidEmbedCode(embedCode: string): boolean {
  return embedCode.includes('instagram-media') && 
         embedCode.includes('data-instgrm-permalink');
}
