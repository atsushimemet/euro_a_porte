import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: params.username },
      select: { id: true, isPublic: true }
    })

    if (!user || !user.isPublic) {
      return NextResponse.json(
        { error: 'ユーザーが見つかりません' },
        { status: 404 }
      )
    }

    const items = await prisma.closetItem.findMany({
      where: {
        userId: user.id,
        isPublic: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching user closet:', error)
    return NextResponse.json(
      { error: 'クローゼットの取得に失敗しました' },
      { status: 500 }
    )
  }
}
