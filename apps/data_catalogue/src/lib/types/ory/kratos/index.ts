export type LinkPagination = Record<
	'first' | 'next',
	{ url?: string; page_size: string | null; page_token: string | null }
>
