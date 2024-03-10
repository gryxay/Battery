import ReactSlider from 'react-slider'
import '../components/Slider.css';

const Filter = ({ price, available, v, A }) => {

  return (
    <div id="filters">
      <>
        {price && (
          <div className='filterCategory'>
            <h6>Kaina</h6>
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                defaultValue={[0, 100]}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                pearling
                minDistance={10}
            />
            <hr />
          </div>
        )}
        {/* Add other filters as needed */}
      </>
    </div>
  );
};

export default Filter;
