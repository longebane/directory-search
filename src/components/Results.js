import VisibilitySensor from "react-visibility-sensor";

export const Results = ({
  handleSetMusic,
  results: { files, total },
  searchParams: { folder, filter, ext }
}) => {
  const humanFileSize = size => {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 +
      " " +
      ["B", "kB", "MB", "GB", "TB"][i]
    );
  };

  return (
    <div class="form-row">
      <p>
        {total} files
        {/* in {folder}
        {filter ? `/${filter}` : ""}
        {ext ? `for ${ext}` : ""} */}
      </p>
      {files
        .filter(
          ({ name }) =>
            name.indexOf(".jpg") !== -1 ||
            name.indexOf(".png") !== -1 ||
            name.indexOf(".gif") !== -1
        )
        .map(({ name, date, size, url }) => (
          <VisibilitySensor>
            <div class="result col-sm-3">
              {/* <div>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {name}s
        </a>
        🌟<strong>{date}</strong>
      </div>
      <p>{name}</p> */}
              <div class="card  mb-1">
                <img src={url} class="card-img" alt="" />

                <div name={name} url={url} class="card-img-overlay">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {" "}
                    <h6 class="card-title">{name}</h6>{" "}
                  </a>
                  <p class="card-text">
                    <span class="badge badge-secondary">{date}</span>
                    <span class="badge badge-secondary">
                      {humanFileSize(size)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </VisibilitySensor>
        ))}
      {files.some(
        ({ name }) => name.indexOf(".mp3") !== -1 || name.indexOf(".txt") !== -1
      ) && (
        <div class="table-responsive">
          <table class="table table-hover table-bordered table-sm">
            <thead class="thead-dark">
              <tr>
                <th class="w-50" scope="col">
                  Name
                </th>
                <th scope="col">Date</th>
                <th scope="col">Size</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {files
                .filter(
                  ({ name }) =>
                    name.indexOf(".mp3") !== -1 || name.indexOf(".txt") !== -1
                )
                .map(({ name, date, size, url }) => (
                  <VisibilitySensor>
                    <tr>
                      <th>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {name}
                        </a>
                      </th>
                      <th> {date}</th>
                      <th> {humanFileSize(size)}</th>
                      <th>
                        {name.indexOf(".mp3") !== -1 && (
                          <button
                            onClick={handleSetMusic(name, url)}
                            class="btn btn-primary btn-sm"
                          >
                            Play
                          </button>
                        )}
                      </th>
                    </tr>
                  </VisibilitySensor>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
