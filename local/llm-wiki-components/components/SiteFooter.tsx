import { QuartzComponent, QuartzComponentProps } from "@quartz/components/types"

/**
 * Site Footer - replaces @quartz-community/footer
 */
const SiteFooter: QuartzComponent = ({
  cfg,
  ctx,
}: QuartzComponentProps) => {
  // Compute basePath from baseUrl (robust to formats: "host/path/", "https://host/path/", "/path/")
  const baseUrl = cfg.baseUrl || ""
  const basePath = ctx.argv.serve || !baseUrl
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
  const pageTitle = cfg.pageTitle || "LLM Wiki"
  const year = new Date().getFullYear()

  return (
    <footer class="site-footer" role="contentinfo">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href={basePath || "/"} class="footer-logo" aria-label={`${pageTitle} - Home`}>
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
          <p class="footer-tagline">LLM 연구자를 위한 한국어 지식 베이스</p>
        </div>

        <nav class="footer-nav" aria-label="푸터 내비게이션">
          <div class="footer-nav-column">
            <h4>위키</h4>
            <ul>
              <li><a href={`${basePath}/ko/wiki/concepts`}>핵심 개념</a></li>
              <li><a href={`${basePath}/ko/wiki/entities`}>논문·엔티티</a></li>
              <li><a href={`${basePath}/ko/sources`}>소스 문서</a></li>
            </ul>
          </div>
          <div class="footer-nav-column">
            <h4>도구</h4>
            <ul>
              <li><a href={`${basePath}/ko/tools`}>도구 모음</a></li>
              <li><a href={`${basePath}/ko/resources`}>리소스</a></li>
              <li><a href={`${basePath}/ko/schema`}>스키마</a></li>
            </ul>
          </div>
          <div class="footer-nav-column">
            <h4>메타</h4>
            <ul>
              <li><a href={`${basePath}/ko/log`}>변경 로그</a></li>
              <li><a href="#contribute">기여하기</a></li>
              <li><a href="#license">라이선스</a></li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          © {year} {pageTitle}. MIT 라이선스 하에 배포됩니다.
        </p>
        <div class="footer-links">
          <a
            href="https://github.com/junghyun100/junghyun100-LLM-WIKI"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub 저장소"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://quartz.jzhao.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Quartz SSG"
          >
            Quartz 5로 구축
          </a>
        </div>
      </div>
    </footer>
  )
}

SiteFooter.css = `
.site-footer {
  background: var(--color-surface-1);
  border-top: 1px solid var(--color-border-default);
  padding: var(--space-12) var(--space-6) var(--space-8);
  margin-top: auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  max-width: var(--layout-width-wide);
  margin: 0 auto var(--space-8);
  padding: 0 var(--space-4);
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: 2fr 3fr;
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  color: var(--color-text-primary);
  font-family: var(--font-display);
  font-weight: var(--weight-bold);
  font-size: var(--text-xl);
  line-height: var(--leading-tight);
  transition: opacity var(--motion-duration-fast) var(--motion-ease-out);
}

.footer-logo:hover {
  opacity: 0.8;
  text-decoration: none;
}

.footer-logo .logo-mark {
  width: 36px;
  height: 36px;
  color: var(--color-accent);
  flex-shrink: 0;
}

.footer-tagline {
  color: var(--color-text-muted);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  margin: 0;
  max-width: 280px;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

@media (min-width: 1024px) {
  .footer-nav {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-nav-column h4 {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 var(--space-3);
}

.footer-nav-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.footer-nav-column a {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  text-decoration: none;
  transition: color var(--motion-duration-fast) var(--motion-ease-out);
}

.footer-nav-column a:hover {
  color: var(--color-accent);
  text-decoration: underline;
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-default);
  max-width: var(--layout-width-wide);
  margin: 0 auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}

.copyright {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  margin: 0;
  text-align: center;
}

@media (min-width: 768px) {
  .copyright {
    text-align: left;
  }
}

.footer-links {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  flex-wrap: wrap;
  justify-content: center;
}

@media (min-width: 768px) {
  .footer-links {
    justify-content: flex-end;
  }
}

.footer-links a {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  text-decoration: none;
  transition: color var(--motion-duration-fast) var(--motion-ease-out);
}

.footer-links a:hover {
  color: var(--color-accent);
  text-decoration: none;
}

.footer-links svg {
  flex-shrink: 0;
}
`

const SiteFooterConstructor = () => SiteFooter
SiteFooterConstructor.__cacheId = "SiteFooter"
export default SiteFooterConstructor satisfies QuartzComponentConstructor
