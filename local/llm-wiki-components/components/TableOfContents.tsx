import { QuartzComponent, QuartzComponentProps, QuartzComponentConstructor } from "@quartz/components/types"
import { useState, useEffect, useMemo } from "preact/hooks"
import { Element } from "hast"

/**
 * Table of Contents - replaces @quartz-community/table-of-contents
 * Displays heading structure with scroll spy
 */
const TableOfContents: QuartzComponent = ({
  tree,
}: QuartzComponentProps) => {
  const [activeId, setActiveId] = useState<string>("")

  // Extract headings from the tree
  const headings = useMemo((): Array<{ id: string; text: string; depth: number }> => {
    const result: Array<{ id: string; text: string; depth: number }> = []
    function traverse(node: Element, depth = 0) {
      if (node.type === "element" && node.tagName && /^h[1-6]$/i.test(node.tagName)) {
        const id = node.properties?.id as string | undefined
        const text = node.children
          .filter((c) => c.type === "text")
          .map((c) => (c as any).value)
          .join("")
        if (id && text) {
          result.push({ id, text, depth: parseInt(node.tagName[1]) })
        }
      }
      if (node.children) {
        node.children.forEach((child) => {
          if (child.type === "element") traverse(child as Element, depth + 1)
        })
      }
    }
    traverse(tree as Element)
    return result
  }, [tree])

  // Scroll spy to highlight active heading
  useEffect(() => {
    if (!headings?.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-80px 0px -66% 0px",
        threshold: 0,
      },
    )

    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (!headings?.length) return null

  return (
    <aside class="toc" aria-label="본문 목차">
      <div class="toc-header">
        <h3 class="toc-title">목차</h3>
        <button class="toc-toggle" type="button" aria-label="접기">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      </div>
      <nav class="toc-nav">
        <ul class="toc-list">
          {headings.map((heading) => (
            <TocItem key={heading.id} heading={heading} active={heading.id === activeId} />
          ))}
        </ul>
      </nav>
    </aside>
  )
}

interface TocItemProps {
  heading: { id: string; text: string; depth: number }
  active: boolean
}

const TocItem: QuartzComponent = ({ heading, active }: TocItemProps) => {
  const indent = (heading.depth - 2) * 12
  const dotColor = active ? "var(--color-accent)" : "var(--color-border-default)"

  return (
    <li class="toc-item" style={{ paddingLeft: `${indent}px` }}>
      <a
        href={`#${heading.id}`}
        class={`toc-link${active ? " active" : ""}`}
        onClick={(e) => {
          e.preventDefault()
          const el = document.getElementById(heading.id)
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" })
            history.pushState(null, "", `#${heading.id}`)
          }
        }}
      >
        <span class="toc-link-dot" style={{ backgroundColor: dotColor }} aria-hidden="true" />
        <span class="toc-link-text">{heading.text}</span>
      </a>
    </li>
  )
}

TableOfContents.css = `
.toc {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100vh;
  overflow: hidden;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border-default);
  border-radius: var(--layout-radius-lg);
  padding: var(--space-4);
}

.toc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--color-border-default);
  flex-shrink: 0;
}

.toc-title {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.toc-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border-default);
  border-radius: var(--layout-radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition:
    border-color var(--motion-duration-fast) var(--motion-ease-out),
    background-color var(--motion-duration-fast) var(--motion-ease-out),
    color var(--motion-duration-fast) var(--motion-ease-out);
}

.toc-toggle:hover {
  border-color: var(--color-border-strong);
  background: var(--color-surface-3);
  color: var(--color-text-primary);
}

/* Mobile bottom sheet */
@media (max-width: 1024px) {
  .toc {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    max-height: 60vh;
    border-radius: var(--layout-radius-xl) var(--layout-radius-xl) 0 0;
    border-bottom: none;
    box-shadow: var(--shadow-xl);
    z-index: var(--z-drawer);
    transform: translateY(100%);
    transition: transform var(--motion-duration-normal) var(--motion-ease-out);
  }

  .toc.open {
    transform: translateY(0);
  }

  .toc-toggle {
    display: flex;
  }

  .toc-header {
    padding-bottom: var(--space-3);
  }
}

.toc-nav {
  flex: 1;
  overflow-y: auto;
  padding-right: var(--space-2);
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin: 0;
  line-height: 1.4;
}

.toc-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-1) var(--space-1) var(--space-2);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  text-decoration: none;
  border-radius: var(--layout-radius-sm);
  transition:
    color var(--motion-duration-fast) var(--motion-ease-out),
    background-color var(--motion-duration-fast) var(--motion-ease-out);
  position: relative;
}

.toc-link:hover {
  color: var(--color-accent);
  background: var(--color-accent-muted);
  text-decoration: none;
}

.toc-link:focus-visible {
  outline: none;
  color: var(--color-accent);
  background: var(--color-accent-muted);
}

.toc-link-dot {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-border-default);
  transition:
    background-color var(--motion-duration-fast) var(--motion-ease-out),
    transform var(--motion-duration-fast) var(--motion-ease-out);
}

.toc-link.active {
  color: var(--color-accent);
  background: var(--color-accent-muted);
}

.toc-link.active .toc-link-dot {
  background: var(--color-accent);
  transform: scale(1.33);
}

.toc-link-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toc-link.active .toc-link-text {
  font-weight: var(--weight-semibold);
}

/* Progress indicator */
.toc-progress {
  position: fixed;
  top: 0;
  right: 0;
  width: 2px;
  height: 100%;
  background: var(--color-border-default);
  z-index: var(--z-toc);
  pointer-events: none;
}

.toc-progress-bar {
  height: 0%;
  background: var(--color-accent);
  transition: height 0.1s linear;
}

@media (max-width: 1024px) {
  .toc-progress {
    display: none;
  }
}
`

export default (() => TableOfContents) satisfies QuartzComponentConstructor