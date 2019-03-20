import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Button,
  Columns,
  Column,
  Title,
  Subtitle,
  Card,
  CardHeader,
  CardHeaderTitle,
  CardContent,
  CardFooter,
} from 'bloomer';

const Setlist = ({ setlist: { date, artist, venue } }) => {
  const mDate = moment(date, 'YYYY-MM-DD');
  return (
    <div>
      <Columns>
        <Column isSize={2}>
          <div className="setlist-date">
            <div className="setlist-date-content">
              <div>{mDate.format('MMM')}</div>
              <div>{mDate.format('DD')}</div>
              <div>{mDate.format('YYYY')}</div>
            </div>
          </div>
        </Column>
        <Column isSize={10}>
          <Title isSize={3}>{artist.name} Setlist</Title>
          <Subtitle>
            at{' '}
            <Link to={`/venues/${venue.id}`}>
              {`${venue.name}, ${venue.city.name}, ${venue.city.country.name}`}
            </Link>
          </Subtitle>
        </Column>
      </Columns>
      <Card>
        <CardHeader>
          <CardHeaderTitle>Setlist</CardHeaderTitle>
        </CardHeader>
        <CardContent>
          Sorry, there are no songs in this setlist yet, but ... If you were
          there then add whatever song you remember! And you might also get help
          in the setlist request forum
        </CardContent>
        <CardFooter className="setlist-footer">
          <Button isColor="primary">I was there</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

Setlist.propTypes = {
  setlist: PropTypes.object.isRequired,
};

export default Setlist;
