import { useDevetekTranslations } from '@/services/i18n';

import ILLUST_MARKETING_INTRO_1 from '@/shared/assets/illust-marketing-intro-1.png';
import ILLUST_MARKETING_INTRO_2 from '@/shared/assets/illust-marketing-intro-2.png';
import Carousel from '@/shared/presentation/atoms/Carousel';

interface MarketingCarouselItemProps {
  slideKey: string;
  illustSrc: string;
}

const MarketingCarouselItem = (props: MarketingCarouselItemProps) => {
  const { slideKey, illustSrc } = props;

  const t = useDevetekTranslations(`page.landing.marketing`);

  return (
    <div className="overflow-hidden px-3 pb-2 h-full flex flex-col-reverse flex-nowrap not-lg:items-center not-lg:justify-center lg:grid lg:grid-rows-[minmax(0,auto)_minmax(0,1fr)] lg:grid-cols-1 gap-y-2">
      <div className="lg:w-[35%] not-lg:text-center grow-0 shrink">
        <p className="text-primary/70 leading-6 md:text-lg">
          {t.rich(`${slideKey}.message`, {
            b: (node) => <strong>{node}</strong>,
          })}
        </p>
      </div>

      <div className="grow shrink flex flex-col-reverse lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,2fr)] lg:grid-rows-1 gap-x-2">
        <div className="flex flex-col">
          <div className="grow" />

          <h1 className="not-lg:text-center lg:w-[80%] text-3xl md:text-5xl lg:text-7xl leading-8 md:leading-14 lg:leading-19 font-medium text-primary pb-1">
            {t.rich(`${slideKey}.title`, {
              br: () => <br />,
              highlight: (node) => <span className="text-accent">{node}</span>,
            })}
          </h1>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <img
            className="w-[80%] lg:w-full h-full object-scale-down lg:object-bottom-right pb-2 md:pb-5 lg:pb-8"
            src={illustSrc}
          />
        </div>
      </div>
    </div>
  );
};

export default function MarketingCarousel() {
  return (
    <Carousel classNameWrapper="h-full w-full overflow-hidden">
      <Carousel.Item>
        <MarketingCarouselItem
          slideKey="slide1"
          illustSrc={ILLUST_MARKETING_INTRO_1}
        />
      </Carousel.Item>

      <Carousel.Item>
        <MarketingCarouselItem
          slideKey="slide2"
          illustSrc={ILLUST_MARKETING_INTRO_2}
        />
      </Carousel.Item>
    </Carousel>
  );
}
