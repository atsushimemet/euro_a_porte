import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // バリデーション
    if (!email || !password) {
      return NextResponse.json(
        { error: 'メールアドレスとパスワードが必要です' },
        { status: 400 }
      )
    }

    // ユーザーの検索
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'メールアドレスまたはパスワードが正しくありません' },
        { status: 401 }
      )
    }

    // パスワードの検証
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'メールアドレスまたはパスワードが正しくありません' },
        { status: 401 }
      )
    }

    // セッション情報を設定（簡易版）
    const response = NextResponse.json(
      { message: 'ログインに成功しました' },
      { status: 200 }
    )

    // セッションクッキーを設定
    response.cookies.set('user_id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7日間
    })

    return response
  } catch (error) {
    console.error('Error during login:', error)
    return NextResponse.json(
      { error: 'ログインに失敗しました' },
      { status: 500 }
    )
  }
}
