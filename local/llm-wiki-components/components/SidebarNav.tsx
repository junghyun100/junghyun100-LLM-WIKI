import { QuartzComponent, QuartzComponentProps, QuartzComponentConstructor } from "@quartz/components/types"
import { useState } from "preact/hooks"

/**
 * Sidebar Navigation - replaces @quartz-community/explorer
 * Displays hierarchical navigation for the wiki
 */
const SidebarNav: QuartzComponent = ({
  cfg,
}: QuartzComponentProps) => {
  // Compute basePath from baseUrl (same logic as Header component)
  let basePath = ""
  const baseUrl = cfg.baseUrl || ""
  if (baseUrl) {
    try {
      const url = new URL(baseUrl)
      basePath = url.pathname
    } catch {
      // Fallback for URLs without protocol (e.g., "domain.com/path")
      const match = baseUrl.match(/\/([^/].*)?$/)
      basePath = match ? "/" + match[1].replace(/\/$/, "") : ""
    }
  }
  if (!basePath.startsWith("/")) basePath = "/" + basePath
  basePath = basePath.replace(/\/+$/, "")

  const navSections = [
    {
      title: "시작하기",
      items: [
        { href: `${basePath}/ko/getting-started`, label: "시작 가이드", icon: "book-open" },
        { href: `${basePath}/ko/workflow`, label: "워크플로우", icon: "git-branch" },
      ],
    },
    {
      title: "위키",
      items: [
        { href: `${basePath}/ko/wiki/concepts`, label: "핵심 개념", icon: "brain" },
        { href: `${basePath}/ko/wiki/entities`, label: "논문·엔티티", icon: "file-text" },
        { href: `${basePath}/ko/wiki/sources`, label: "소스 문서", icon: "database" },
      ],
    },
    {
      title: "참조",
      items: [
        { href: `${basePath}/ko/tools`, label: "도구", icon: "wrench" },
        { href: `${basePath}/ko/resources`, label: "리소스", icon: "link-2" },
        { href: `${basePath}/ko/schema`, label: "스키마", icon: "file-code" },
      ],
    },
    {
      title: "메타",
      items: [
        { href: `${basePath}/ko/log`, label: "변경 로그", icon: "history" },
      ],
    },
  ]

  return (
    <nav class="sidebar-nav" aria-label="사이드바 내비게이션" role="navigation">
      <ul class="sidebar-nav-list">
        {navSections.map((section, sectionIndex) => (
          <SidebarSection key={sectionIndex} section={section} />
        ))}
      </ul>
    </nav>
  )
}

interface SidebarSectionProps {
  section: {
    title: string
    items: Array<{ href: string; label: string; icon: string }>
  }
}

const SidebarSection: QuartzComponent = ({ section }: SidebarSectionProps) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <li class="sidebar-section">
      <button
        class="sidebar-section-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`sidebar-section-${section.title}`}
        type="button"
      >
        <span class="sidebar-section-title">{section.title}</span>
        <ChevronIcon open={isOpen} />
      </button>
      <ul
        id={`sidebar-section-${section.title}`}
        class="sidebar-section-items"
        hidden={!isOpen}
        style={{ display: isOpen ? "block" : "none" }}
      >
        {section.items.map((item, index) => (
          <li key={index} class="sidebar-section-item">
            <a
              href={item.href}
              class="sidebar-nav-link"
              data-icon={item.icon}
            >
              <span class="sidebar-nav-link-icon" aria-hidden="true">
                {getIcon(item.icon)}
              </span>
              <span class="sidebar-nav-link-text">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </li>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" width="16" height="16">
      <path d={open ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
    </svg>
  )
}

function getIcon(name: string) {
  const icons: Record<string, JSX.Element> = {
    "book-open": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7" />
      </svg>
    ),
    "git-branch": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M6 3v12M18 9v6M15 3v18M6 9h12" />
      </svg>
    ),
    "brain": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
        <path d="M12 8a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V11a3 3 0 0 0-3-3z" />
        <path d="M12 14a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0v-1a3 3 0 0 0-3-3z" />
      </svg>
    ),
    "file-text": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    "database": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    "wrench": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    "link-2": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    "file-code": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    "history": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    ),
  }

  return icons[name] || icons["file-text"]
}

SidebarNav.css = `
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  height: 100%;
  overflow-y: auto;
  padding-right: var(--space-2);
}

.sidebar-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.sidebar-section {
  border: 1px solid var(--color-border-default);
  border-radius: var(--layout-radius-md);
  background: var(--color-surface-1);
  overflow: hidden;
}

.sidebar-section-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: color var(--motion-duration-fast) var(--motion-ease-out);
}

.sidebar-section-toggle:hover {
  color: var(--color-text-primary);
}

.sidebar-section-chevron {
  flex-shrink: 0;
  margin-left: var(--space-2);
  color: var(--color-text-muted);
  transition: transform var(--motion-duration-fast) var(--motion-ease-out);
}

.sidebar-section-items {
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid var(--color-border-default);
  background: var(--color-surface-1);
}

.sidebar-section-item {
  border-bottom: 1px solid var(--color-border-subtle);
}

.sidebar-section-item:last-child {
  border-bottom: none;
}

.sidebar-nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  text-decoration: none;
  transition:
    color var(--motion-duration-fast) var(--motion-ease-out),
    background-color var(--motion-duration-fast) var(--motion-ease-out);
}

.sidebar-nav-link:hover {
  color: var(--color-accent);
  background: var(--color-accent-muted);
  text-decoration: none;
}

.sidebar-nav-link:focus-visible {
  outline: none;
  background: var(--color-accent-muted);
  color: var(--color-accent);
  border-left: 2px solid var(--color-accent);
  padding-left: calc(var(--space-4) - 2px);
}

.sidebar-nav-link-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: var(--color-text-muted);
  transition: color var(--motion-duration-fast) var(--motion-ease-out);
}

.sidebar-nav-link:hover .sidebar-nav-link-icon {
  color: var(--color-accent);
}

.sidebar-nav-link.active {
  color: var(--color-accent);
  background: var(--color-accent-muted);
}

.sidebar-nav-link.active .sidebar-nav-link-icon {
  color: var(--color-accent);
}

@media (max-width: 1024px) {
  .sidebar-nav {
    padding: var(--space-4);
  }

  .sidebar-section-toggle {
    padding: var(--space-2) var(--space-3);
  }
}
`

export default (() => SidebarNav) satisfies QuartzComponentConstructor