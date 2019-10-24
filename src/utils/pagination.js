import { AbstractPaginate } from '@utils'

export class Paginate {
	paginatedItems = []
	pages = []
	lastPage = []
	firstPage = []
	pageSize = 10
	allPages
	currentPage
	_nextable
	_prevable
	pageItems
	constructor(actors, pageSize = 10) {
		this.actors = actors
		this.pageSize = pageSize
		if (actors) {
			this.computePages()
		}
	}

	computePages() {
		const actorsLength = this.actors.length
		if (actorsLength <= this.pageSize) {
			this.paginatedItems.push(this.actors)
			this.allPages = 1
			this.pages.push(1)
			this.currentPage = 1
			this._nextable = false
			this._prevable = false
			this.pageItems = this.paginatedItems[0]
			return this.pageItems
		}
		const numberOfIterations = Math.ceil(actorsLength / this.pageSize ) + 1

		for (let i = 0; i < numberOfIterations; i++) {
			const page = this.actors.slice(i, i + this.pageSize)
			this.paginatedItems.push(page)
			this._nextable = true
			this._prevable = false
			this.currentPage = 1
			this.allPages += 1
			this.pages.push(i + 1)
		}
		this.pageItems = this.paginatedItems[0]
		return this.pageItems
	}

	goToNextPage = () => {
		if (!this._nextable) {
			return this.pageItems
		}
		this.currentPage = this.currentPage += 1
		this.pageItems = this.paginatedItems[this.currentPage - 1]
		this._prevable = true
		if (this.currentPage > this.paginatedItems.length) {
			this._nextable = false
		}
		return this.pageItems
	}
	goToPreviousPage = () => {
		if (!this._prevable) {
			return this.pageItems
		}
		this.currentPage = this.currentPage !== 1 ? (this.currentPage -= 1) : 1
		this.pageItems = this.paginatedItems[this.currentPage - 1]

		this._prevable = true
		if (this.currentPage === 1) {
			this._prevable = false
		}
		return this.pageItems
	}

	goToPage = page => {
		this.currentPage = page
		this.pageItems = this.paginatedItems[this.currentPage - 1]
		if (this.currentPage == 1) {
			this._prevable = false
		}
		if (this.currentPage >= this.paginatedItems.length - 1) {
			this._nextable = false
		}
		return this.pageItems
	}

	goToLastPage = () => {
		return this.goToPage(this.paginatedItems.length)
	}

	goToFirstPage = () => {
		return this.goToPage(1)
	}
}
