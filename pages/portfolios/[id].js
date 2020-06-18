

const PortfolioDetail = () => {
  return (
    <>
      <div className="portfolio-detail">
        <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
          <main role="main" className="inner page-cover">
            <>
              <h1 className="cover-heading">Amazing Experience</h1>
              <p className="lead dates">27/12/2009 - 31/04/2011</p>
              <p className="lead info mb-0">Developer | Eincode | New York</p>
              <p className="lead">Some description about the job</p>
              <p className="lead">
                <a href="#" target="_" className="btn btn-lg btn-secondary">Visit Company</a>
              </p>
            </>
          </main>
        </div>
      </div>
    </>
  )
}

export default PortfolioDetail;
