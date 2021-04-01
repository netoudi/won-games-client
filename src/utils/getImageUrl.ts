export default function getImageUrl(url?: string | null) {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_HOST
  const noImage = process.env.NEXT_PUBLIC_NO_IMAGE_URL

  return url ? baseUrl + url : noImage
}
