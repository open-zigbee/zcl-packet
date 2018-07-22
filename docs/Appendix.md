# Appendix

<!-- TOC -->

- [ZCL Foundation Command Reference Table](#zcl-foundation-command-reference-table)
    - [Foundation Command Description Table](#foundation-command-description-table)
    - [Attribute Record Table](#attribute-record-table)
    - [Data Unit Table](#data-unit-table)
- [ZCL Functional Command Reference Table](#zcl-functional-command-reference-table)
    - [General](#general)
    - [Closures](#closures)
    - [HVAC](#hvac)
    - [Lighting](#lighting)
    - [Security and Safety](#security-and-safety)
    - [Protocol Interfaces](#protocol-interfaces)
    - [Home Automation](#home-automation)

<!-- /TOC -->

## ZCL Foundation Command Reference Table

* ZCL foundation commands are used for manipulating attributes and other general tasks that are not specific to an individual cluster.

* Foundation commands are usually used to read/write attributes, attribute record objects should be given within `zclPayload` for `.frame()` to build a ZCL command packet. [Format of an attribute record](#AttrRecTbl) depends on the foundation command.

* Description of each foundation command is documented in [_Section 2.4 General Command Frames_](https://github.com/zigbeer/documents/blob/master/zcl-id/ZIGBEE_CLUSTER_LIBRARY_SPECIFICATION.pdf).

*************************************************

### Foundation Command Description Table

The following table describes what kind of payload format should a foundation command have. Each column in the table tells:

* Cmd-API: Command name.
* CmdId: Command id in number.
* Description: Purpose of the command.
* Payload: Payload should be an array of attribute records if the command is used to manipulate many attributes.
* Parameter Types: Indicates the data type of each property in the payload object.

| Cmd-API             | CmdId | Description                           | Payload                                          | Parameter Types                        |
|---------------------|-------|---------------------------------------|--------------------------------------------------|----------------------------------------|
| read                | 0     | Read attributes                       | `[ `[readRec](#AttrRecTbl)`, ... ]`              | _none_                                 |
| readRsp             | 1     | Read attributes response              | `[ `[readStatusRec](#AttrRecTbl)`, ... ]`        | _none_                                 |
| write               | 2     | Write attributes                      | `[ `[writeRec](#AttrRecTbl)`, ... ]`             | _none_                                 |
| writeUndiv          | 3     | Write attributes undivided            | `[ `[writeRec](#AttrRecTbl)`, ... ]`             | _none_                                 |
| writeRsp            | 4     | Write attributes response             | `[ `[writeStatusRec](#AttrRecTbl),` ... ]`       | _none_                                 |
| writeNoRsp          | 5     | Write attributes no response          | `[ `[writeRec](#AttrRecTbl)`, ... ]`             | _none_                                 |
| configReport        | 6     | Configure reporting                   | `[ `[cfgRptRec](#AttrRecTbl)`, ... ]`            | _none_                                 |
| configReportRsp     | 7     | Configure reporting response          | `[ `[cfgRptStatusRec](#AttrRecTbl)`, ... ]`      | _none_                                 |
| readReportConfig    | 8     | Read reporting configuration          | `[ `[readRptRec](#AttrRecTbl)`, ... ]`           | _none_                                 |
| readReportConfigRsp | 9     | Read reporting configuration response | `[ `[readRptStatusRec](#AttrRecTbl)`, ... ]`     | _none_                                 |
| report              | 10    | Report attributes                     | `[ `[reportRec](#AttrRecTbl)`, ... ]`            | _none_                                 |
| defaultRsp          | 11    | Default response                      | `{ cmdId, statusCode }`                          | uint8, uint8                           |
| discover            | 12    | Discover attributes                   | `{ startAttrId, maxAttrIds }`                    | uint16, uint8                          |
| discoverRsp         | 13    | Discover attributes response          | `{ discComplete, attrInfos }`                    | uint16, array([attrInfo](#AttrRecTbl)) |
| readStruct          | 14    | Read attributes structured            | `[ `[readStructRec](#AttrRecTbl)`, ... ]`        | _none_                                 |
| writeStruct         | 15    | Write attributes structured           | `[ `[writeStructRec](#AttrRecTbl)`, ... ]`       | _none_                                 |
| writeStructRsp      | 16    | Write attributes structured response  | `[ `[writeStructStstusRec](#AttrRecTbl)`, ... ]` | _none_                                 |

*************************************************

### Attribute Record Table

The following table lists each kind of the attribute records.

**Note:** Field types of `multi` and `selector` are given in [Data Unit Table](#DataUnitTbl).

| Cmd-API              | Field Names                                                  | Field Types                                                    | Judge Field  | Additional Field Names                                  | Additional Field Types                     |
|----------------------|--------------------------------------------------------------|----------------------------------------------------------------|--------------|---------------------------------------------------------|--------------------------------------------|
| readRec              | `{ attrId }`                                                 | uint16                                                         | _none_       | _none_                                                  | _none_                                     |
| readStatusRec        | `{ attrId, status }`                                         | uint16, uint8                                                  | status(0)    | `{ dataType, attrData }`                                | uint8, [multi](#DataUnitTbl)               |
|                      |                                                              |                                                                | status(1)    | _none_                                                  | _none_                                     |
| writeRec             | `{ attrId, dataType, attrData }`                             | uint16, uin8, [multi](#DataUnitTbl)                            | _none_       | _none_                                                  | _none_                                     |
| writeStatusRec       | `{ status, attrId }`                                         | uint8, uint16                                                  | _none_       | _none_                                                  | _none_                                     |
| cfgRptRec            | `{ direction, attrId }`                                      | uint8, uint16                                                  | direction(0) | `{ dataType, minRepIntval, maxRepIntval, [repChange] }` | uint8, uint16, uint16, depends(`dataType`) |
|                      |                                                              |                                                                | direction(1) | `{ timeout }`                                           | uint16                                     |
| cfgRptStatusRec      | `{ status, direction, attrId }`                              | uint8, uint8, uint16                                           | _none_       | _none_                                                  | _none_                                     |
| readRptRec           | `{ direction, attrId }`                                      | uint8, uint16                                                  | _none_       | _none_                                                  | _none_                                     |
| readRptStatusRec     | `{ status, direction, attrId }`                              | uint8, uint8, uint16                                           | status(0)    | `{ dataType, minRepIntval, maxRepIntval, [repChange] }` | uint8, uint16, uint16, depends(`dataType`) |
|                      |                                                              |                                                                | status(1)    | `{ timeout }`                                           | uint16                                     |
| reportRec            | `{ attrId, dataType, attrData }`                             | uint16, uin8, [multi](#DataUnitTbl)                            | _none_       | _none_                                                  | _none_                                     |
| attrInfo             | `{ attrId, dataType }`                                       | uint16, uint8                                                  | _none_       | _none_                                                  | _none_                                     |
| readStructRec        | `{ attrId, `[selector](#DataUnitTbl)` }`                     | uint16, [selector](#DataUnitTbl)                               | _none_       | _none_                                                  | _none_                                     |
| writeStructRec       | `{ attrId, `[selector](#DataUnitTbl)`, dataType, attrData }` | uint16, [selector](#DataUnitTbl), uint8, [multi](#DataUnitTbl) | _none_       | _none_                                                  | _none_                                     |
| writeStructStstusRec | `{ status, attrId, `[selector](#DataUnitTbl)` }`             | uint8, attrId, [selector](#DataUnitTbl)                        | _none_       | _none_                                                  | _none_                                     |

*************************************************

### Data Unit Table

| Data Unit | Judge Field                     | Field Names                     | Field Types                              |
|-----------|---------------------------------|---------------------------------|------------------------------------------|
| multi     | dataType(`array`, `set`, `bag`) | `{ elmType, numElms, elmVals }` | uint8, uint16, array(depends(`elmType`)) |
|           | dataType(`struct`)              | `{ numElms, structElms }`       | uint16, array(`struct`)                  |
| selector  | _none_                          | `{ indicator, indexes }`        | uint8, array(depends(`indicator`))       |
| struct    | _none_                          | `{ elmType, elmVal }`           | uint8, depends(`elmType`)                |

## ZCL Functional Command Reference Table

The following table describes the payload format of functional commands. Each column in the table is:

* Cluster: Cluster name.
* Cmd-API: Command name.
* CmdId: Command id in number.
* Direction: Tells whether a command is sent from **client-to-server (c2s)** or from **server-to-client (s2c)**.
* Arguments: Required parameters of a Cmd-API.

**Functional domains:**

* [General](#GenTbl)
* [Closures](#ClosuresTbl)
* [HVAC](#HvacTbl)
* [Lighting](#LightingTbl)
* [Security and Safety](#SsTbl)
* [Protocol Interfaces](#PiTbl)
* [Home Automation](#HaTbl)

*************************************************

### General

| Cluster          | Cmd-API                 | CmdId | Direction | Arguments                                                                                                           |
|------------------|-------------------------|-------|-----------|---------------------------------------------------------------------------------------------------------------------|
| genBasic         | resetFactDefault        | 0     | c2s       | `{ }`                                                                                                               |
| genIdentify      | identify                | 0     | c2s       | `{ identifytime }`                                                                                                  |
|                  | identifyQuery           | 1     | c2s       | `{ }`                                                                                                               |
|                  | ezmodeInvoke            | 2     | c2s       | `{ action }`                                                                                                        |
|                  | updateCommissionState   | 3     | c2s       | `{ action, commstatemask }`                                                                                         |
|                  | triggerEffect           | 64    | c2s       | `{ effectid, effectvariant }`                                                                                       |
|                  | identifyQueryRsp        | 0     | s2c       | `{ timeout }`                                                                                                       |
| genGroups        | add                     | 0     | c2s       | `{ groupid, groupname }`                                                                                            |
|                  | view                    | 1     | c2s       | `{ groupid }`                                                                                                       |
|                  | getMembership           | 2     | c2s       | `{ groupcount, grouplist }`                                                                                         |
|                  | remove                  | 3     | c2s       | `{ groupid }`                                                                                                       |
|                  | removeAll               | 4     | c2s       | `{ }`                                                                                                               |
|                  | addIfIdentifying        | 5     | c2s       | `{ groupid, groupname }`                                                                                            |
|                  | addRsp                  | 0     | s2c       | `{ status, groupid }`                                                                                               |
|                  | viewRsp                 | 1     | s2c       | `{ status, groupid, groupname }`                                                                                    |
|                  | getMembershipRsp        | 2     | s2c       | `{ capacity, groupcount, grouplist }`                                                                               |
|                  | removeRsp               | 3     | s2c       | `{ status, groupid }`                                                                                               |
| genScenes        | add                     | 0     | c2s       | `{ groupid, sceneid, transtime, scenename, extensionfieldsets }`                                                    |
|                  | view                    | 1     | c2s       | `{ groupid, sceneid }`                                                                                              |
|                  | remove                  | 2     | c2s       | `{ groupid, sceneid }`                                                                                              |
|                  | removeAll               | 3     | c2s       | `{ groupid }`                                                                                                       |
|                  | store                   | 4     | c2s       | `{ groupid, sceneid }`                                                                                              |
|                  | recall                  | 5     | c2s       | `{ groupid, sceneid }`                                                                                              |
|                  | getSceneMembership      | 6     | c2s       | `{ groupid }`                                                                                                       |
|                  | enhancedAdd             | 64    | c2s       | `{ groupid, sceneid, transtime, scenename, extensionfieldsets }`                                                    |
|                  | enhancedView            | 65    | c2s       | `{ groupid, sceneid }`                                                                                              |
|                  | copy                    | 66    | c2s       | `{ mode, groupidfrom, sceneidfrom, groupidto, sceneidto }`                                                          |
|                  | addRsp                  | 0     | s2c       | `{ status, groupId, sceneId }`                                                                                      |
|                  | viewRsp                 | 1     | s2c       | `{ status, groupid, sceneid, transtime, scenename, extensionfieldsets }`                                            |
|                  | removeRsp               | 2     | s2c       | `{ status, groupid, sceneid }`                                                                                      |
|                  | removeAllRsp            | 3     | s2c       | `{ status, groupid }`                                                                                               |
|                  | storeRsp                | 4     | s2c       | `{ status, groupid, sceneid }`                                                                                      |
|                  | getSceneMembershipRsp   | 6     | s2c       | `{ status, capacity, groupid, scenecount, scenelist }`                                                              |
|                  | enhancedAddRsp          | 64    | s2c       | `{ }`                                                                                                               |
|                  | enhancedViewRsp         | 65    | s2c       | `{ status, groupid, sceneid, transtime, scenename, extensionfieldsets }`                                            |
|                  | copyRsp                 | 66    | s2c       | `{ status, groupidfrom, sceneidfrom }`                                                                              |
| genOnOff         | off                     | 0     | c2s       | `{ }`                                                                                                               |
|                  | on                      | 1     | c2s       | `{ }`                                                                                                               |
|                  | toggle                  | 2     | c2s       | `{ }`                                                                                                               |
|                  | offWithEffect           | 64    | c2s       | `{ effectid, effectvariant }`                                                                                       |
|                  | onWithRecallGlobalScene | 65    | c2s       | `{ }`                                                                                                               |
|                  | onWithTimedOff          | 66    | c2s       | `{ ctrlbits, ctrlbyte, ontime, offwaittime }`                                                                       |
| genLevelCtrl     | moveToLevel             | 0     | c2s       | `{ level, transtime }`                                                                                              |
|                  | move                    | 1     | c2s       | `{ movemode, rate }`                                                                                                |
|                  | step                    | 2     | c2s       | `{ stepmode, stepsize, transtime }`                                                                                 |
|                  | stop                    | 3     | c2s       | `{ }`                                                                                                               |
|                  | moveToLevelWithOnOff    | 4     | c2s       | `{ level, transtime }`                                                                                              |
|                  | moveWithOnOff           | 5     | c2s       | `{ movemode, rate }`                                                                                                |
|                  | stepWithOnOff           | 6     | c2s       | `{ stepmode, stepsize, transtime }`                                                                                 |
|                  | stopWithOnOff           | 7     | c2s       | `{ }`                                                                                                               |
| genAlarms        | reset                   | 0     | c2s       | `{ alarmcode, clusterid }`                                                                                          |
|                  | resetAll                | 1     | c2s       | `{ }`                                                                                                               |
|                  | get                     | 2     | c2s       | `{ }`                                                                                                               |
|                  | resetLog                | 3     | c2s       | `{ }`                                                                                                               |
|                  | publishEventLog         | 4     | c2s       | `{ }`                                                                                                               |
|                  | alarm                   | 0     | s2c       | `{ alarmcode, clusterid }`                                                                                          |
|                  | getRsp                  | 1     | s2c       | `{ status, alarmcode, clusterid, timestamp }`                                                                       |
|                  | getEventLog             | 2     | s2c       | `{ }`                                                                                                               |
| genRssiLocation  | setAbsolute             | 0     | c2s       | `{ coord1, coord2, coord3, power, pathlossexponent }`                                                               |
|                  | setDevCfg               | 1     | c2s       | `{ power, pathlossexponent, calperiod, numrssimeasurements, reportingperiod }`                                      |
|                  | getDevCfg               | 2     | c2s       | `{ targetaddr }`                                                                                                    |
|                  | getData                 | 3     | c2s       | `{ getdatainfo, numrsp, targetaddr }`                                                                               |
|                  | devCfgRsp               | 0     | s2c       | `{ status, power, pathlossexp, calperiod, numrssimeasurements, reportingperiod }`                                   |
|                  | dataRsp                 | 1     | s2c       | `{ status, locationtype, coord1, coord2, coord3, power, pathlossexp, locationmethod, qualitymeasure, locationage }` |
|                  | dataNotif               | 2     | s2c       | `{ locationtype, coord1, coord2, coord3, power, pathlossexp, locationmethod, qualitymeasure, locationage }`         |
|                  | compactDataNotif        | 3     | s2c       | `{ locationtype, coord1, coord2, coord3, qualitymeasure, locationage }`                                             |
|                  | rssiPing                | 4     | s2c       | `{ locationtype }`                                                                                                  |
| genCommissioning | restartDevice           | 0     | c2s       | `{ options, delay, jitter }`                                                                                        |
|                  | saveStartupParams       | 1     | c2s       | `{ options, index }`                                                                                                |
|                  | restoreStartupParams    | 2     | c2s       | `{ options, index }`                                                                                                |
|                  | resetStartupParams      | 3     | c2s       | `{ options, index }`                                                                                                |
|                  | restartDeviceRsp        | 0     | s2c       | `{ status }`                                                                                                        |
|                  | saveStartupParamsRsp    | 1     | s2c       | `{ status }`                                                                                                        |
|                  | restoreStartupParamsRsp | 2     | s2c       | `{ status }`                                                                                                        |
|                  | resetStartupParamsRsp   | 3     | s2c       | `{ status }`                                                                                                        |

*************************************************

### Closures

| Cluster                | Cmd-API                      | CmdId | Direction | Arguments                                                                                         |
|------------------------|------------------------------|-------|-----------|---------------------------------------------------------------------------------------------------|
| closuresDoorLock       | lockDoor                     | 0     | c2s       | `{ pincodevalue }`                                                                                |
|                        | unlockDoor                   | 1     | c2s       | `{ pincodevalue }`                                                                                |
|                        | toggleDoor                   | 2     | c2s       | `{ pincodevalue }`                                                                                |
|                        | unlockWithTimeout            | 3     | c2s       | `{ timeout, pincodevalue }`                                                                       |
|                        | getLogRecord                 | 4     | c2s       | `{ logindex }`                                                                                    |
|                        | setPinCode                   | 5     | c2s       | `{ userid, userstatus, usertype, pincodevalue }`                                                  |
|                        | getPinCode                   | 6     | c2s       | `{ userid }`                                                                                      |
|                        | clearPinCode                 | 7     | c2s       | `{ userid }`                                                                                      |
|                        | clearAllPinCodes             | 8     | c2s       | `{ }`                                                                                             |
|                        | setUserStatus                | 9     | c2s       | `{ userid, userstatus }`                                                                          |
|                        | getUserStatus                | 10    | c2s       | `{ userid }`                                                                                      |
|                        | setWeekDaySchedule           | 11    | c2s       | `{ scheduleid, userid, daysmask, starthour, startminute, endhour, endminute }`                    |
|                        | getWeekDaySchedule           | 12    | c2s       | `{ scheduleid, userid }`                                                                          |
|                        | clearWeekDaySchedule         | 13    | c2s       | `{ scheduleid, userid }`                                                                          |
|                        | setYearDaySchedule           | 14    | c2s       | `{ scheduleid, userid, zigbeelocalstarttime, zigbeelocalendtime }`                                |
|                        | getYearDaySchedule           | 15    | c2s       | `{ scheduleid, userid }`                                                                          |
|                        | clearYearDaySchedule         | 16    | c2s       | `{ scheduleid, userid }`                                                                          |
|                        | setHolidaySchedule           | 17    | c2s       | `{ holidayscheduleid, zigbeelocalstarttime, zigbeelocalendtime, opermodelduringholiday }`         |
|                        | getHolidaySchedule           | 18    | c2s       | `{ holidayscheduleid }`                                                                           |
|                        | clearHolidaySchedule         | 19    | c2s       | `{ holidayscheduleid }`                                                                           |
|                        | setUserType                  | 20    | c2s       | `{ userid, usertype }`                                                                            |
|                        | getUserType                  | 21    | c2s       | `{ userid }`                                                                                      |
|                        | setRfidCode                  | 22    | c2s       | `{ userid, userstatus, usertype, pincodevalue }`                                                  |
|                        | getRfidCode                  | 23    | c2s       | `{ userid }`                                                                                      |
|                        | clearRfidCode                | 24    | c2s       | `{ userid }`                                                                                      |
|                        | clearAllRfidCodes            | 25    | c2s       | `{ }`                                                                                             |
|                        | lockDoorRsp                  | 0     | s2c       | `{ status }`                                                                                      |
|                        | unlockDoorRsp                | 1     | s2c       | `{ status }`                                                                                      |
|                        | toggleDoorRsp                | 2     | s2c       | `{ status }`                                                                                      |
|                        | unlockWithTimeoutRsp         | 3     | s2c       | `{ status }`                                                                                      |
|                        | getLogRecordRsp              | 4     | s2c       | `{ logentryid, timestamp, eventtype, source, eventidalarmcode, userid, pincodevalue }`            |
|                        | setPinCodeRsp                | 5     | s2c       | `{ status }`                                                                                      |
|                        | getPinCodeRsp                | 6     | s2c       | `{ userid, userstatus, usertype, pincodevalue }`                                                  |
|                        | clearPinCodeRsp              | 7     | s2c       | `{ status }`                                                                                      |
|                        | clearAllPinCodesRsp          | 8     | s2c       | `{ status }`                                                                                      |
|                        | setUserStatusRsp             | 9     | s2c       | `{ status }`                                                                                      |
|                        | getUserStatusRsp             | 10    | s2c       | `{ userid, userstatus }`                                                                          |
|                        | setWeekDayScheduleRsp        | 11    | s2c       | `{ status }`                                                                                      |
|                        | getWeekDayScheduleRsp        | 12    | s2c       | `{ scheduleid, userid, status, daysmask, starthour, startminute, endhour, endminute }`            |
|                        | clearWeekDayScheduleRsp      | 13    | s2c       | `{ status }`                                                                                      |
|                        | setYearDayScheduleRsp        | 14    | s2c       | `{ status }`                                                                                      |
|                        | getYearDayScheduleRsp        | 15    | s2c       | `{ scheduleid, userid, status, zigbeelocalstarttime, zigbeelocalendtime }`                        |
|                        | clearYearDayScheduleRsp      | 16    | s2c       | `{ status }`                                                                                      |
|                        | setHolidayScheduleRsp        | 17    | s2c       | `{ status }`                                                                                      |
|                        | getHolidayScheduleRsp        | 18    | s2c       | `{ holidayscheduleid, status, zigbeelocalstarttime, zigbeelocalendtime, opermodelduringholiday }` |
|                        | clearHolidayScheduleRsp      | 19    | s2c       | `{ status }`                                                                                      |
|                        | setUserTypeRsp               | 20    | s2c       | `{ status }`                                                                                      |
|                        | getUserTypeRsp               | 21    | s2c       | `{ userid, usertype }`                                                                            |
|                        | setRfidCodeRsp               | 22    | s2c       | `{ status }`                                                                                      |
|                        | getRfidCodeRsp               | 23    | s2c       | `{ userid, userstatus, usertype, pincodevalue }`                                                  |
|                        | clearRfidCodeRsp             | 24    | s2c       | `{ status }`                                                                                      |
|                        | clearAllRfidCodesRsp         | 25    | s2c       | `{ status }`                                                                                      |
|                        | operationEventNotification   | 32    | s2c       | `{ opereventsrc, opereventcode, userid, pin, zigbeelocaltime, data }`                             |
|                        | programmingEventNotification | 33    | s2c       | `{ programeventsrc, programeventcode, userid, pin, usertype, userstatus, zigbeelocaltime, data }` |
| closuresWindowCovering | upOpen                       | 0     | c2s       | `{ }`                                                                                             |
|                        | downClose                    | 1     | c2s       | `{ }`                                                                                             |
|                        | stop                         | 2     | c2s       | `{ }`                                                                                             |
|                        | goToLiftValue                | 4     | c2s       | `{ liftvalue }`                                                                                   |
|                        | goToLiftPercentage           | 5     | c2s       | `{ percentageliftvalue }`                                                                         |
|                        | goToTiltValue                | 7     | c2s       | `{ tiltvalue }`                                                                                   |
|                        | goToTiltPercentage           | 8     | c2s       | `{ percentagetiltvalue }`                                                                         |

*************************************************

### HVAC

| Cluster        | Cmd-API              | CmdId | Direction | Arguments                                                                  |
|----------------|----------------------|-------|-----------|----------------------------------------------------------------------------|
| hvacThermostat | setpointRaiseLower   | 0     | c2s       | `{ mode, amount }`                                                         |
|                | setWeeklySchedule    | 1     | c2s       | `{ numoftrans, dayofweek, mode, thermoseqmode }`                           |
|                | getWeeklySchedule    | 2     | c2s       | `{ daystoreturn, modetoreturn }`                                           |
|                | clearWeeklySchedule  | 3     | c2s       | `{ }`                                                                      |
|                | getRelayStatusLog    | 4     | c2s       | `{ }`                                                                      |
|                | getWeeklyScheduleRsp | 0     | s2c       | `{ numoftrans, dayofweek, mode, thermoseqmode }`                           |
|                | getRelayStatusLogRsp | 1     | s2c       | `{ timeofday, relaystatus, localtemp, humidity, setpoint, unreadentries }` |

*************************************************

### Lighting

| Cluster           | Cmd-API                        | CmdId | Direction | Arguments                                            |
|-------------------|--------------------------------|-------|-----------|------------------------------------------------------|
| lightingColorCtrl | moveToHue                      | 0     | c2s       | `{ hue, direction, transtime }`                      |
|                   | moveHue                        | 1     | c2s       | `{ movemode, rate }`                                 |
|                   | stepHue                        | 2     | c2s       | `{ stepmode, stepsize, transtime }`                  |
|                   | moveToSaturation               | 3     | c2s       | `{ saturation, transtime }`                          |
|                   | moveSaturation                 | 4     | c2s       | `{ movemode, rate }`                                 |
|                   | stepSaturation                 | 5     | c2s       | `{ stepmode, stepsize, transtime }`                  |
|                   | moveToHueAndSaturation         | 6     | c2s       | `{ hue, saturation, transtime }`                     |
|                   | moveToColor                    | 7     | c2s       | `{ colorx, colory, transtime }`                      |
|                   | moveColor                      | 8     | c2s       | `{ ratex, ratey }`                                   |
|                   | stepColor                      | 9     | c2s       | `{ stepx, stepy, transtime }`                        |
|                   | moveToColorTemp                | 10    | c2s       | `{ colortemp, transtime }`                           |
|                   | enhancedMoveToHue              | 64    | c2s       | `{ enhancehue, direction, transtime }`               |
|                   | enhancedMoveHue                | 65    | c2s       | `{ movemode, rate }`                                 |
|                   | enhancedStepHue                | 66    | c2s       | `{ stepmode, stepsize, transtime }`                  |
|                   | enhancedMoveToHueAndSaturation | 67    | c2s       | `{ enhancehue, saturation, transtime }`              |
|                   | colorLoopSet                   | 68    | c2s       | `{ bits, bytee, action, direction, time, starthue }` |
|                   | stopMoveStep                   | 71    | c2s       | `{ bits, bytee, action, direction, time, starthue }` |

*************************************************

### Security and Safety

| Cluster   | Cmd-API                  | CmdId | Direction | Arguments                                                                                                                                                                                                                                                                                                                  |
|-----------|--------------------------|-------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ssIasZone | enrollRsp                | 0     | c2s       | `{ enrollrspcode, zoneid }`                                                                                                                                                                                                                                                                                                |
|           | statusChangeNotification | 0     | s2c       | `{ zonestatus, extendedstatus }`                                                                                                                                                                                                                                                                                           |
|           | enrollReq                | 1     | s2c       | `{ zonetype, manucode }`                                                                                                                                                                                                                                                                                                   |
| ssIasAce  | arm                      | 0     | c2s       | `{ armmode }`                                                                                                                                                                                                                                                                                                              |
|           | bypass                   | 1     | c2s       | `{ numofzones, zoneidlist }`                                                                                                                                                                                                                                                                                               |
|           | emergency                | 2     | c2s       | `{ }`                                                                                                                                                                                                                                                                                                                      |
|           | fire                     | 3     | c2s       | `{ }`                                                                                                                                                                                                                                                                                                                      |
|           | panic                    | 4     | c2s       | `{ }`                                                                                                                                                                                                                                                                                                                      |
|           | getZoneIDMap             | 5     | c2s       | `{ }`                                                                                                                                                                                                                                                                                                                      |
|           | getZoneInfo              | 6     | c2s       | `{ zoneid }`                                                                                                                                                                                                                                                                                                               |
|           | getPanelStatus           | 7     | c2s       | `{ }`                                                                                                                                                                                                                                                                                                                      |
|           | getBypassedZoneList      | 8     | c2s       | `{ }`                                                                                                                                                                                                                                                                                                                      |
|           | getZoneStatus            | 9     | c2s       | `{ startzoneid, maxnumzoneid, zonestatusmaskflag, zonestatusmask }`                                                                                                                                                                                                                                                        |
|           | armRsp                   | 0     | s2c       | `{ armnotification }`                                                                                                                                                                                                                                                                                                      |
|           | getZoneIDMapRsp          | 1     | s2c       | `{ zoneidmapsection0, zoneidmapsection1, zoneidmapsection2, zoneidmapsection3, zoneidmapsection4, zoneidmapsection5, zoneidmapsection6, zoneidmapsection7, zoneidmapsection8, zoneidmapsection9, zoneidmapsection10, zoneidmapsection11, zoneidmapsection12, zoneidmapsection13, zoneidmapsection14, zoneidmapsection15 }` |
|           | getZoneInfoRsp           | 2     | s2c       | `{ zoneid, zonetype, ieeeaddr }`                                                                                                                                                                                                                                                                                           |
|           | zoneStatusChanged        | 3     | s2c       | `{ zoneid, zonestatus, audiblenotif, strlen, string }`                                                                                                                                                                                                                                                                     |
|           | panelStatusChanged       | 4     | s2c       | `{ panelstatus, secondsremain, audiblenotif, alarmstatus }`                                                                                                                                                                                                                                                                |
|           | getPanelStatusRsp        | 5     | s2c       | `{ panelstatus, secondsremain, audiblenotif, alarmstatus }`                                                                                                                                                                                                                                                                |
|           | setBypassedZoneList      | 6     | s2c       | `{ numofzones, zoneid }`                                                                                                                                                                                                                                                                                                   |
|           | bypassRsp                | 7     | s2c       | `{ numofzones, bypassresult }`                                                                                                                                                                                                                                                                                             |
|           | getZoneStatusRsp         | 8     | s2c       | `{ zonestatuscomplete, numofzones, zoneinfo }`                                                                                                                                                                                                                                                                             |
| ssIasWd   | startWarning             | 0     | c2s       | `{ startwarninginfo, warningduration }`                                                                                                                                                                                                                                                                                    |
|           | squawk                   | 1     | c2s       | `{ squawkinfo }`                                                                                                                                                                                                                                                                                                           |

*************************************************

### Protocol Interfaces

| Cluster                | Cmd-API               | CmdId | Direction | Arguments                       |
|------------------------|-----------------------|-------|-----------|---------------------------------|
| piGenericTunnel        | matchProtocolAddr     | 0     | c2s       | `{ protocoladdr }`              |
|                        | matchProtocolAddrRsp  | 0     | s2c       | `{ devieeeaddr, protocoladdr }` |
|                        | advertiseProtocolAddr | 1     | s2c       | `{ protocoladdr }`              |
| piBacnetProtocolTunnel | transferNPDU          | 0     | c2s       | `{ npdu }`                      |

*************************************************

### Home Automation

| Cluster                 | Cmd-API                  | CmdId | Direction | Arguments                                                                              |
|-------------------------|--------------------------|-------|-----------|----------------------------------------------------------------------------------------|
| haApplianceEventsAlerts | getAlerts                | 0     | c2s       | `{ }`                                                                                  |
|                         | getAlertsRsp             | 0     | s2c       | `{ alertscount, aalert }`                                                              |
|                         | alertsNotification       | 1     | s2c       | `{ alertscount, aalert }`                                                              |
|                         | eventNotification        | 2     | s2c       | `{ eventheader, eventid }`                                                             |
| haApplianceStatistics   | log                      | 0     | c2s       | `{ logid }`                                                                            |
|                         | logQueue                 | 1     | c2s       | `{ }`                                                                                  |
|                         | logNotification          | 0     | s2c       | `{ timestamp, logid, loglength, logpayload }`                                          |
|                         | logRsp                   | 1     | s2c       | `{ timestamp, logid, loglength, logpayload }`                                          |
|                         | logQueueRsp              | 2     | s2c       | `{ logqueuesize, logid }`                                                              |
|                         | statisticsAvailable      | 3     | s2c       | `{ logqueuesize, logid }`                                                              |
| haElectricalMeasurement | getProfileInfo           | 0     | c2s       | `{ }`                                                                                  |
|                         | getMeasurementProfile    | 1     | c2s       | `{ attrId, starttime, numofuntervals }`                                                |
|                         | getProfileInfoRsp        | 0     | s2c       | `{ profilecount, profileintervalperiod, maxnumofintervals, numofattrs, listofattr }`   |
|                         | getMeasurementProfileRsp | 1     | s2c       | `{ starttime, status, profileintervalperiod, numofintervalsdeliv, attrId, intervals }` |
