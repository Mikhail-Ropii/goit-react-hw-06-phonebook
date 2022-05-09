import propTypes from 'prop-types';

export const ContactItem = ({ name, number }) => {
  return (
    <>
      {name}: {number}
    </>
  );
};

ContactItem.propTypes = {
  name: propTypes.string,
  number: propTypes.string,
};
