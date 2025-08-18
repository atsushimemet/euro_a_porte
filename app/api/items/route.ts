import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET: アイテム一覧取得
export async function GET(request: NextRequest) {
  try {
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
    return NextResponse.json(
      { error: 'Failed to fetch items' },
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
