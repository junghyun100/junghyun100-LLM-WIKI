import { QuartzComponent, QuartzComponentProps } from "./types"

/**
 * Modern Header component with logo, navigation tabs, search, and toolbar
 */
const Header: QuartzComponent = ({
  fileData,
  cfg,
}: QuartzComponentProps) => {
  const pageTitle = cfg.pageTitle
  const baseUrl = cfg.baseUrl || ""
  const basePath = !baseUrl
    ? ""
    : (() => {
        try {
          const url = baseUrl.startsWith("http") ? new URL(baseUrl) : new URL(`https://${baseUrl}`)
          return url.pathname.replace(/\/$/, "")
        } catch {
          const match = baseUrl.match(/\/([^/].*)?$/)
          return match ? "/" + match[1].replace(/\/$/, "") : ""
        }
      })()
  const homeHref = basePath || "/"

  return (
    <header class="site-header" role="banner">
      <div class="header-left">
        <a
          href={homeHref}
          class="site-logo"
          aria-label={`${pageTitle} - Home`}
        >
          <svg
            class="logo-mark"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="32" height="32" rx="6" fill="currentColor" />
            <path
              d="M8 12h16M8 16h12M8 20h8"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <span class="logo-text">LLM Wiki</span>
        </a>

        <nav class="nav-tabs" aria-label="주 메뉴" role="navigation">
          <a href={`${basePath}/ko/getting-started`} class="nav-tab">
            시작하기
          </a>
          <a href={`${basePath}/ko/wiki/concepts`} class="nav-tab">
            핵심 개념
          </a>
          <a href={`${basePath}/ko/wiki/entities`} class="nav-tab">
            논문·엔티티
          </a>
          <a href={`${basePath}/ko/tools`} class="nav-tab">
            도구
          </a>
          <a href={`${basePath}/ko/workflow`} class="nav-tab">
            워크플로우
          </a>
        </nav>
      </div>

      <div class="header-center">
        <SearchTrigger />
      </div>

      <div class="header-right">
        <ThemeToggle />
        <a
          href="https://github.com/junghyun100/junghyun100-LLM-WIKI"
          class="github-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub 저장소"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </header>
  )
}

Header.css = `
.site-header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  padding: var(--space-3) var(--space-6);
  height: var(--layout-header-height);
  background: transparent;
  border-bottom: 1px solid transparent;
  transition:
    background-color var(--motion-duration-normal) var(--motion-ease-out),
    border-color var(--motion-duration-normal) var(--motion-ease-out),
    backdrop-filter var(--motion-duration-normal) var(--motion-ease-out);
}

.page-scrolled .site-header {
  background: rgba(var(--color-surface-1), 0.8);
  backdrop-filter: blur(12px);
  border-bottom-color: var(--color-border-default);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  flex: 1;
  min-width: 0;
}

.header-center {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  max-width: 480px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-shrink: 0;
}

.site-logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  color: var(--color-text-primary);
  font-family: var(--font-display);
  font-weight: var(--weight-bold);
  font-size: var(--text-xl);
  line-height: var(--leading-tight);
  transition: opacity var(--motion-duration-fast) var(--motion-ease-out);
}

.site-logo:hover {
  opacity: 0.8;
  text-decoration: none;
}

.logo-mark {
  width: 32px;
  height: 32px;
  color: var(--color-accent);
  flex-shrink: 0;
}

.logo-text {
  display: none;
}

@media (min-width: 768px) {
  .logo-text {
    display: block;
  }
}

.nav-tabs {
  display: none;
  gap: var(--space-1);
  padding: var(--space-1);
  background: var(--color-surface-2);
  border-radius: var(--layout-radius-lg);
}

@media (min-width: 1024px) {
  .nav-tabs {
    display: flex;
  }
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  text-decoration: none;
  border-radius: var(--layout-radius-md);
  transition:
    color var(--motion-duration-fast) var(--motion-ease-out),
    background-color var(--motion-duration-fast) var(--motion-ease-out);
  white-space: nowrap;
}

.nav-tab:hover,
.nav-tab.active {
  color: var(--color-accent);
  background: var(--color-accent-muted);
  text-decoration: none;
}

.nav-tab:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Search trigger button */
.search-trigger {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  max-width: 400px;
  padding: var(--space-2) var(--space-4);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border-default);
  border-radius: var(--layout-radius-lg);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-family: var(--font-body);
  cursor: pointer;
  transition:
    border-color var(--motion-duration-fast) var(--motion-ease-out),
    background-color var(--motion-duration-fast) var(--motion-ease-out),
    box-shadow var(--motion-duration-fast) var(--motion-ease-out);
}

.search-trigger:hover {
  border-color: var(--color-border-strong);
  background: var(--color-surface-3);
}

.search-trigger:focus-visible {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-muted);
}

.search-trigger kbd {
  display: none;
  padding: var(--space-1) var(--space-2);
  background: var(--color-surface-3);
  border: 1px solid var(--color-border-default);
  border-radius: var(--layout-radius-sm);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

@media (min-width: 768px) {
  .search-trigger kbd {
    display: inline-flex;
  }
}

.search-trigger svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--color-text-muted);
}

/* Theme toggle */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
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

.theme-toggle:hover {
  border-color: var(--color-border-strong);
  background: var(--color-surface-3);
  color: var(--color-text-primary);
}

.theme-toggle:focus-visible {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-muted);
}

.theme-toggle svg {
  width: 20px;
  height: 20px;
}

/* GitHub link */
.github-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--layout-radius-md);
  color: var(--color-text-secondary);
  transition:
    color var(--motion-duration-fast) var(--motion-ease-out),
    background-color var(--motion-duration-fast) var(--motion-ease-out);
}

.github-link:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-2);
  text-decoration: none;
}

.github-link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.github-link svg {
  width: 20px;
  height: 20px;
}

/* Mobile hamburger menu trigger */
.mobile-menu-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border-default);
  border-radius: var(--layout-radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
}

@media (min-width: 1024px) {
  .mobile-menu-trigger {
    display: none;
  }
}

.mobile-menu-trigger:hover {
  background: var(--color-surface-3);
}

/* Search overlay - triggered by SearchTrigger */
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  flex-direction: column;
  background: var(--color-surface-0);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity var(--motion-duration-normal) var(--motion-ease-out),
    visibility var(--motion-duration-normal) var(--motion-ease-out);
}

.search-overlay.open {
  opacity: 1;
  visibility: visible;
}

.search-overlay-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.search-overlay-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--space-8) var(--space-6);
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
}

.search-overlay-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.search-overlay-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
}

.search-overlay-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border-default);
  border-radius: var(--layout-radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition:
    border-color var(--motion-duration-fast) var(--motion-ease-out),
    background-color var(--motion-duration-fast) var(--motion-ease-out);
}

.search-overlay-close:hover {
  border-color: var(--color-border-strong);
  background: var(--color-surface-3);
}

.search-overlay-input-wrapper {
  position: relative;
  flex-shrink: 0;
}

.search-overlay-input {
  width: 100%;
  padding: var(--space-4) var(--space-5);
  padding-right: 60px;
  background: var(--color-surface-1);
  border: 2px solid var(--color-border-default);
  border-radius: var(--layout-radius-xl);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
  transition:
    border-color var(--motion-duration-fast) var(--motion-ease-out),
    box-shadow var(--motion-duration-fast) var(--motion-ease-out);
}

.search-overlay-input::placeholder {
  color: var(--color-text-muted);
}

.search-overlay-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 4px var(--color-accent-muted);
}

.search-overlay-clear {
  position: absolute;
  right: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  border-radius: var(--layout-radius-md);
  transition: color var(--motion-duration-fast) var(--motion-ease-out);
}

.search-overlay-clear:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-2);
}

.search-overlay-results {
  flex: 1;
  overflow-y: auto;
  margin-top: var(--space-6);
}

.search-overlay-empty,
.search-overlay-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-16) var(--space-4);
  text-align: center;
  color: var(--color-text-muted);
}

.search-overlay-empty svg,
.search-overlay-loading svg {
  width: 48px;
  height: 48px;
  margin-bottom: var(--space-4);
  opacity: 0.5;
}

.search-overlay-results-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-result-item {
  display: block;
  padding: var(--space-4);
  margin-bottom: var(--space-2);
  background: var(--color-surface-1);
  border: 1px solid var(--color-border-default);
  border-radius: var(--layout-radius-md);
  text-decoration: none;
  color: inherit;
  transition:
    border-color var(--motion-duration-fast) var(--motion-ease-out),
    background-color var(--motion-duration-fast) var(--motion-ease-out),
    transform var(--motion-duration-fast) var(--motion-ease-out);
}

.search-result-item:hover {
  border-color: var(--color-accent);
  background: var(--color-surface-2);
  transform: translateX(4px);
  text-decoration: none;
}

.search-result-item:focus-visible {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-muted);
}

.search-result-title {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.search-result-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.search-result-meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.search-result-category {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2);
  background: var(--color-surface-2);
  border-radius: var(--layout-radius-full);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-text-secondary);
}

.search-result-tags {
  display: flex;
  gap: var(--space-1);
  flex-wrap: wrap;
}

.search-result-tag {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  background: var(--color-surface-2);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--layout-radius-sm);
}

.search-overlay-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-default);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.search-overlay-footer kbd {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border-default);
  border-radius: var(--layout-radius-sm);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}
`

// Search Trigger Component
const SearchTrigger: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  return (
    <button
      class="search-trigger"
      type="button"
      aria-label="검색 열기 (⌘K)"
      aria-haspopup="dialog"
      data-search-trigger
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <span>검색...</span>
      <kbd>⌘K</kbd>
    </button>
  )
}

// Theme Toggle Component
const ThemeToggle: QuartzComponent = () => {
  return (
    <button
      class="theme-toggle"
      type="button"
      aria-label="테마 전환"
      data-theme-toggle
    >
      <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
      <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  )
}

export default (() => Header) satisfies QuartzComponentConstructor
