import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET: ユーザーのクローゼットアイテム一覧取得
export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const items = await prisma.closetItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching closet items:', error)
    return NextResponse.json(
      { error: 'クローゼットアイテムの取得に失敗しました' },
      { status: 500 }
    )
  }
}

// POST: クローゼットアイテム作成
export async function POST(request: NextRequest) {
  try {
    const userId = request.cookies.get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, description, imageUrl, mainCategory, subCategory, category, tags, favoritePoints, isPublic } = body

    // バリデーション
    if (!name || !imageUrl || !mainCategory || !subCategory) {
      return NextResponse.json(
        { error: '必須フィールドが不足しています (name, imageUrl, mainCategory, subCategory)' },
        { status: 400 }
      )
    }

    // Generate category if not provided
    const finalCategory = category || `${mainCategory} - ${subCategory}`

    const item = await prisma.closetItem.create({
      data: {
        userId,
        name,
        description: description || null,
        imageUrl,
        mainCategory,
        subCategory,
        category: finalCategory,
        tags: tags || [],
        favoritePoints: favoritePoints || null,
        isPublic: isPublic !== undefined ? isPublic : true
      }
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Error creating closet item:', error)
    return NextResponse.json(
      { error: 'アイテムの作成に失敗しました' },
      { status: 500 }
    )
  }
}
