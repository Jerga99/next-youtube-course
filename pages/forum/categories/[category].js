
import { PageTitle } from 'components/shared';

const Topics = () => {
  return (
    <>
      <PageTitle text="Specific Category"/>
      <section className="fj-topic-list">
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">Topic</th>
              <th scope="col">Category</th>
              <th scope="col">Author</th>
              <th scope="col">Replies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <a href="/forum/topics/someId">
                  Some Topic Info
                </a>
              </th>
              <td className="category">General Discussion</td>
              <td>Filip Jerga</td>
              <td>2</td>
            </tr>
            <tr>
              <th>
                <a href="/forum/topics/someId">
                  Some Topic Info
                </a>
              </th>
              <td className="category">General Discussion</td>
              <td>Filip Jerga</td>
              <td>2</td>
            </tr>
            <tr>
              <th>
                <a href="/forum/topics/someId">
                  Some Topic Info
                </a>
              </th>
              <td className="category">General Discussion</td>
              <td>Filip Jerga</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </section>

    </>
  )
}



export default Topics;
