'use server'
import fs from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'
import path from 'path'

export async function getStaticData(sub = 'jobs') {
  const dir = path.join(process.cwd(), `content/${sub}`)

  return fs
    .readdirSync(dir)
    .map(file => {
      const filePath = path.join(dir, file)
      const fileContents = fs.readFileSync(`${filePath}/index.md`, 'utf8')
      const { data, content } = matter(fileContents)

      return { data, content: marked.parse(content) }
    })
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
}
