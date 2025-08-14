import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, username, email, password, bio } = body

    // バリデーション
    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { error: '必須フィールドが不足しています' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'パスワードは8文字以上である必要があります' },
        { status: 400 }
      )
    }

    // ユーザー名とメールアドレスの重複チェック
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'ユーザー名またはメールアドレスが既に使用されています' },
        { status: 400 }
      )
    }

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 12)

    // ユーザーの作成
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        bio: bio || null,
        password: hashedPassword,
      }
    })

    return NextResponse.json(
      { message: 'ユーザーが正常に作成されました' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'ユーザーの作成に失敗しました' },
      { status: 500 }
    )
  }
}
