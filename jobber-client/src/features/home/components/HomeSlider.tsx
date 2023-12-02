import { FC, ReactElement, useEffect, useState } from 'react';
import { ISliderImagesText } from 'src/shared/shared.interface';
import { sliderImages, sliderImagesText } from 'src/shared/utils/static-data';

import { ISliderState } from '../interfaces/home.interface';

const HomeSlider: FC = (): ReactElement => {
  const [slideState, setSlideState] = useState<ISliderState>({
    slideShow: sliderImages[0],
    slideIndex: 0
  });
  const [sliderInterval, setSliderInterval] = useState<NodeJS.Timeout>();
  const [currentSliderImageText, setCurrentSliderImageText] = useState<ISliderImagesText>(sliderImagesText[0]);

  const { slideIndex, slideShow } = slideState;
  let currentSlideIndex = 0;

  useEffect(() => {
    const timeInterval: NodeJS.Timeout = setInterval(() => {
      autoMoveSlide();
    }, 4000);
    setSliderInterval(timeInterval);

    return () => {
      clearInterval(timeInterval);
      clearInterval(sliderInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const autoMoveSlide = (): void => {
    const lastIndex = currentSlideIndex + 1;
    currentSlideIndex = lastIndex >= sliderImages.length ? 0 : lastIndex;
    setCurrentSliderImageText(sliderImagesText[currentSlideIndex]);
    setSlideState((prev: ISliderState) => ({
      ...prev,
      slideIndex: currentSlideIndex,
      slideShow: sliderImages[currentSlideIndex]
    }));
  };

  return (
    <div className="flex gap-x-8">
      <div className="relative h-96 w-full overflow-hidden bg-red-50">
        <img alt="slider" className="absolute h-96 w-full object-cover transition" src={slideShow} />
        <div className="absolute px-6 py-4">
          <h2 className="text-3xl font-bold text-white">{currentSliderImageText.header}</h2>
          <h4 className="pt-1 text-white font-bold">{currentSliderImageText.subHeader}</h4>
        </div>
        <div className="absolute bottom-0 flex gap-3 px-6 py-4">
          {sliderImages.map((_, index: number) => (
            <div key={index} className={`h-2 w-2 rounded-full ${slideIndex === index ? 'bg-sky-500' : 'bg-gray-300'}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
