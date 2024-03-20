import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Dropdown } from '@openedx/paragon';
import messages from './messages';
var AuthenticatedUserDropdown = function AuthenticatedUserDropdown(_ref) {
  var intl = _ref.intl,
    username = _ref.username,
    admin = _ref.admin;
  var dashboardMenuItem = admin ? /*#__PURE__*/React.createElement(Dropdown.Item, {
    href: "".concat(getConfig().GW_URL, "/gwc/dashboard")
  }, intl.formatMessage(messages.dashboard)) : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Dropdown, {
    className: "user-dropdown ml-3"
  }, /*#__PURE__*/React.createElement(Dropdown.Toggle, {
    variant: "inverse-outline-primary"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faUserCircle,
    className: "d-md-none",
    size: "lg"
  }), /*#__PURE__*/React.createElement("span", {
    "data-hj-suppress": true,
    className: "d-none d-md-inline"
  }, username)), /*#__PURE__*/React.createElement(Dropdown.Menu, {
    className: "dropdown-menu-right"
  }, /*#__PURE__*/React.createElement(Dropdown.Item, {
    href: "".concat(getConfig().GW_URL, "/profile")
  }, intl.formatMessage(messages.profile)), /*#__PURE__*/React.createElement(Dropdown.Item, {
    href: "".concat(getConfig().GW_URL, "/my-courses")
  }, intl.formatMessage(messages.courses)), dashboardMenuItem, /*#__PURE__*/React.createElement(Dropdown.Item, {
    href: getConfig().LOGOUT_URL
  }, intl.formatMessage(messages.signOut)))));
};
AuthenticatedUserDropdown.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string.isRequired
};
export default injectIntl(AuthenticatedUserDropdown);
//# sourceMappingURL=AuthenticatedUserDropdown.js.map