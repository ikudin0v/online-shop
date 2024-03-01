import FuzzySearch from "fuzzy-search"

export function searcher(request: any, data: any): any {
	const searcher = new FuzzySearch(data, ["name"], {
		caseSensitive: false
	})
	return searcher.search(request)
}
