const SearchBar = () => {
    return (
        <form className="search">
            <div className="search__inner">
                <input type="text" className="search__text" placeholder="Search for people, files, documents..." />
                <i className="zwicon-search search__helper"></i>
                <i className="zwicon-arrow-left search__reset" data-sa-action="search-close"></i>
            </div>
        </form>
    )
}

export default SearchBar;