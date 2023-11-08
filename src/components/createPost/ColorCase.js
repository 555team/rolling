import { useState } from 'react';
import theme from 'styles/theme';
import {
  BoxWrapper,
  SelectedIcon,
  BoxColor,
  Box,
} from 'components/createPost/CaseStyle';
import { ReactComponent as CheckIcon } from 'assets/icons/box-slelected-icon.svg';

function ColorCase() {
  const [currentColor, setCurrentColor] = useState(theme['--orange-200']);

  const COLOR_LIST = [
    {
      key: 0,
      color: theme['--orange-200'],
    },
    {
      key: 1,
      color: theme['--purple-200'],
    },
    {
      key: 2,
      color: theme['--blue-200'],
    },
    {
      key: 3,
      color: theme['--green-200'],
    },
  ];

  const handleColorChange = (color) => {
    setCurrentColor(color);
  };

  return (
    <BoxWrapper>
      {COLOR_LIST.map((color) => (
        <Box
          key={color.key}
          className={currentColor === color.color ? 'selected' : ''}
          onClick={() => {
            handleColorChange(color.color);
          }}
        >
          <BoxColor color={color.color} />
          {currentColor === color.color && (
            <SelectedIcon>
              <CheckIcon />
            </SelectedIcon>
          )}
        </Box>
      ))}
    </BoxWrapper>
  );
}

export default ColorCase;
