import { useMemo } from "react"

const chooseSortCallback = (sortBy, a, b) => {
    if (sortBy === "id") return a.id - b.id
    else return a[sortBy].localeCompare(b[sortBy])
}

export const useSortedData = (DBcont, sortBy) => {
    const sortedData = useMemo(() => {
        if (sortBy) {
            return [...DBcont].sort((a,b) => chooseSortCallback(sortBy, a, b))
        }
        return DBcont
    }, [sortBy, DBcont])
    return sortedData
}

export const useSearchedSortedData = (DBcont, sortBy, query) => {
    const sortedData = useSortedData(DBcont, sortBy)

    const searchedData = useMemo(() => {
        if (query) {
            return sortedData.filter((user => user.name.toLowerCase().includes(query.toLowerCase())))
        }
        return sortedData
    }, [query, sortedData])

    return searchedData
}