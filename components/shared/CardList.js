
import Card from './Card';
import { Col, Row } from 'react-bootstrap';
import Link from 'next/link'

const CardList = () =>
  <Row>
    { Array(3).fill(0).map((_, i) =>
      <Col md="4" key={i}>
        <Link href="/portfolios/someID">
          <a className="course-link">
            <Card />
          </a>
        </Link>
      </Col>
      )
    }
  </Row>


export default CardList;
