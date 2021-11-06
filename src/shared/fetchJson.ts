const defaultConfig: RequestInit = {
    headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }),
};

const baseFetchJson = (url: string, config = {}) =>
    fetch(url, { ...defaultConfig, ...config }).then((response: Response) => {
        if (response.ok === false) {
            console.log('the response.status', response.statusText);
            throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
    });

 export const fetchJson = (url: string, config = {}) =>
    baseFetchJson(url, config).then((json: any) => {
        const { statusCode, statusMessage } = json;
        if (json.statusCode !== 200) {
            const errorMessage =
                statusCode && statusMessage
                    ? `${json.statusCode}: ${json.statusMessage}`
                    : 'Unknown error occured. Please contact support.';
            throw new Error(errorMessage);

        }

            return json;
       
      
    });