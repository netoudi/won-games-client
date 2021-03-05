export default function getImageUrl(url: string | undefined | null) {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_HOST || 'http://localhost:1337'
  const noImage =
    process.env.NEXT_PUBLIC_NO_IMAGE_URL || baseUrl + '/uploads/no_image.png'

  return url ? baseUrl + url : noImage
}
