import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

//Components
import DeleteModal from '../DeleteModal';

//React Router DOM
import { Link, withRouter } from 'react-router-dom';

function BugPreview(props) {
  const { bug, index, projectId } = props;

  return (
    <div className="bug-preview-container">
      <div>
        <div className="bug-preview">
          <div className="bug-preview-first-div">
            <Link
              to={`/project/${bug.project}/bug/${bug._id}`}
              className="bug-name"
            >
              {bug.name}
            </Link>
            {bug['labels'] &&
              bug.labels.length > 0 &&
              bug.labels.map((label, index) => {
                if (index > 2) {
                  return null;
                } else {
                  return (
                    <div
                      style={{
                        background: `${label.color}`,
                        textAlign: 'center',
                      }}
                      className="bug-label"
                      id={`bug-label-${index}`}
                      key={index}
                    >
                      {label.name}
                    </div>
                  );
                }
              })}
            {bug.status.name === 'New Bug' ? (
              <span className="bug-status" id={`bug-status-${index}`}>
                <i
                  style={{ color: `${bug.status.color}` }}
                  className="fas fa-exclamation"
                ></i>
              </span>
            ) : bug.status.name === 'Work In Progress' ? (
              <span className="bug-status" id={`bug-status-${index}`}>
                <i
                  style={{ color: `${bug.status.color}` }}
                  className="fas fa-truck-loading"
                ></i>
              </span>
            ) : (
              <span className="bug-status" id={`bug-status-${index}`}>
                <i
                  style={{ color: `${bug.status.color}` }}
                  className="fas fa-check"
                ></i>
              </span>
            )}
          </div>
          <div className="bug-preview-second-div">
            <p className="bug-description">{bug.description}</p>
            <i
              className="far fa-trash-alt"
              onClick={() => {
                const element = document.createElement('div');
                element.classList.add('modal-element');
                document.querySelector('#modal-root').appendChild(element);
                ReactDOM.render(
                  <DeleteModal item={bug} type={'bug'} />,
                  element
                );
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(BugPreview);