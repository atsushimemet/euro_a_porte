import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.closetItem.findFirst({
      where: {
        id: params.id,
        isPublic: true
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            bio: true
          }
        }
      }
    })

    if (!item) {
      return NextResponse.json(
        { error: 'アイテムが見つかりません' },
        { status: 404 }
      )
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error('Error fetching closet item:', error)
    return NextResponse.json(
      { error: 'アイテムの取得に失敗しました' },
      { status: 500 }
    )
  }
}
