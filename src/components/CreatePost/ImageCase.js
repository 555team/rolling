import { useEffect, useState } from 'react';
import { ReactComponent as CheckIcon } from 'assets/icons/box-slelected-icon.svg';
import {
  BoxWrapper,
  SelectedIcon,
  BoxImage,
  Box,
} from 'components/CreatePost/CaseStyle';
import PropTypes from 'prop-types';
import useRequest from 'hooks/useRequest';

function ImageCase({ handleBackgroundChange }) {
  const { data } = useRequest({
    url: `background-images/`,
    method: 'get',
    skip: false,
  });

  useEffect(() => {
    if (data && data.imageUrls && data.imageUrls.length > 0) {
      handleBackgroundChange('backgroundImageURL', data.imageUrls[0]);
      handleBackgroundChange('backgroundColor', 'beige');
    }
  }, [data]);

  const [currentImageKey, setCurrentImageKey] = useState(0);

  const IMAGE_LIST = [
    {
      key: 0,
      src: data?.imageUrls[0],
      alt: '배경 이미지1',
    },
    {
      key: 1,
      src: data?.imageUrls[1],
      alt: '배경 이미지2',
    },
    {
      key: 2,
      src: data?.imageUrls[2],
      alt: '배경 이미지3',
    },
    {
      key: 3,
      src: data?.imageUrls[3],
      alt: '배경 이미지4',
    },
  ];

  const handleImageChange = (image) => {
    setCurrentImageKey(image.key);
    handleBackgroundChange('backgroundImageURL', image.src);
    handleBackgroundChange('backgroundColor', 'beige');
  };

  return (
    <BoxWrapper>
      {IMAGE_LIST.map((image) => (
        <Box
          key={image.key}
          className={currentImageKey === image.key ? 'selected' : ''}
          onClick={() => {
            handleImageChange(image);
          }}
        >
          <BoxImage src={image.src} alt={image.alt} />
          {currentImageKey === image.key && (
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
