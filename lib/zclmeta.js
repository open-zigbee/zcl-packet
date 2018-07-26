const Enum = require('enum');
const zclId = require('zigbee-bridge-definitions');

const zclMeta = require('./defs/zcl_meta.json');
let zclDefs = require('./defs/zcl_defs.json');

const Direction = new Enum(zclDefs.Direction);
zclDefs.Direction = null;
zclDefs = null;

function cloneParamsWithNewFormat(params) {
    let output = [];

    params.forEach(function(item, idx) {
        const newItem = {
            name: Object.keys(item)[0],
            type: null,
        };

        // type is a number
        newItem.type = item[newItem.name];
        output.push(newItem);
    });

    output = paramTypeToString(output);

    return output;
}

function paramTypeToString(params) {
    // params.forEach(function (item, idx) {
    //     var type = zclmeta.ParamType.get(item.type);    // enum | undefined
    //     item.type = type ? type.key : item.type;        // item.type is a string
    // });

    return params;
}

const zclmeta = {
    foundation: {
        get(cmd) {
            const meta = zclMeta.foundation;
            return meta ? meta[cmd] : undefined;
        },

        getParams(cmd) {
            const meta = this.get(cmd);
            // [ { name: type }, .... ]
            const params = meta ? meta.params : meta;

            if (params) {
                return cloneParamsWithNewFormat(params);
            }
        },
    },

    functional: {
        get(cluster, cmd) {
            const meta = zclMeta.functional[cluster];
            return meta ? meta[cmd] : undefined;
            // return: {
            //  dir,
            //  params: [ { name: type }, ... ]
            // }
        },

        getCommand(cluster, dir, cmd) {
            if (dir === 0) {
                // client to server, cmd
                return zclId.functional(cluster, cmd);
            }

            if (dir === 1) {
                // server to client, cmdRsp
                return zclId.getCmdRsp(cluster, cmd);
            }
        },

        getDirection(cluster, cmd) {
            let meta = this.get(cluster, cmd);
            if (meta) {
                meta = zclmeta.Direction.get(meta.dir);
            }

            // return: "Client To Server", "Server To Client"
            return meta ? meta.key : undefined;
        },

        getParams(cluster, cmd) {
            const meta = this.get(cluster, cmd);
            // [ { name: type }, .... ]
            const params = meta ? meta.params : meta;

            if (params) {
                return cloneParamsWithNewFormat(params);
            }
        },
    },

    Direction,
};

module.exports = zclmeta;