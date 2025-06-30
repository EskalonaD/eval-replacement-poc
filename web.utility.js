/**
 * @param {Express.Response} res : 
 * @param {string} fileName : 
 */
export const prepareJsResponse = (rs, fileName = 'script') => {
    rs.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    rs.setHeader('Content-Type', 'text/javascript');
}

