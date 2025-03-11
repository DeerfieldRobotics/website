// @ts-check

const { Namer } = require('@parcel/plugin');
const path = require("path");

module.exports = new Namer({
    name({ bundle }) {
        if (bundle.getMainEntry() && bundle.type === 'png' || bundle.type === 'jpg') {
            // @ts-ignore
            let filePath = bundle.getMainEntry().filePath;
            if (path.basename(filePath).indexOf("favicon.") == 0) {
                return path.basename(filePath);
            }
        }

        // Allow the next namer to handle this bundle.
        return null;
    }
});