import React from 'react';
import { Container, Section } from 'bloomer';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';
import GraphqlErrorBoundary from './graphql/GraphqlErrorBoundary';

const Main = ({ children }) => (
  <>
    <Navbar />
    <Section>
      <Container>
        <GraphqlErrorBoundary>{children}</GraphqlErrorBoundary>
      </Container>
    </Section>
    <Footer />
  </>
);

Main.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Main;
