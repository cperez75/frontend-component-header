import { getConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';

class APIService {
    
    constructor() {
        const { authenticatedUser } = useContext(AppContext);
        this.username = authenticatedUser.username;
    }

    buildURL = (course_id) => {
        return `/os-api/api/status/${course_id}/${this.username}`
    };

    handleFetch = async (URL, options) => {
        try {
            const response = await fetch(getConfig().API_GW_URL + URL, options);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

        } catch (error) {
            console.error('Hubo un problema con la operación de fetch:', error);
        }
    };

    visit = async (course_id, block_id) => {
        const URL = this.buildURL(course_id, block_id, 'visit');

        await this.handleFetch(URL, {
            method: 'GET'
        });
    };

}
export default APIService;