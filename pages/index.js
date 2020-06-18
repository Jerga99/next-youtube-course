
import { PageTitle, CardList, Section } from 'components/shared';
import Link from 'next/link';
import NotUsed from 'components/NotUsedPart';

const Home = () => (
  <>
    <PageTitle text="Recent Portfolios" />
    <Section>
      <CardList />
    </Section>
    <Link
      href="/portfolios">
        <a className="btn btn-main bg-blue ttu">See More Portfolios</a>
    </Link>
    <Section>
      <NotUsed />
    </Section>
  </>
)

export default Home
