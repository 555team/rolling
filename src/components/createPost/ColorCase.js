import { useState } from 'react';
import theme from 'styles/theme';
import {
  BoxWrapper,
  SelectedIcon,
  BoxColor,
  Box,
} from 'components/createPost/CaseStyle';
import { ReactComponent as CheckIcon } from 'assets/icons/box-slelected-icon.svg';
import PropTypes from 'prop-types';

function ColorCase({ handleBackgroundChange }) {
  const [currentColor, setCurrentColor] = useState('beige');

  const handleColorChange = (e, color) => {
    console.log(e.target);
    setCurrentColor(color);
    handleBackgroundChange('backgroundColor', color);
    handleBackgroundChange('backgroundImageURL', '');
  };

  const COLOR_LIST = [
    {
      key: 0,
      color: theme['--orange-200'],
      label: 'beige',
    },
    {
      key: 1,
      color: theme['--purple-200'],
      label: 'purple',
    },
    {
      key: 2,
      color: theme['--blue-200'],
      label: 'blue',
    },
    {
      key: 3,
      color: theme['--green-200'],
      label: 'green',
    },
  ];

  return (
    <BoxWrapper>
      {COLOR_LIST.map((color) => (
        <Box
          key={color.key}
          className={currentColor === color.label ? 'selected' : ''}
          onClick={(e) => {
            handleColorChange(e, color.label);
          }}
        >
          <BoxColor color={color.color} />
          {currentColor === color.label && (
            <SelectedIcon>
              <CheckIcon />
            </SelectedIcon>
          )}
        </Box>
      ))}
    </BoxWrapper>
  );
}

ColorCase.propTypes = {
  handleBackgroundChange: PropTypes.func,
};

export default ColorCase;
