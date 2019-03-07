import React from 'react';
import { Container, Section } from 'bloomer';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';

const Main = ({ children }) => (
  <>
    <Navbar />
    <Section>
      <Container>{children}</Container>
    </Section>
    <Footer />
  </>
);

Main.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Main;
