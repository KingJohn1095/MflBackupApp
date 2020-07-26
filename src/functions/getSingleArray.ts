/**
 *
 * @description Takes in data that is either an array, or a single object, and converts it to an array.
 * Useful due to the way MFL returns data from their api
 */

export const getSingleArray = <T>(data: T[] | T) => {
	return data instanceof Array ? data : [data];
};
