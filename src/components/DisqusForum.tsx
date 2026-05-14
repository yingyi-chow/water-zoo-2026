/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';

const DisqusForum = () => {
  useEffect(() => {
    // Check if the script is already loaded to avoid duplicates
    if (document.getElementById('disqus-script')) {
      // If it's already there, we might need to reset it for SPA navigation
      // @ts-ignore
      if (window.DISQUS) {
        // @ts-ignore
        window.DISQUS.reset({
          reload: true,
          config: function () {
            this.page.identifier = window.location.pathname;
            this.page.url = window.location.href;
          }
        });
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'disqus-script';
    script.src = 'https://thirsty-creature.disqus.com/embed.js';
    script.setAttribute('data-timestamp', (+new Date()).toString());
    script.async = true;
    (document.head || document.body).appendChild(script);

    return () => {
      // Cleanup if needed, though Disqus usually stays once loaded
    };
  }, []);

  return (
    <div className="mt-12 p-6 bg-surface-container-lowest rounded-[2rem] shadow-cloud">
      <h3 className="text-2xl font-bold text-on-surface mb-6">Comments</h3>
      <div id="disqus_thread"></div>
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  );
};

export default DisqusForum;
