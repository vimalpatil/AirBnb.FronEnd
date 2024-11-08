import "./css/search.css";

export default function NavaBar() {
  return (
    <nav class="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="/listings">
          <i class="fa-solid fa-compass"></i>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link" href="/listings">
              Explore
            </a>
          </div>
          <div class="navbar-nav ms-auto">
            <form class="d-flex" role="search">
              <input
                class="form-control me-2 search-inp"
                type="search"
                placeholder="Search destination"
              />
              <button class="btn search-btn" type="submit">
                <i class="fa-solid fa-magnifying-glass"></i>Search
              </button>
            </form>
          </div>
          <div class="navbar-nav ms-auto">
            <a class="nav-link" href="/listings/new">
              Airbnb your home
            </a>

            <a class="nav-link" href="/signup">
              <b>Sign up</b>
            </a>
            <a class="nav-link" href="/login">
              <b>Log in</b>
            </a>

            {/* <%if(currUser){%>
              <a class="nav-link" href="/logout"><b>Log out</b></a>
              <%}%> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
