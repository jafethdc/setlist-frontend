import React from 'react';
import { Row, Col } from 'antd';
import Layout from '../components/Layout';
import PopularArtists from '../components/PopularArtists';
import ArtistsBySetlists from '../components/ArtistsBySetlists';

const Artists = () => (
  <Layout>
    <Row>
      <Col span={6}>
        <PopularArtists />
      </Col>
      <Col span={6}>
        <ArtistsBySetlists />
      </Col>
    </Row>
  </Layout>
);

export default Artists;
