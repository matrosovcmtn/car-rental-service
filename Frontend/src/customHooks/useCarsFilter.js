import { useMemo } from "react"

export const useCarsFilter = (cats, query, data) => {
    const cated = useMemo(() => {
        if (cats.length) {
            return data.filter(car => cats.includes(car.category))
        }
        else return data
    }, [cats])
    const searched = useMemo(() => {
        return cated.filter(car => car.model.toLowerCase().includes(query.toLowerCase()))
    }, [cated, query])
    return searched
}