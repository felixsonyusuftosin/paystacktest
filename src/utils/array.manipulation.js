export const filterByGender = (gender, actors) => {
	if (!gender) {
		return actors
	}

	return actors.filter(actor => {
		return actor.gender === gender
	})
}

export const getDistinctByGender = (inputArray, field) =>
	Array.from([...new Set(inputArray.map(item => item[field]))])

export const sortActorsByHeight = (actors, ascending = true) => {
	return actors.sort((A, B) => {
		const transformedA = !isNaN(+A.height) ? A.height : 0
		const transformedB = !isNaN(+B.height) ? B.height : 0
		const val = transformedA - transformedB

		if (ascending) {
			return val
		}
		return val * -1
	})
}

export const sortActorsByName = (actors, ascending = true) => {
	return actors.sort((A, B) => {
		const transformedA = A.name.toLowerCase().trim()
		const transformedB = B.name.toLowerCase().trim()
		const val =
			transformedA < transformedB ? -1 : transformedA > transformedB ? 1 : 0

		if (ascending) {
			return val
		}
		return val * -1
	})
}

export const sortActorsByGender = (actors, ascending = true) => {
	return actors.sort((A, B) => {
		const transformedA = A.gender.toLowerCase().trim()
		const transformedB = B.gender.toLowerCase().trim()
		const val =
			transformedA < transformedB ? -1 : transformedA > transformedB ? 1 : 0

		if (ascending) {
			return val
		}
		return val * -1
	})
}

export const sortMoviesByDate = movies => {
	return movies.sort((A, B) => {
		const transformedA = new Date(A.release_date)
		const transformedB = new Date(B.release_date)
		return transformedA < transformedB
			? -1
			: transformedA > transformedB
			? 1
			: 0
	})
}
