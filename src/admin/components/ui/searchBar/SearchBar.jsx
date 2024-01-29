const SearchBar = () => {
    return (
        <form className="admin-search">
            <div className="admin-search__inner">
                <input type="text" className="admin-search__text" placeholder="Search for people, files, documents..." />
                <i className="admin-zwicon-search admin-search__helper"></i>
                <i className="admin-zwicon-arrow-left admin-search__reset" data-sa-action="admin-search-close"></i>
            </div>
        </form>
    )
}

export default SearchBar;