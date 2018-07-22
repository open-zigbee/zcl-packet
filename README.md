# zigbee-bridge-packet

**zigbee-bridge-packet** is a framer and parser for **Z**igBee **C**luster **L**ibrary (ZCL) **packet** on node.js.

[![Travis branch](https://api.travis-ci.com/open-zigbee/zigbee-bridge-packet.svg?branch=master)](https://travis-ci.com/open-zigbee/zigbee-bridge-packet)
[![npm](https://img.shields.io/npm/v/zigbee-bridge-packet.svg?maxAge=2592000)](https://www.npmjs.com/package/zigbee-bridge-packet)
[![npm](https://img.shields.io/npm/l/zigbee-bridge-packet.svg?maxAge=2592000)](https://www.npmjs.com/package/zigbee-bridge-packet)

## Note

This project is based on the code forked from https://github.com/zigbeer/zcl-packet.

The reason to refactor the project is that the original project has a lot of bugs and flaws, which cannot fulfill the requirement of many projects which are based on it. The official project has not been actively maintained for a long time, so we decided to maintain it by people who are interested in this project and ZigBee technology in general.

Special thanks to [@simenkid](https://github.com/simenkid), [@jackchased](https://github.com/jackchased) and [@hedywings](https://github.com/hedywings) for a great job!

## Overview

The **zigbee-bridge-packet** is the packet builder and parser for ZigBee application layer ZCL commands and responses defined by [_ZigBee Cluster Library Specification_](http://www.zigbee.org/download/standards-zigbee-cluster-library/).

## [Documentation](./docs/README.md)

* [Introduction](./docs/Introduction.md)
* [API](./docs/API.md)
* [Appendix](./docs/Appendix.md)

## Installation

> $ npm install zigbee-bridge-packet --save

## Usage

See [Usage](./docs/Introduction.md#usage) section in the documentation.  

## License

Licensed under [MIT](./LICENSE).
