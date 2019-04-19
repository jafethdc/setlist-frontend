import React from 'react';
import { Columns, Column } from 'bloomer';
import ArtistsBySetlists from '../components/ArtistsBySetlists';
import Layout from '../components/Layout';
import PopularArtists from '../components/PopularArtists';

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
