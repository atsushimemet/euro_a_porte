import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET: アイテム一覧取得
export async function GET() {
  try {
    const items = await prisma.item.findMany({
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
    const { name, nameEn, description, material, history, imageUrl, stylingUrl, category, tags } = body

    const item = await prisma.item.create({
      data: {
        name,
        nameEn,
        description,
        material,
        history,
        imageUrl,
        stylingUrl,
        category,
        tags
      }
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Error creating item:', error)
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    )
  }
}
