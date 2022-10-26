export interface ICarouselItem {
  id: number;
  title?: {
      first: string;
      second: string;

  };
    subtitle?: string;
    summary?: string;
    link?: string;
    image: string;
    order?: number;
    marginLeft?: number;


}
