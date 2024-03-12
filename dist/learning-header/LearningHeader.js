var _excluded = ["href", "src", "alt"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import messages from './messages';
var LinkedLogo = function LinkedLogo(_ref) {
  var href = _ref.href,
    src = _ref.src,
    alt = _ref.alt,
    attributes = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href
  }, attributes), /*#__PURE__*/React.createElement("img", {
    className: "d-block",
    src: src,
    alt: alt
  }));
};
LinkedLogo.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
var _useContext = useContext(AppContext),
  authenticatedUser = _useContext.authenticatedUser;
{/*const [apiResponse, setApiResponse] = useState(null);
 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`/os-api/api/status/${course_id}/${authenticatedUser.username}`);
      const textData = await response.text();
      setApiResponse(textData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
   fetchData();
 }, []);*/}
var LearningHeader = function LearningHeader(_ref2) {
  var courseOrg = _ref2.courseOrg,
    courseNumber = _ref2.courseNumber,
    courseTitle = _ref2.courseTitle,
    intl = _ref2.intl,
    showUserDropdown = _ref2.showUserDropdown;
  //const { authenticatedUser } = useContext(AppContext);

  var headerLogo = /*#__PURE__*/React.createElement(LinkedLogo, {
    className: "logo",
    href: "".concat(getConfig().LMS_BASE_URL, "/dashboard"),
    src: getConfig().LOGO_URL,
    alt: getConfig().SITE_NAME
  });
  return /*#__PURE__*/React.createElement("header", {
    className: "learning-header"
  }, /*#__PURE__*/React.createElement("a", {
    className: "sr-only sr-only-focusable",
    href: "#main-content"
  }, intl.formatMessage(messages.skipNavLink)), /*#__PURE__*/React.createElement("div", {
    className: "container-xl py-2 d-flex align-items-center"
  }, headerLogo, /*#__PURE__*/React.createElement("div", {
    className: "flex-grow-1 course-title-lockup",
    style: {
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "d-block small m-0"
  }, courseOrg, " ", courseNumber), /*#__PURE__*/React.createElement("span", {
    className: "d-block m-0 font-weight-bold course-title"
  }, courseTitle)), showUserDropdown && authenticatedUser && /*#__PURE__*/React.createElement(AuthenticatedUserDropdown, {
    username: authenticatedUser.username
  }), showUserDropdown && !authenticatedUser && /*#__PURE__*/React.createElement(AnonymousUserMenu, null)), /*#__PURE__*/React.createElement("div", {
    "class": "px-5 md:px-10 lg:px-16 xl:px-16",
    className: "gw_course_title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: "font-weight: 800; text-transform: uppercase; font-size: 3rem !important; margin-bottom: 0px;"
  }, courseTitle)), /*#__PURE__*/React.createElement("div", {
    "class": "mt-2 mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    "class": "gw_course_progress"
  }, /*#__PURE__*/React.createElement("span", null, "Progreso:"), /*#__PURE__*/React.createElement("span", {
    id: "gw_course_progress_value"
  }, "4%")))));
};
LearningHeader.propTypes = {
  courseOrg: PropTypes.string,
  courseNumber: PropTypes.string,
  courseTitle: PropTypes.string,
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool
};
LearningHeader.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true
};
export default injectIntl(LearningHeader);
//# sourceMappingURL=LearningHeader.js.map