import React from 'react';
import { Columns, Column } from 'bloomer';
import Layout from '../components/Layout';
import PopularArtists from '../components/PopularArtists';
import ArtistsBySetlists from '../components/ArtistsBySetlists';

const Artists = () => (
  <Layout>
    <Columns>
      <Column isSize="1/2">
        <PopularArtists />
      </Column>
      <Column isSize="1/2">
        <ArtistsBySetlists />
      </Column>
    </Columns>
  </Layout>
);

export default Artists;
