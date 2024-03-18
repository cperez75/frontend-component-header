import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { auth, getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';

import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import messages from './messages';

import { useSelector } from 'react-redux';

const LinkedLogo = ({
  href,
  src,
  alt,
  ...attributes
}) => (
  <a href={href} {...attributes}>
    <img className="d-block" src={src} alt={alt} />
  </a>
);

LinkedLogo.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const LearningHeader = ({
  courseOrg, courseNumber, courseTitle, courseId, intl, showUserDropdown,
}) => {
  const { authenticatedUser } = useContext(AppContext);

  /*const {
    courseId,
    proctoringPanelStatus,
  } = useSelector(state => state.courseHome) */

  const headerLogo = (
    <LinkedLogo
      className="logo"
      href={`${getConfig().LMS_BASE_URL}/dashboard`}
      src={getConfig().LOGO_URL}
      alt={getConfig().SITE_NAME}
    />
  );

  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/os-api/api/status/${courseId}/${authenticatedUser.username}`);
        const textData = await response.text();
        setApiResponse(textData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <header className="learning-header">{courseId} / {authenticatedUser.username} / {courseTitle} / {getConfig().GW_URL}
      <div style={{ 'background-color': '#00338d' }}>
        <a className="sr-only sr-only-focusable" href="#main-content">{intl.formatMessage(messages.skipNavLink)}</a>
        <div className="container-xl py-2 d-flex align-items-center">
          {headerLogo}
          <div className="flex-grow-1 course-title-lockup" style={{ lineHeight: 1 }}>
          </div>
          {showUserDropdown && authenticatedUser && (
          <AuthenticatedUserDropdown
            username={authenticatedUser.username}
          />
          )}
          {showUserDropdown && !authenticatedUser && (
          <AnonymousUserMenu />
          )}
        </div>
      </div>
      <div className="container-xl py-2 gw_course_title">
        <div>
          <h1 style={{ 'font-weight': '800', 'text-transform': 'uppercase', 'font-size': '3rem !important', 'margin-bottom': '0px' }}>
            {courseTitle}
          </h1>
        </div>
        <div class="mt-2 mb-2">
            <div class="gw_course_progress">
                <span>Progreso:</span>
                <span id="gw_course_progress_value">{apiResponse}</span>
            </div>
        </div>
      </div>
    </header>
    
  );
};

LearningHeader.propTypes = {
  courseOrg: PropTypes.string,
  courseNumber: PropTypes.string,
  courseTitle: PropTypes.string,
  courseId: PropTypes.string,
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool,
};

LearningHeader.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseId: null,
  courseTitle: null,
  showUserDropdown: true,
};

export default injectIntl(LearningHeader);
