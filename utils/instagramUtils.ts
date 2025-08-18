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

// Instagram埋め込みスクリプトを動的に読み込む関数
export function loadInstagramEmbedScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // 既にスクリプトが読み込まれているかチェック
    if (window.instgrm) {
      resolve();
      return;
    }

    // スクリプトが既に読み込み中かチェック
    if (document.querySelector('script[src*="instagram.com/embed.js"]')) {
      // 既存のスクリプトの読み込み完了を待つ
      const checkInterval = setInterval(() => {
        if (window.instgrm) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      return;
    }

    // 新しいスクリプトを追加
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      // Instagram埋め込みの初期化を待つ
      setTimeout(() => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
        resolve();
      }, 100);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// 埋め込みコンポーネントを処理する関数
export async function processInstagramEmbeds(): Promise<void> {
  try {
    await loadInstagramEmbedScript();
    
    // 複数回試行して確実に処理する
    let attempts = 0;
    const maxAttempts = 5;
    
    const processEmbeds = () => {
      if (window.instgrm) {
        try {
          window.instgrm.Embeds.process();
          console.log('Instagram embeds processed successfully');
        } catch (error) {
          console.error('Error in instgrm.Embeds.process():', error);
        }
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(processEmbeds, 200);
      }
    };
    
    processEmbeds();
  } catch (error) {
    console.error('Error processing Instagram embeds:', error);
  }
}

// TypeScript用のグローバル型定義
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
