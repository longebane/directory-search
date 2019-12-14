export const SearchBar = ({
  classes,
  isUpdating,
  handleSearchChange,
  handleSearchSubmit,
  searchParams: { folder, filter, ext }
}) => {
  return (
    <form noValidate autoComplete="off" onSubmit={e => handleSearchSubmit(e)}>
      <div class="form-row">
        <div class="col-6">
          <div class="input-group">
            <input
              class="form-control"
              type="text"
              name="folder"
              value={folder}
              placeholder="Path"
              onChange={handleSearchChange}
            />{" "}
            <div class="input-group-prepend">
              <span class="input-group-text">/</span>
            </div>
            <input
              class="form-control "
              type="text"
              name="filter"
              value={filter}
              placeholder="Filename"
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div class="col-3">
          <select
            class="form-control"
            name="ext"
            value={ext}
            onChange={handleSearchChange}
          >
            ><option value="">all</option>
            <option value="mp3">audio</option>
            <option value="txt">text</option>
            <option value="jpg,png,gif">images</option>
          </select>
        </div>
        <div class="col-3">
          <button
            class="btn btn-primary btn-block"
            type="submit"
            disabled={isUpdating}
          >
            {!isUpdating ? (
              <span>Search</span>
            ) : (
              <span>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
