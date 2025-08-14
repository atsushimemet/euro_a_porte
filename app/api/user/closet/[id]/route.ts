import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

// アイテムの詳細を取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.cookies.get('user_id')?.value

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const item = await prisma.closetItem.findFirst({
      where: {
        id: params.id,
        userId: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            bio: true,
          },
        },
      },
    })

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error('Error fetching item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// アイテムを更新
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.cookies.get('user_id')?.value

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, imageUrl, category, tags, favoritePoints, isPublic } = body

    // アイテムが存在し、ユーザーが所有しているかチェック
    const existingItem = await prisma.closetItem.findFirst({
      where: {
        id: params.id,
        userId: userId,
      },
    })

    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    // アイテムを更新
    const updatedItem = await prisma.closetItem.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        description,
        imageUrl,
        category,
        tags,
        favoritePoints,
        isPublic,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// アイテムを削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.cookies.get('user_id')?.value

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // アイテムが存在し、ユーザーが所有しているかチェック
    const existingItem = await prisma.closetItem.findFirst({
      where: {
        id: params.id,
        userId: userId,
      },
    })

    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    // アイテムを削除
    await prisma.closetItem.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: 'Item deleted successfully' })
  } catch (error) {
    console.error('Error deleting item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
