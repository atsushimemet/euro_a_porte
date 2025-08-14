#!/bin/bash

# Docker開発環境の起動スクリプト

echo "🚀 Euro à Porter 開発環境を起動します..."

# Docker Composeでサービスを起動
echo "📦 Docker Composeでサービスを起動中..."
docker compose up -d

# データベースの準備ができるまで待機
echo "⏳ データベースの準備を待機中..."
sleep 10

# Prismaクライアントの生成
echo "🔧 Prismaクライアントを生成中..."
docker compose exec app npx prisma generate

# データベースのマイグレーション
echo "🗄️ データベースマイグレーションを実行中..."
docker compose exec app npx prisma db push

echo "✅ 開発環境の起動が完了しました！"
echo "🌐 アプリケーション: http://localhost:3000"
echo "🗄️ データベース: localhost:5432"
echo ""
echo "📝 便利なコマンド:"
echo "  - ログ確認: docker compose logs -f app"
echo "  - サービス停止: docker compose down"
echo "  - Prisma Studio: docker compose exec app npx prisma studio"
