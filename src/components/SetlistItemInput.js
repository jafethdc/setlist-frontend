import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  Checkbox,
  Control,
  Icon,
  Input,
  Button,
  DropdownItem,
  Tag,
  Columns,
  Column,
} from 'bloomer';
import ArtistAutocomplete from './ArtistAutocomplete';
import TrackAutocomplete from './TrackAutocomplete';
import BasicDropdown from './BasicDropdown';

const SetlistItemInput = forwardRef(
  ({ value, onChange, artistId, defaultValue, ...rest }, ref) => (
    <div className="field setlist-item" ref={ref} {...rest}>
      <Columns>
        <Column isSize={1}>
          <Tag isColor="light">{value.type}</Tag>
        </Column>

        {value.type !== 'set' && (
          <Column isSize={3}>
            <Field hasAddons>
              <Control>
                <Button isStatic>Track</Button>
              </Control>
              <Control isExpanded>
                <TrackAutocomplete
                  onChange={() => onChange({ ...value, track: null })}
                  onSelect={track => onChange({ ...value, track })}
                  artistId={value.isCover ? undefined : artistId}
                  initialValue={
                    defaultValue && defaultValue.track
                      ? defaultValue.track.name
                      : ''
                  }
                />
              </Control>
            </Field>
          </Column>
        )}

        <Column isSize={3}>
          <Field hasAddons>
            <Control>
              <Button isStatic>Info</Button>
            </Control>
            <Control isExpanded>
              <Input
                type="text"
                name="input"
                value={value.info || ''}
                onChange={e => onChange({ ...value, info: e.target.value })}
              />
            </Control>
          </Field>
        </Column>

        {value.type === 'track' && (
          <Column isSize={3}>
            <Field hasAddons>
              <Control>
                <Button isStatic>Ft.</Button>
              </Control>
              <Control isExpanded>
                <ArtistAutocomplete
                  onChange={() => onChange({ ...value, featuringArtist: null })}
                  onSelect={featuringArtist =>
                    onChange({ ...value, featuringArtist })
                  }
                  initialValue={
                    defaultValue && defaultValue.featuringArtist
                      ? defaultValue.featuringArtist.name
                      : ''
                  }
                />
              </Control>
            </Field>
          </Column>
        )}

        <Column isSize={2}>
          <Field>
            <Control>
              <BasicDropdown
                trigger={
                  <Button isOutlined>
                    <Icon className="fa fa-angle-down" isSize="small" />
                  </Button>
                }
              >
                {() => (
                  <>
                    {value.type !== 'set' && (
                      <DropdownItem>
                        <Field>
                          <Control>
                            <Checkbox
                              checked={value.isCover}
                              onChange={e =>
                                onChange({
                                  ...value,
                                  isCover: e.target.checked,
                                })
                              }
                            >
                              &nbsp;Is cover?
                            </Checkbox>
                          </Control>
                        </Field>
                      </DropdownItem>
                    )}
                    <DropdownItem className="hoverable">Delete</DropdownItem>
                  </>
                )}
              </BasicDropdown>
            </Control>
          </Field>
        </Column>
      </Columns>
    </div>
  )
);

SetlistItemInput.displayName = 'SetlistItemInput';

SetlistItemInput.propTypes = {
  value: PropTypes.shape({
    type: PropTypes.string.isRequired,
    track: PropTypes.object,
    info: PropTypes.string,
    featuringArtist: PropTypes.object,
    isCover: PropTypes.bool,
  }),
  artistId: PropTypes.number,
  onChange: PropTypes.func,
  defaultValue: PropTypes.object,
};

export default SetlistItemInput;
