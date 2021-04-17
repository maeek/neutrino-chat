import { Button } from '@maeek/neutrino-design/components/atoms/buttons/Button';
import { Input } from '@maeek/neutrino-design/components/atoms/inputs/text';
import { SearchRounded } from '@material-ui/icons';
import MainSearchBarAddButton from './add-button';
import '../styles/search-bar.scss';

export interface MainSearchBarProps {
  [key: string]: any;
}

export const MainSearchBar = (props: MainSearchBarProps) => {

  return (
    <section className="main-search-bar">
      <MainSearchBarAddButton />
      <Input
        placeholder="Search"
        className="main-search-bar-input"
        type="search"
      />
      <Button className="main-search-bar-action">
        <SearchRounded /><span className="main-search-bar-action-text">Search</span>
      </Button>
    </section>
  );
};

export default MainSearchBar;
