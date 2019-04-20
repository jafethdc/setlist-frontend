import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Columns,
  Column,
  Control,
  DropdownItem,
  Field,
  Icon,
  Input,
  Tag,
} from 'bloomer';
import { ArtistAutocomplete, TrackAutocomplete } from '../../Autocomplete';
import BasicDropdown from '../../BasicDropdown';

const SetlistItemInput = forwardRef(
  (
    {
      value,
      onChange,
      onRemove,
      artistId,
      defaultValue,
      index,
      error,
      ...rest
    },
    ref
  ) => {
    const handleChange = change => onChange(index, { ...value, ...change });

    return (
      <div className="field setlist-item-input" ref={ref} {...rest}>
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
                    onChange={() => handleChange({ track: null })}
                    onSelect={track => handleChange({ track })}
                    artistId={value.isCover ? null : artistId}
                    initialValue={
                      defaultValue && defaultValue.track
                        ? defaultValue.track.name
                        : ''
                    }
                    error={error.track}
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
                  onChange={e => handleChange({ info: e.target.value })}
                  className={error.info ? 'is-danger' : ''}
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
                    onChange={() => handleChange({ featuringArtist: null })}
                    onSelect={artist =>
                      handleChange({ featuringArtist: artist })
                    }
                    initialValue={
                      defaultValue && defaultValue.featuringArtist
                        ? defaultValue.featuringArtist.name
                        : ''
                    }
                    error={error.featuringArtist}
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
                  {({ setActive }) => (
                    <>
                      {value.type !== 'set' && (
                        <DropdownItem>
                          <Field>
                            <Control>
                              <Checkbox
                                checked={value.isCover || false}
                                onChange={e =>
                                  handleChange({
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
                      <DropdownItem
                        className="hoverable"
                        onClick={() => {
                          onRemove(index);
                          setActive(false);
                        }}
                      >
                        Delete
                      </DropdownItem>
                    </>
                  )}
                </BasicDropdown>
              </Control>
            </Field>
          </Column>
        </Columns>
      </div>
    );
  }
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
  onRemove: PropTypes.func,
  defaultValue: PropTypes.object,
  index: PropTypes.number,
  error: PropTypes.object,
};

SetlistItemInput.defaultProps = {
  error: {},
};

export default memo(SetlistItemInput);
