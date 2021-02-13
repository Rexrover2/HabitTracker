import ReactHexagon from 'react-hexagon';

export const ExampleHexagon = () => {
  const colourScheme = {
    unselected: {
      stroke: 'lightyellow',
      fill: 'linen',
    },
    selected: {
      stroke: 'yellow',
      fill: 'goldenrod',
    },
  };

  const textPosition = {
    singleDigit: {
      x: '32%',
      y: '60%',
    },
    twoDigit: {
      x: '28%',
      y: '60%',
    },
  };

  const strokeWidth = 50;
  const firstDigit = 1;
  const secondDigit = 31;

  return (
    <div
      style={{ display: 'flex', minWidth: '100%', justifyContent: 'center' }}
    >
      <div
        style={{
          width: '3.1%',
          marginLeft: '0.1em',
        }}
      >
        <ReactHexagon
          flatTop={true}
          style={{
            padding: '0.5em',
            ...colourScheme.selected,
            strokeWidth: strokeWidth,
          }}
        >
          <text
            {...(firstDigit >= 10
              ? textPosition.twoDigit
              : textPosition.singleDigit)}
            fontSize="1000%"
            style={
              {
                /* userSelect: 'none' */
              }
            }
          >
            {firstDigit}
          </text>
        </ReactHexagon>
      </div>
      <div
        style={{
          width: '3.1%',
          marginLeft: '0.1em',
        }}
      >
        <ReactHexagon
          flatTop={true}
          style={{
            padding: '0.5em',
            ...colourScheme.unselected,
            strokeWidth: strokeWidth,
          }}
        >
          <text
            {...(secondDigit >= 10
              ? textPosition.twoDigit
              : textPosition.singleDigit)}
            fontSize="1000%"
            style={
              {
                /* userSelect: 'none' */
              }
            }
          >
            {secondDigit}
          </text>
        </ReactHexagon>
      </div>
    </div>
  );
};

export default ExampleHexagon;
