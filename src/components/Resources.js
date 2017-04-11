import React from 'react';
import ResourcesMarkdown from '../markdown/resources.md';

class Resources extends React.Component {
  render() {
    return (
      <div className="homeContent resourcesContent">
        <ResourcesMarkdown />
      </div>
    );
  }
}
export default Resources;
