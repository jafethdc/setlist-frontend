import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { Columns, Column, Title, Subtitle, Button, Icon } from 'bloomer';
import moment from 'moment';
import BasicDropdown from '../../BasicDropdown';

const SetlistItem = ({
  setlist: { id, date, artist, venue, tour, festival },
}) => {
  const mDate = moment(date, 'YYYY-MM-DD');
  const fullVenue = `${venue.name}, ${venue.city.name}, ${
    venue.city.country.name
  }`;
  const atContent = festival ? festival.name : fullVenue;

  return (
    <Columns className="setlist-result">
      <Column isSize={1}>
        <div className="setlist-date" style={{ padding: 0 }}>
          <div className="setlist-date-content">
            <div>{mDate.format('MMM')}</div>
            <div>{mDate.format('DD')}</div>
            <div>{mDate.format('YYYY')}</div>
          </div>
        </div>
      </Column>
      <Column isSize={10}>
        <Link to={`/setlists/${id}`}>
          <Title isSize={5} className="setlist-title">
            {artist.name} at {atContent}
          </Title>
        </Link>
        <Subtitle>
          <div>
            Artist: <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
            {tour && (
              <>
                Tour: <Link to={`/tours/${tour.id}`}>{tour.name}</Link>
              </>
            )}
            Venue: <Link to={`/venues/${venue.id}`}>{fullVenue}</Link>
          </div>
          <div>
            <BasicDropdown
              trigger={
                <Button isOutlined>
                  <Icon className="fa fa-pencil" isSize="small" />
                  Edit setlist
                  <Icon className="fa fa-angle-down" isSize="small" />
                </Button>
              }
            >
              {() => (
                <>
                  <NavLink
                    to={`/setlists/${id}/songs`}
                    className="dropdown-item"
                  >
                    Edit setlist songs
                  </NavLink>
                  <NavLink
                    to={`/setlists/${id}/venue`}
                    className="dropdown-item"
                  >
                    Edit venue & date
                  </NavLink>
                  <NavLink
                    to={`/setlists/${id}/tour`}
                    className="dropdown-item"
                  >
                    Edit tour & festival
                  </NavLink>
                </>
              )}
            </BasicDropdown>
          </div>
        </Subtitle>
      </Column>
    </Columns>
  );
};

SetlistItem.propTypes = {
  setlist: PropTypes.object.isRequired,
};
export default SetlistItem;
