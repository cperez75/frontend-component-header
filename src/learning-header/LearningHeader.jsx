import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth, getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import messages from './messages';


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
  courseOrg, courseNumber, courseTitle, intl, showUserDropdown,
}) => {
  const { authenticatedUser } = useContext(AppContext);
  const { courseId: courseIdFromUrl } = useParams();

  const headerLogo = (
    <LinkedLogo
      className="logo"
      src={getConfig().LOGO_WHITE_URL}
      alt={getConfig().SITE_NAME}
    />
  );

  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await fetch(`${getConfig().LMS_BASE_URL}/os-api/api/status/${courseIdFromUrl}/${authenticatedUser.username}`);
        const response = await getAuthenticatedHttpClient(`${getConfig().LMS_BASE_URL}/api/course_home/progress/${courseIdFromUrl}`);
        if (response.ok) {
          const json = await response.json();
          setJsonData(json);
          const progress = (json.completion_summary.complete_count * 100) / (json.completion_summary.complete_count + json.completion_summary.incomplete_count);
          setApiResponse(round(progress) + " %");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const progressItem = apiResponse ? (
      <div class="mt-2 mb-2">
          <div class="gw_course_progress">
              <span>Progreso:</span>
              <span id="gw_course_progress_value">{apiResponse}</span>
          </div>
      </div>
  ) : null;

  return (
    <header className="learning-header">
      <div style={{ 'background-color': '#00338d' }}>
        <a className="sr-only sr-only-focusable" href="#main-content">{intl.formatMessage(messages.skipNavLink)}</a>
        <div className="container-xl py-2 d-flex align-items-center">
          {headerLogo}
          <div className="flex-grow-1 course-title-lockup" style={{ lineHeight: 1 }}>
          </div>
          {showUserDropdown && authenticatedUser && (
          <AuthenticatedUserDropdown
            username={authenticatedUser.username} admin={authenticatedUser.administrator}
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
        {progressItem}
      </div>
    </header>
    
  );
};

LearningHeader.propTypes = {
  courseOrg: PropTypes.string,
  courseNumber: PropTypes.string,
  courseTitle: PropTypes.string,
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool,
};

LearningHeader.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true,
};

export default injectIntl(LearningHeader);
