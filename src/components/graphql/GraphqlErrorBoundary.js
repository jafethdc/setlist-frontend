import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Columns, Column, Message, MessageBody } from 'bloomer';

class GraphqlErrorBoundary extends Component {
  state = {
    error: null,
  };

  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (!error) return children;
    return (
      <Columns isCentered>
        <Column isSize="1/2">
          <Message isColor="danger">
            <MessageBody>{error.toString()}</MessageBody>
          </Message>
        </Column>
      </Columns>
    );
  }
}

export default GraphqlErrorBoundary;
