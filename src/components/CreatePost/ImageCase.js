import { useEffect, useState } from 'react';
import { ReactComponent as CheckIcon } from 'assets/icons/box-slelected-icon.svg';
import {
  BoxWrapper,
  SelectedIcon,
  BoxImage,
  Box,
  SpinnerWrapper,
} from 'components/CreatePost/CaseStyle';
import useRequest from 'hooks/useRequest';
import Spinner from 'components/Spinner/Spinner';

function ImageCase({ handleBackgroundChange }) {
  const { data, isLoading } = useRequest({
    url: `background-images/`,
    method: 'get',
    skip: false,
  });

  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    if (data && data.imageUrls && data.imageUrls.length > 0) {
      handleBackgroundChange('backgroundImageURL', data.imageUrls[0]);
      handleBackgroundChange('backgroundColor', 'beige');
    }
    if (data.imageUrls) {
      setImgs(() => {
        let temp = [];
        for (let i = 0; i < data.imageUrls.length; i++) {
          let newObj = { key: i, src: data.imageUrls[i], alt: '배경이미지' };
          temp.push(newObj);
        }
        return [...temp];
      });
    }
  }, [data]);

  const [currentImageKey, setCurrentImageKey] = useState(0);

  const handleImageChange = (image) => {
    setCurrentImageKey(image.key);
    handleBackgroundChange('backgroundImageURL', image.src);
    handleBackgroundChange('backgroundColor', 'beige');
  };

  return isLoading ? (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  ) : (
    <BoxWrapper>
      {imgs.map((image) => (
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

export default ImageCase;
