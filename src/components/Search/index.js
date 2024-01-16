import Tippy from '@tippyjs/react/headless';
import * as searchServices from '~/services/searchServices';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/layouts/components/AccountItem';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { ClearIcon, LoadingIcon, SearchIcon } from '../Icons';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(searchValue, 1000);

  const inputRef = useRef();

  useEffect(() => {
    if (!debounced) {
      setSearchResult([]);
      return;
    }
    setLoading(true);

    const fetchApi = async () => {
      setLoading(true);
      const result = await searchServices.search(debounced);
      setSearchResult(result);
      setLoading(false);
    };
    fetchApi();
  }, [debounced]);
  const handleInputChange = (e) => {
    e.target.value = e.target.value.trimStart();
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };
  const handleHideResult = () => setShowResults(false);

  return (
    <div>
      <Tippy
        interactive
        visible={showResults && searchResult.length > 0}
        delay={[0, 700]}
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Accounts</h4>
              <div>
                {searchResult.map((result) => {
                  return (
                    <span key={result.id} onClick={() => setSearchResult([])}>
                      <AccountItem data={result} />
                    </span>
                  );
                })}
              </div>
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx('search')}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search your fave..."
            spellCheck={false}
            onChange={handleInputChange}
            onFocus={() => setShowResults(true)}
          ></input>
          {!!searchValue && !loading && (
            <button
              onClick={() => {
                handleClear();
              }}
            >
              <ClearIcon className={cx('clear')} />
            </button>
          )}
          {loading && <LoadingIcon className={cx('loading')} />}
          <button
            onMouseDown={(e) => e.preventDefault()}
            className={cx('search-btn')}
          >
            <SearchIcon />
          </button>
        </div>
      </Tippy>
    </div>
  );
}

export default Search;
