export async function downloadFromUrl(url: string, fileName: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed (${res.status})`)
  const blob = await res.blob()
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = objectUrl
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(objectUrl)
}
