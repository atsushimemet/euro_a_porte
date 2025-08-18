import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/utils/prisma'

// GET: アイテム一覧取得
export async function GET(request: NextRequest) {
  try {
    // データベース接続の確認
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable is not set')
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const styling = searchParams.get('styling')

    const where = styling === 'true' ? { isStylingExample: true } : {}

    const items = await prisma.item.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching items:', error)
    
    // データベース接続エラーの詳細ログ
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch items', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// POST: アイテム作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received body:', body)
    
    const { name, description, history, imageUrl, stylingUrl, embedCode, category, tags } = body

    // 必須フィールドの検証
    if (!name || !description || !imageUrl || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, imageUrl, category' },
        { status: 400 }
      )
    }

          const item = await prisma.item.create({
        data: {
          name,
          description,
          history: history || null,
          imageUrl,
          stylingUrl: stylingUrl || null,
          embedCode: embedCode || null,
          category,
          tags: tags || []
        }
      })

    console.log('Created item:', item)
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Error creating item:', error)
    return NextResponse.json(
      { error: 'Failed to create item', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
