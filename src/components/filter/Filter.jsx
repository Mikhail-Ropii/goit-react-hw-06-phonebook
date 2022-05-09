import propTypes from 'prop-types';

export const Filter = ({ filter, onChangeFilter }) => {
  return (
    <form>
      <label>
        Find contacts by name
        <input type="text" value={filter} onChange={onChangeFilter} />
      </label>
    </form>
  );
};

Filter.propTypes = {
  filter: propTypes.string,
};
