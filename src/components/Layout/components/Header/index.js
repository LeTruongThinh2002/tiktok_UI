import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleQuestion,
  faEarthAsia,
  faEllipsisVertical,
  faKeyboard,
  faUser,
  faCoins,
  faGear,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';

import NoLessTippy from '@tippyjs/react';

import Button from '../Button';
import 'tippy.js/dist/tippy.css';

import Menu from '~/components/Popper/Menu';
import 'tippy.js/dist/tippy.css';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Images from '~/components/Images';
import Search from '~/components/Search';

const cx = classNames.bind(styles);
const currentUser = true;

const MENU_ITEM = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Vietnamese',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
    title: 'Keyboard shortcuts',
  },
];
function Header() {
  const handleMenuChange = (menuItem) => {
    console.log(menuItem);
    if (menuItem && menuItem.type) {
      switch (menuItem.type) {
        case 'language':
          console.log(menuItem.title);
          break;
        default:
          break;
      }
    }
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
      title: 'View profile',
      to: '/feedback',
    },
    {
      icon: <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEM,
    {
      icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
      title: 'Log out',
      to: '#',
      separate: true,
    },
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <img src={images.logo.default} alt="logo" />
        <Search />
        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <NoLessTippy
                delay={[0, 200]}
                content="Upload video"
                placement="bottom"
              >
                <button className={cx('action-btn')}>
                  <UploadIcon />
                </button>
              </NoLessTippy>
              <NoLessTippy
                delay={[0, 200]}
                content="Messages"
                placement="bottom"
              >
                <button className={cx('action-btn')}>
                  <MessageIcon />
                </button>
              </NoLessTippy>
              <NoLessTippy delay={[0, 200]} content="Inbox" placement="bottom">
                <button className={cx('action-btn')}>
                  <InboxIcon />
                </button>
              </NoLessTippy>
            </>
          ) : (
            <>
              <Button text>Upload</Button>
              <Button primary>Log in</Button>
            </>
          )}
          <Menu
            items={currentUser ? userMenu : MENU_ITEM}
            onChange={handleMenuChange}
          >
            {currentUser ? (
              <Images
              // className={cx('user-avt')}
              // src="htdtps://lh3.googleusercontent.com/a/ACg8ocLTIhAG5grwU-uS-oxk-MnNo-MfzfiQtxRyI2CfFPJZXIQ=s96-c"
              // alt="Nguyen Van A"
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
