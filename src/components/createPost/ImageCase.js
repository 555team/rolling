import { useState } from 'react';
import BackgroundImg1 from 'assets/img/sample_background_01.jpg';
import BackgroundImg2 from 'assets/img/sample_background_02.jpg';
import BackgroundImg3 from 'assets/img/sample_background_03.jpg';
import BackgroundImg4 from 'assets/img/sample_background_04.jpg';
import { ReactComponent as CheckIcon } from 'assets/icons/box-slelected-icon.svg';
import {
  BoxWrapper,
  SelectedIcon,
  BoxImage,
  Box,
} from 'components/createPost/CaseStyle';
import PropTypes from 'prop-types';

function ImageCase({ handleBackgroundChange }) {
  const [currentImage, setCurrentImage] = useState(BackgroundImg1);
  const IMAGE_LIST = [
    { key: 0, src: BackgroundImg1, alt: '샘플 배경 이미지1' },
    { key: 1, src: BackgroundImg2, alt: '샘플 배경 이미지2' },
    { key: 2, src: BackgroundImg3, alt: '샘플 배경 이미지3' },
    { key: 3, src: BackgroundImg4, alt: '샘플 배경 이미지4' },
  ];
  const handleImageChange = (img) => {
    setCurrentImage(img);
    handleBackgroundChange('backgroundImageURL', img);
    handleBackgroundChange('backgroundColor', '');
  };

  return (
    <BoxWrapper>
      {IMAGE_LIST.map((image) => (
        <Box
          key={image.key}
          className={currentImage === image.src ? 'selected' : ''}
          onClick={() => {
            handleImageChange(image.src);
          }}
        >
          <BoxImage src={image.src} alt={image.alt} />
          {currentImage === image.src && (
            <SelectedIcon>
              <CheckIcon />
            </SelectedIcon>
          )}
        </Box>
      ))}
    </BoxWrapper>
  );
}

ImageCase.propTypes = {
  handleBackgroundChange: PropTypes.func,
};

export default ImageCase;
