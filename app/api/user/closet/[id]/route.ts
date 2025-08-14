import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

// PATCH: クローゼットアイテム更新
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.cookies.get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { isPublic } = body

    const item = await prisma.closetItem.findFirst({
      where: {
        id: params.id,
        userId
      }
    })

    if (!item) {
      return NextResponse.json(
        { error: 'アイテムが見つかりません' },
        { status: 404 }
      )
    }

    const updatedItem = await prisma.closetItem.update({
      where: { id: params.id },
      data: { isPublic }
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating closet item:', error)
    return NextResponse.json(
      { error: 'アイテムの更新に失敗しました' },
      { status: 500 }
    )
  }
}

// DELETE: クローゼットアイテム削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.cookies.get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const item = await prisma.closetItem.findFirst({
      where: {
        id: params.id,
        userId
      }
    })

    if (!item) {
      return NextResponse.json(
        { error: 'アイテムが見つかりません' },
        { status: 404 }
      )
    }

    await prisma.closetItem.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'アイテムが削除されました' })
  } catch (error) {
    console.error('Error deleting closet item:', error)
    return NextResponse.json(
      { error: 'アイテムの削除に失敗しました' },
      { status: 500 }
    )
  }
}
