import { useSubscribe } from './-model/events';
import useFavoriteNavigationUsecase from './-usecase/favorite-navigation';

export default function EventController() {
  const [handleFavoriteNavigation] = useFavoriteNavigationUsecase();

  useSubscribe(
    '@servers::detail/favorite-navigation',
    handleFavoriteNavigation,
  );

  return null;
}
