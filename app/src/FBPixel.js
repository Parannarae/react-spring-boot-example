import { Component } from 'react';
import { AuthContext } from './context/auth';

export const pixelEvent = {
    pageView() {
        /* eslint-disable */
        fbq('track', 'PageView');
        /* eslint-enable */
    },    
    pageViewJUGList() {
        /* eslint-disable */
        fbq('trackCustom', 'JUGListPageView');
        /* eslint-enable */
    },
    pageViewLogIn() {
        /* eslint-disable */
        fbq('trackCustom', 'LogInPageView');
        /* eslint-enable */
    }    
}

class PixelComponent extends Component {
    // Get context from the closest Provider
    static contextType = AuthContext;
    
    initPixel() {
        const { authTokens } = this.context;
        let advancedMatching;
        if (authTokens) {
            advancedMatching = {
                external_id: authTokens
            };
        }
        /* eslint-disable */
        fbq('init', 'some-pixel-id', advancedMatching);
        /* eslint-enable */
    }
}

export default PixelComponent;