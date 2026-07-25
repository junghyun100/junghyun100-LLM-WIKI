#!/usr/bin/env tsx
/**
 * Ingest Helper
 * Assists with ingesting source documents into the 3-layer wiki structure
 * Usage: npx tsx scripts/ingest-helper.ts <source-file.md> [--dry-run]
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs'
import { join, basename, extname, dirname } from 'path'
import yaml from 'yaml'
import { program } from '@clack/prompts'

interface SourceFrontMatter {
  id: string
  title: string
  author?: string
  year?: string
  type?: string
  tags?: string[]
  collected_date?: string
  [key: string]: unknown
}

interface WikiFrontMatter {
  title: string
  description: string
  type: 'entity' | 'concept' | 'synthesis' | 'comparison'
  entity_type?: 'model' | 'paper' | 'tool' | 'person' | 'organization'
  sources: string[]
  tags: string[]
  last_updated: string
  confidence: 'high' | 'medium' | 'low'
  aliases?: string[]
}

function parseArgs(): { sourceFile: string; dryRun: boolean } {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const sourceFile = args.find(a => !a.startsWith('--'))
  if (!sourceFile) {
    console.error('Usage: npx tsx scripts/ingest-helper.ts <source-file.md> [--dry-run]')
    process.exit(1)
  }
  return { sourceFile, dryRun }
}

function parseFrontMatter(content: string): { frontmatter: Record<string, unknown>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return { frontmatter: {}, body: content }
  try {
    return {
      frontmatter: yaml.parse(match[1]),
      body: content.slice(match[0].length).trim(),
    }
  } catch {
    return { frontmatter: {}, body: content }
  }
}

function generateWikiPage(sourcePath: string, sourceFm: SourceFrontMatter): {
  entityPages: { path: string; frontmatter: WikiFrontMatter; content: string }[]
  conceptPages: { path: string; frontmatter: WikiFrontMatter; content: string }[]
} {
  const sourceId = sourceFm.id || basename(sourcePath, '.md')
  const today = new Date().toISOString().split('T')[0]

  // For now, create a single concept page as example
  const conceptPage = {
    path: join('content/ko/wiki/concepts', `${today}-${sourceId.replace(/^src-\d+-/, '')}.md`),
    frontmatter: {
      title: `${sourceFm.title}`,
      description: `${sourceFm.title} — ${sourceFm.type || 'document'} from ${sourceFm.year || 'unknown'}`,
      type: 'concept' as const,
      sources: [sourceId],
      tags: sourceFm.tags || [],
      last_updated: today,
      confidence: 'medium' as const,
    },
    content: `# ${sourceFm.title}\n\n> **Source**: [${sourceId}](${sourcePath})\n\n## Summary\n\n_TODO: Add summary of this source document_\n\n## Key Points\n\n- Point 1\n- Point 2\n\n## Related Concepts\n\n- [[Related Concept 1]]\n- [[Related Concept 2]]\n\n---\n\n## Source Reference\n\n- [${sourceId}](${sourcePath}) — Original document\n`,
  }

  return { entityPages: [], conceptPages: [conceptPage] }
}

function serializeFrontMatter(fm: WikiFrontMatter): string {
  return yaml.stringify(fm, {
    defaultType: 'PLAIN',
    lineWidth: 120,
    nullStr: '',
  })
}

async function main() {
  const { sourceFile, dryRun } = parseArgs()

  if (!existsSync(sourceFile)) {
    console.error(`Source file not found: ${sourceFile}`)
    process.exit(1)
  }

  console.log(`📥 Ingesting: ${sourceFile}`)
  console.log(`🏃 Dry run: ${dryRun ? 'yes' : 'no'}\n`)

  const sourceContent = readFileSync(sourceFile, 'utf-8')
  const { frontmatter } = parseFrontMatter(sourceContent)
  const sourceFm = frontmatter as SourceFrontMatter

  if (!sourceFm.id) {
    console.error('Source file must have an "id" field in frontmatter (e.g., "src-007")')
    process.exit(1)
  }

  const { entityPages, conceptPages } = generateWikiPage(sourceFile, sourceFm)

  // Show what would be created
  console.log('📝 Will create:')
  for (const page of [...entityPages, ...conceptPages]) {
    console.log(`  ${page.path}`)
    console.log(`    Type: ${page.frontmatter.type}`)
    console.log(`    Sources: ${page.frontmatter.sources.join(', ')}`)
    console.log(`    Tags: ${page.frontmatter.tags.join(', ')}`)
    console.log()
  }

  if (dryRun) {
    console.log('🔍 Dry run - no files written')
    return
  }

  // Create files
  for (const page of [...entityPages, ...conceptPages]) {
    const dir = dirname(page.path)
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }

    const fullContent = `---\n${serializeFrontMatter(page.frontmatter)}---\n\n${page.content}`
    writeFileSync(page.path, fullContent)
    console.log(`✅ Created: ${page.path}`)
  }

  // Update source index
  const sourceIndexPath = join('content/ko/sources/index.md')
  if (existsSync(sourceIndexPath)) {
    const indexContent = readFileSync(sourceIndexPath, 'utf-8')
    const newRow = `\n| ${sourceFm.id} | ${sourceFm.title} | ${sourceFm.author || '—'} | ${sourceFm.year || '—'} | ${sourceFm.type || 'doc'} | ${(sourceFm.tags || []).join(', ')} | ${new Date().toISOString().split('T')[0]} |`

    // Insert before the last line (statistics)
    const lines = indexContent.split('\n')
    const insertIndex = lines.findLastIndex(l => l.startsWith('| src-')) + 1
    if (insertIndex > 0) {
      lines.splice(insertIndex, 0, newRow)
      writeFileSync(sourceIndexPath, lines.join('\n'))
      console.log(`✅ Updated: ${sourceIndexPath}`)
    }
  }

  console.log('\n🎉 Ingest complete!')
  console.log('Next steps:')
  console.log('  1. Edit generated wiki pages to add content')
  console.log('  2. Run: npx tsx scripts/index-gen.ts')
  console.log('  3. Run: npx tsx scripts/lint-check.ts')
  console.log('  4. Verify with: npx quartz build --serve')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})