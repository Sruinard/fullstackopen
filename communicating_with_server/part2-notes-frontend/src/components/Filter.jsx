const Filter = ({ filterName, setFilterName }) => {
    return <div>filter shown for <input id="filter" value={filterName} onChange={event => setFilterName(event.target.value)}/></div>
}

export default Filter;