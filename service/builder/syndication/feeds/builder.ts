import { Feed } from 'feed'
import path from 'path'

import { Api } from '../../../../types/enum'
import { saveToDiskRaw } from '../../../../util/io'
import { config } from './config'
import * as content from './content'
import { toFeedItem } from './item'
import * as options from './options/index'

const write = async (file: string, content: string): Promise<void> => {
  console.log('Writing file: %s / Content Length: %s', file, content.length)

  await saveToDiskRaw(file, content)
  console.log('Done %s', file)
}

const build = async (slug: Api): Promise<void> => {
  console.time(`Generating Feed For "${slug}"`)
  const result = await content.get(slug)
  const updated = new Date(Math.max.apply(null, result.map(x => new Date(x.publishedAt as Date).getTime())))

  const rss = new Feed(options.get(slug, updated))
  const atom = new Feed(options.get(slug, updated))

  for (const page of result) {
    const item = toFeedItem(slug, page)

    if (item !== undefined) {
      rss.addItem(item)
      atom.addItem(item)
    }
  }

  await write(path.join(process.cwd(), config.root, slug, 'rss.xml'), rss.rss2())
  await write(path.join(process.cwd(), config.root, slug, 'atom.xml'), atom.atom1())

  console.timeEnd(`Generating Feed For "${slug}"`)
}

export { build }
