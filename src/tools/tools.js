const fs = require("fs");

module.exports = {
    readJSON: function (path)
    {
        let data = fs.readFileSync(path, "utf8");
        return JSON.parse(data);
    },
    writeJSON: function(path, property, value)
    {
        let jsonObj = module.exports.readJSON(path);
        jsonObj[property] = value;
        fs.writeFileSync(path, JSON.stringify(jsonObj, null, 2));
    },
}
