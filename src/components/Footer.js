import React from 'react';
import { Footer, Container, Columns, Column, Title, Subtitle } from 'bloomer';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const AlphabetIndex = ({ itemUrl }) => (
  <Subtitle isSize={6}>
    {'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('').map(i => (
      <Link to={itemUrl(i)} className="alph-list-item" key={i}>
        {i}
      </Link>
    ))}
  </Subtitle>
);

AlphabetIndex.propTypes = {
  itemUrl: PropTypes.func.isRequired,
};

const MainFooter = () => {
  const rangeLength = 7;
  const dates = Array.from(Array(rangeLength), (_, i) =>
    moment().subtract(i, 'd')
  );

  const dateFormatter = date => {
    if (date.isSame(moment(), 'd')) return 'Today';
    if (date.isSame(moment().subtract(1, 'd'), 'd')) return 'Yesterday';
    return date.format('MMM D, YYYY');
  };

  return (
    <Footer id="footer">
      <Container>
        <Columns>
          <Column isSize="1/2">
            <Title isSize={6}>Browse Artists</Title>
            <AlphabetIndex itemUrl={letter => `/artists/browse/${letter}`} />
          </Column>
          <Column isSize="1/2">
            <Title isSize={6}>Browse Venues</Title>
            <AlphabetIndex itemUrl={letter => `/venues/browse/${letter}`} />
          </Column>
        </Columns>

        <div className="is-divider" />

        <Columns isCentered>
          <Column isSize="1/4" className="has-text-centered">
            <Title isSize={6}>RECENT EVENTS</Title>
            <ul className="unstyled-list">
              {dates.map((date, i) => (
                <li key={i}>
                  <Link to={`/setlists?date=${date.format('YYYY-MM-DD')}`}>
                    {dateFormatter(date)}
                  </Link>
                </li>
              ))}
              <li />
            </ul>
          </Column>
        </Columns>
      </Container>
    </Footer>
  );
};

export default MainFooter;
