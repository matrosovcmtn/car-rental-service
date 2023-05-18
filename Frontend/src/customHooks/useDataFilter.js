import { useMemo } from "react"

const chooseSortCallback = (sortBy, a, b) => {
    if (sortBy === "id") return a.id - b.id
    else return a[sortBy].localeCompare(b[sortBy])
}

export const useSortedData = (DBcont, sortBy) => {
    const sortedData = useMemo(() => {
        if (sortBy.length > 0) {
            return [...DBcont].sort((a,b) => chooseSortCallback(sortBy, a, b))
        }
        return DBcont
    }, [sortBy, DBcont])
    return sortedData
}

export const useSearchedSortedData = (DBcont, sortBy, query) => {
    const sortedData = useSortedData(DBcont, sortBy)

    const searchedData = useMemo(() => {
        if (DBcont.length > 0) {
            const compField = Object.keys(DBcont[0]).filter(key => key.toLowerCase().includes("name"))[0]
            if (query.length > 0) {
                return sortedData.filter(item => item[compField] &&
                    item[compField].toLowerCase().includes(query.toLowerCase())
                )
            }
            return sortedData.filter(item => item[compField])
        }
        return sortedData
    }, [query, sortedData])

    return searchedData
}