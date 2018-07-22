# Introduction

## Overview

The **zigbee-bridge-packet** is the packet builder and parser for ZigBee application layer ZCL commands and responses defined by [_ZigBee Cluster Library Specification_](http://www.zigbee.org/download/standards-zigbee-cluster-library/).

## ZigBee Cluster Library

ZCL is a set of clusters and cross-cluster commands defined by the ZigBee Alliance to speed the development and standardization of public profiles. With ZCL, manufacturers are able to quickly build ZigBee products with consistency and compatibility.

A *Cluster* is a related collection of *Commands* and *Attributes*, which together defines an interface to specific functionality. *Commands* are actions a cluster can take. *Attributes* are data or states within a cluster.

### ZCL Foundation
  
Each attribute in a cluster may be read from, written to, and reported over-the-air with cross-cluster ZCL commands. These cross-cluster commands are called *ZCL foundation* commands working across all clusters defined in ZCL.

### ZCL Functional
  
ZCL divides applications into a number of functional domains, such as General, Closures, HVAC, and Lighting. Each functional domain includes a group of well-defined clusters. Commands of these specific clusters are called the *ZCL functional*. ZigBee public profiles use clusters from these functional domains to describe the character and behavior of different kinds of devices.

## Installation

> $ npm install zigbee-bridge-packet --save

## Usage

Require this module:

```js
const zcl = require('zigbee-bridge-packet');
```

Using `.frame()` and `.parse()` methods to build and parse ZCL packets is quite simple. Here are some quick examples:

* Build a ZCL raw buffer

```js
const zclBuf = zcl.frame(
  { frameType: 0, manufSpec: 0, direction: 0, disDefaultRsp: 0 },
  0, 0, 'read', [attrId: 0x0001, ...]
);
```

* Parse a ZCL raw packet into an object

```js
const fooZclPacket = new Buffer([0x00, 0x00, 0x02, ...]);

zcl.parse(fooZclPacket, (err, result) => {
  if (!err) {
    console.log(result);  // The parsed result
  }
});
```