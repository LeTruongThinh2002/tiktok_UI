import propTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Button({
  to,
  href,
  primary = false,
  outline = false,
  text = false,
  rounded = false,
  disabled = false,
  small = false,
  larger = false,
  leftIcon,
  rightIcon,
  children,
  className,
  onClick,
  ...passProps
}) {
  let Comp = 'button';
  const props = {
    onClick,
    ...passProps,
  };
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  const classes = cx('wrapper', {
    [className]: className,
    primary,
    outline,
    text,
    rounded,
    disabled,
    small,
    larger,
  });
  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
}
Button.propTypes = {
  to: propTypes.string,
  href: propTypes.string,
  primary: propTypes.bool,
  outline: propTypes.bool,
  text: propTypes.bool,
  rounded: propTypes.bool,
  disabled: propTypes.bool,
  small: propTypes.bool,
  larger: propTypes.bool,
  leftIcon: propTypes.node,
  rightIcon: propTypes.node,
  children: propTypes.node.isRequired,
  className: propTypes.string,
  onClick: propTypes.func,
};
export default Button;
