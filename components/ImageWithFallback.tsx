'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  // Google DriveのURLを直接画像URLに変換
  const convertGoogleDriveUrl = (url: string) => {
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1]
      if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${fileId}`
      }
    }
    return url
  }

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      // Google DriveのURLを変換して再試行
      const convertedUrl = convertGoogleDriveUrl(src)
      if (convertedUrl !== src) {
        setImgSrc(convertedUrl)
      } else {
        // フォールバック画像を設定
        setImgSrc('https://via.placeholder.com/400x400?text=Image+Not+Found')
      }
    }
  }

  // 初期URLを変換
  const initialSrc = convertGoogleDriveUrl(src)

  return (
    <Image
      src={hasError ? imgSrc : initialSrc}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={className}
      priority={priority}
      onError={handleError}
      {...props}
    />
  )
}
