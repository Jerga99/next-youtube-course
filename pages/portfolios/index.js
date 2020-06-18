
import { CardList, PageTitle } from 'components/shared';
import { useGet } from "restful-react";

const Portfolios = () => {
  const { data } = useGet({path: 'test'});
  return (
    <>
      <PageTitle text="Portfolios" />
      {/* { data?.message } */}
      <CardList />
    </>
  )
}

export default Portfolios;
