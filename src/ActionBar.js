const ActionBar = ({
  handleShowCountriesClick,
  handleInputChange,
  handlePopulationChage,
  handleClearClick,
  countryName,
  population,
}) => {
  return (
    <>
      <div className="action-bar-wrapper">
        <form className="action-bar-form">
          <input
            placeholder="Country Name"
            className="country-input"
            onChange={handleInputChange}
            value={countryName}
          />
          <select
            className="country-select"
            placeholder="Population"
            onChange={handlePopulationChage}
            value={population}
            defaultValue={0}
          >
            <option hidden disabled value={0}>
              Population
            </option>
            <option value={100000}>{"< 1M"}</option>
            <option value={500000}>{"< 5M"}</option>
            <option value={1000000}>{"< 10M"}</option>
          </select>
          <button className="clear-button" onClick={handleClearClick}>
            Clear
          </button>
        </form>
        <button className="countries-button" onClick={handleShowCountriesClick}>
          Show All Countries
        </button>
      </div>
    </>
  );
};
export default ActionBar;
