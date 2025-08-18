import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/utils/prisma'

// GET: 個別アイテム取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // データベース接続の確認
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable is not set')
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      )
    }

    const item = await prisma.item.findUnique({
      where: {
        id: params.id
      }
    })

    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error('Error fetching item:', error)
    
    // データベース接続エラーの詳細ログ
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch item', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// PUT: アイテム更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description, history, imageUrl, stylingUrl, embedCode, mainCategory, subCategory, category, tags, isStylingExample } = body

    // Generate category if not provided but mainCategory and subCategory are available
    const finalCategory = category || (mainCategory && subCategory ? `${mainCategory} - ${subCategory}` : category)

          const item = await prisma.item.update({
        where: { id: params.id },
        data: {
          name,
          description,
          history,
          imageUrl,
          stylingUrl,
          embedCode,
          mainCategory,
          subCategory,
          category: finalCategory,
          tags,
          isStylingExample
        }
      })

    return NextResponse.json(item)
  } catch (error) {
    console.error('Error updating item:', error)
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    )
  }
}

// DELETE: アイテム削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.item.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Item deleted successfully' })
  } catch (error) {
    console.error('Error deleting item:', error)
    return NextResponse.json(
      { error: 'Failed to delete item' },
      { status: 500 }
    )
  }
}
