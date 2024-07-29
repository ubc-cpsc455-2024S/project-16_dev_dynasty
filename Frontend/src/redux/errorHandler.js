export const errorHandler = (error, callerName) => {
    if (error.message === 'Network Error' && error.name === 'AxiosError') {
        alert(`There's a network error fetching data from backend when trying to ${callerName}`);
    } else {
        console.error(`Error in ${callerName}:`, error);
    }
}

