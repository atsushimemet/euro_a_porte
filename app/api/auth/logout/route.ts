import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: 'ログアウトしました' },
      { status: 200 }
    )

    // セッションクッキーを削除
    response.cookies.set('user_id', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    })

    return response
  } catch (error) {
    console.error('Error during logout:', error)
    return NextResponse.json(
      { error: 'ログアウトに失敗しました' },
      { status: 500 }
    )
  }
}
