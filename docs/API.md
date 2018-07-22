# API

<!-- TOC -->

- [Methods](#methods)
    - [.frame(frameCntl, manufCode, seqNum, cmd, zclPayload[, clusterId])](#frameframecntl-manufcode-seqnum-cmd-zclpayload-clusterid)
    - [.parse(zclBuf[, clusterId], callback)](#parsezclbuf-clusterid-callback)
    - [.header(zclBuf)](#headerzclbuf)

<!-- /TOC -->

## Methods

### .frame(frameCntl, manufCode, seqNum, cmd, zclPayload[, clusterId])

Generate the raw packet of a ZCL command. Please see [_Section 2.3.1 General ZCL Frame Format_](http://www.zigbee.org/download/standards-zigbee-cluster-library/) in specification for more information.

**Arguments:**

1. `frameCntl` (_Object_): Frame control. Details of each property are given with the following table:

    | Property      | Type  | Mandatory | Description                                        |
    |---------------|-------|-----------|----------------------------------------------------|
    | frameType     | 2-bit | required  | Frame type.                                        |
    | manufSpec     | 1-bit | required  | Manufacturer specific.                             |
    | direction     | 1-bit | required  | Direction.                                         |
    | disDefaultRsp | 1-bit | required  | Disable default response.                          |

2. `manufCode` (_Number_): Manufacturer code, which is an uint16 integer. This field is ignored if `frameCntl.manufSpec` is 0.
3. `seqNum` (_Number_): Sequence number, which is a uint8 integer.
4. `cmd` (_String_ | _Number_): Command id of which command packet you'd like to build.
5. `zclPayload` (_Object_ | _Array_): [ZCL payload](#Appendix) depending on the given command.
6. `clusterId` (_String_ | _Number_): Cluster id. Must be given if `frameCntl.frameType` is 1 (functional command packet).

**Returns:**

* (_Buffer_): Raw buffer of the ZCL packet.

**Examples:**

* Generate a ZCL foundation command packet

```js
// foundation command: 'write'
const foundFrameCntl = {
  frameType: 0,  // Command acts across the entire profile (foundation)
  manufSpec: 0,
  direction: 0,
  disDefaultRsp: 0
};
const foundPayload = [
  { attrId: 0x1234, dataType: 0x41, attrData: 'hello' },
  { attrId: 0xabcd, dataType: 0x24, attrData: [ 100, 2406 ] }
];

const foundBuf = zcl.frame(foundFrameCntl, 0, 0, 'write', foundPayload);
```

* Generate a ZCL functional command packet

```js
// functional command: 'add', cluster: 'genGroups'(0x0004)
const funcFrameCntl = {
  frameType: 1,  // Command is specific to a cluster (functional)
  manufSpec: 1,
  direction: 0,
  disDefaultRsp: 0
};
const funcPayload = {
  groupid: 0x0001,
  groupname: 'group1'
};

const funcBuf = zcl.frame(funcFrameCntl, 0xaaaa, 1, 'add', funcPayload, 0x0004);
```

*************************************************

### .parse(zclBuf[, clusterId], callback)

Parse a ZCL packet into a data object.

**Arguments:**

1. `zclBuf` (_Buffer_): ZCL raw packet to be parsed.
2. `clusterId` (_String_ | _Number_): Cluster id. Must be given if `zclBuf` is a functional command.
3. `callback` (_Function_): `function (err, result) {...}`. Get called when the ZCL packet is parsed. The result is a data object with following properties:

    | Property      | Type    | Description                                        |
    |---------------|---------|----------------------------------------------------|
    | frameCntl     | Object  | Frame type.                                        |
    | manufCode     | Number  | Manufacturer code.                                 |
    | seqNum        | Number  | Sequence number.                                   |
    | cmdId         | String  | Command id.                                        |
    | payload       | Object \| Object[] | [ZCL payload](#Appendix).               |


**Returns:**

* _none_

**Examples:**

* Parse a foundation command packet.

```js
const foundBuf = new Buffer([
  0x00, 0x00, 0x02, 0x34, 0x12, 0x41, 0x05, 0x68,
  0x65, 0x6c, 0x6c, 0x6f, 0xcd, 0xab, 0x24, 0x66,
  0x09, 0x00, 0x00, 0x64
]);

zcl.parse(foundBuf, (err, result) => {
  if (!err) {
    // The parsed result is an object
    console.log(result);
    /*
    {
      frameCntl: { frameType: 0, manufSpec: 0, direction: 0, disDefaultRsp: 0 },
      manufCode: 0,
      seqNum: 0,
      cmdId: 'write',
      payload: [ 
        { attrId: 4660, dataType: 65, attrData: 'hello' },
        { attrId: 43981, dataType: 36, attrData: [100, 2406] }
      ]
    }
    */
  }
});
```

* Parse a functional command packet.

```js
const funcBuf = new Buffer([
  0x05, 0xaa, 0xaa , 0x01, 0x00, 0x01, 0x00, 0x06,
  0x67, 0x72, 0x6f, 0x75, 0x70, 0x31
]);

zcl.parse(funcBuf, 0x0004, (err, result) => {
  if (!err) {
    // The parsed result is an object
    console.log(result);
    /*
    {
      frameCntl: { frameType: 1, manufSpec: 1, direction: 0, disDefaultRsp: 0 },
      manufCode: 43690,
      seqNum: 1,
      cmdId: 'add',
      payload: {
        groupid: 1,
        groupname: 'group1'
      }
    }
    */
  }
});
```

*************************************************

### .header(zclBuf)

Parse the ZCL header only.

**Arguments:**

1. `zclBuf` (_Buffer_): ZCL header buffer to be parsed.

**Returns:**

* (_Object_): ZCL header data.

**Examples:**

```js
const zclBuf = new Buffer([0x05, 0xaa, 0xaa , 0x01, 0x00, ...]);
const header = zcl.header(zclBuf);

console.log(header);
/*
{
  frameCntl: { frameType: 1, manufSpec: 1, direction: 0, disDefaultRsp: 0 },
  manufCode: 43690,
  seqNum: 1,
  cmdId: 0,
}
*/
```