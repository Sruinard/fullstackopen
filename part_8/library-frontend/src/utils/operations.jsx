import { ALL_BOOKS_BY_GENRE } from "../queries";
const updateCache = (cache, addedBook) => {

    const uniqBy = (array, key) => {
      return array.reduce((acc, current) => {
        const x = acc.find(a => a[key] === current[key])
        if (!x) {
          return acc.concat([current])
        }
      }, [])
    }
    const deduplicatedBooks = uniqBy([...data.allBooks, addedBook], 'title')


    console.log('addedBook', addedBook)
    cache.updateQuery(
      { 
        query: ALL_BOOKS_BY_GENRE,
        variables: { genre: null }
      }, 
      (data) => {
        if (!data) return null
        return {
          allBooks: deduplicatedBooks
        }
      }
    )
  }

export default updateCache