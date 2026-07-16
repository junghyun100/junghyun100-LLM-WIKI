import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://junghyun100.github.io',
	base: '/junghyun100-LLM-WIKI',
	integrations: [
		starlight({
			title: 'LLM Wiki',
			description: 'LLM이 유지관리하는 지속적 지식 베이스 — 원본 소스 → 위키 → 스키마 3계층 구조',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/junghyun100/junghyun100-LLM-WIKI' },
				{ icon: 'rss', label: 'RSS', href: '/rss.xml' },
			],
			sidebar: [
				{
					label: '위키 개요',
					items: [
						{ label: '시작하기', slug: 'getting-started' },
						{ label: '위키 구조 (3계층)', slug: 'wiki-structure' },
						{ label: '운영 워크플로', slug: 'workflow' },
					],
				},
				{
					label: '원본 소스 (Raw Sources)',
					items: [{ autogenerate: { directory: 'sources' } }],
				},
				{
					label: '위키 페이지 (Wiki Pages)',
					items: [
						{ label: '엔티티 (Entities)', items: [{ autogenerate: { directory: 'wiki/entities' } }] },
						{ label: '개념 (Concepts)', items: [{ autogenerate: { directory: 'wiki/concepts' } }] },
					],
				},
				{
					label: '인덱스 & 로그',
					items: [
						{ label: '전체 인덱스 (index.md)', slug: 'index' },
						{ label: '변경 로그 (log.md)', slug: 'log' },
					],
				},
				{
					label: '도구 & 템플릿',
					items: [
						{ label: '도구 & 템플릿 개요', slug: 'tools' },
					],
				},
			],
			defaultLocale: 'ko',
			locales: {
				ko: { label: '한국어', lang: 'ko-KR' },
			},
			editLink: {
				baseUrl: 'https://github.com/junghyun100/junghyun100-LLM-WIKI/edit/main/',
			},
			lastUpdated: true,
			pagefind: true,
			customCss: ['./src/styles/custom.css'],
			components: {
				Search: './src/components/Search.astro',
			},
		}),
	],
});