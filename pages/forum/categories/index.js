
import { PageTitle } from 'components/shared';

const ForumCategories = () => {
  return (
    <>
      <PageTitle text="Categories"/>
      <section className="fj-category-list">
        <div className="row">
          <div className="col-md-4">
            <div className="fj-category-container">
            <a className="fj-category subtle-shadow no-border" href="/forum/categories/someId">
                <div className="category-information">
                  <div className="heading gray-90">
                    General Discussion
                  </div>
                  <div className="description">
                    Just general question
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="fj-category-container">
            <a className="fj-category subtle-shadow no-border" href="/forum/categories/someId">
                <div className="category-information">
                  <div className="heading gray-90">
                    Other Discussion
                  </div>
                  <div className="description">
                    Just general question
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="fj-category-container">
              <a className="fj-category subtle-shadow no-border" href="/forum/categories/someId">
                <div className="category-information">
                  <div className="heading gray-90">
                    Some Discussion
                  </div>
                  <div className="description">
                    Just general question
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}



export default ForumCategories;
