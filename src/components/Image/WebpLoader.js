function WebpLoader({ webpSrc, fallbackSrc, alt = 'image' }) {
  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img src={fallbackSrc} alt={alt} />
    </picture>
  );
}

export default WebpLoader;
