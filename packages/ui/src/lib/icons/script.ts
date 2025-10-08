import { readFile, writeFile } from 'node:fs/promises'
import { getIconsCSS } from '@iconify/utils'
import { locate } from '@iconify/json'
import type { IconifyJSON } from '@iconify/types'

//@ts-expect-error ok ok ok
import { HugeIconsEnum, TablerIconsEnum } from './icons.ts'

async function main() {
	const icons = {
		hugeicons: Object.keys(HugeIconsEnum).filter((k) => Number.isNaN(Number(k))),
		tabler: Object.keys(TablerIconsEnum).filter((k) => Number.isNaN(Number(k)))
	}
	let code = ''
	for (const prefix in icons) {
		const filename = locate(prefix)
		const iconSet = JSON.parse(await readFile(filename, 'utf8')) as IconifyJSON
		//@ts-expect-error ok ok ok
		const css = getIconsCSS(iconSet, icons[prefix])
		code += css
	}
	await writeFile('./packages/ui/src/lib/icons/style.css', code, 'utf8')
	console.log(`Saved CSS (${code.length} bytes)`)
	return code
}
await main()
