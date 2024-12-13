// const channelConfig = {
//     "channel": {
//         "@version": "3.5.1",
//         "id": "a6bcef29-d775-4fca-7d15-16g4hg7bd693d",
//         "nextMetaDataId": 2,
//         "name": "Channel 13",
//         "description": "Example description...",
//         "revision": 0,
//         "sourceConnector": {
//             "@version": "3.5.1",
//             "metaDataId": "0",
//             "name": "sourceConnector",
//             "properties": {
//                 "@class": "com.mirth.connect.connectors.http.HttpReceiverProperties",
//                 "@version": "3.5.1",
//                 "pluginProperties": {
//                     "com.mirth.connect.plugins.httpauth.basic.BasicHttpAuthProperties": {
//                         "@version": "3.5.1",
//                         "authType": "BASIC",
//                         "realm": "My Realm",
//                         "credentials": {
//                             "@class": "linked-hash-map",
//                             "entry": {
//                                 "string": [
//                                     "admin",
//                                     "svsinsid"
//                                 ]
//                             }
//                         }
//                     }
//                 },
//                 "listenerConnectorProperties": {
//                     "@version": "3.5.1",
//                     "host": "0.0.0.0",
//                     "port": "8002"
//                 },
//                 "sourceConnectorProperties": {
//                     "@version": "3.5.1",
//                     "responseVariable": "Auto-generate (Before processing)",
//                     "respondAfterProcessing": "true",
//                     "processBatch": "false",
//                     "firstResponse": "false",
//                     "processingThreads": "1",
//                     "resourceIds": {
//                         "@class": "linked-hash-map",
//                         "entry": {
//                             "string": [
//                                 "Default Resource",
//                                 "[Default Resource]"
//                             ]
//                         }
//                     },
//                     "queueBufferSize": "1000"
//                 },
//                 "xmlBody": "false",
//                 "parseMultipart": "true",
//                 "includeMetadata": "false",
//                 "binaryMimeTypes": "application/.*(?<!json|xml)$|image/.*|video/.*|audio/.*",
//                 "binaryMimeTypesRegex": "true",
//                 "responseContentType": "text/plain",
//                 "responseDataTypeBinary": "false",
//                 "responseStatusCode": null,
//                 "responseHeaders": {
//                     "@class": "linked-hash-map"
//                 },
//                 "charset": "UTF-8",
//                 "contextPath": null,
//                 "timeout": "0",
//                 "staticResources": null
//             },
//             "transformer": {
//                 "@version": "3.5.1",
//                 "elements": {
//                     "com.mirth.connect.plugins.javascriptstep.JavaScriptStep": {
//                         "sequenceNumber": "0",
//                         "script": "tmp['MSH']['MSH.3']['MSH.3.1'] = msg['application_sending'];\ntmp['MSH']['MSH.4']['MSH.4.1'] = msg['sending_facility'];\ntmp['MSH']['MSH.5']['MSH.5.1'] = msg['receiving_application'];\ntmp['MSH']['MSH.6']['MSH.6.1'] = msg['receiving_facility'];\ntmp['MSH']['MSH.7']['MSH.7.1'] = msg['time'];\ntmp['MSH']['MSH.10']['MSH.10.1'] = msg['message_control_id'];\ntmp['MSH']['MSH.11']['MSH.11.1'] = msg['process_id'];\ntmp['MSH']['MSH.12']['MSH.12.1'] = msg['version_id'];\ntmp['MSH']['MSH.9'] = msg['message_type'];"
//                     }
//                 },
//                 "inboundTemplate": {
//                     "@encoding": "base64",
//                     "#text": "ewogICAgImFwcGxpY2F0aW9uX3NlbmRpbmciIDogIkVQSUNBRFQiLAogICAgInNlbmRpbmdfZmFj\naWxpdHkiIDogIkRIIiwKICAgICJyZWNlaXZpbmdfYXBwbGljYXRpb24iIDogIkxBQkFEVCIsCiAg\nICAicmVjZWl2aW5nX2ZhY2lsaXR5IiA6ICJESCIsCiAgICAidGltZSI6ICIyMDEzMDEwMTEyMjYi\nLAogICAgIm1lc3NhZ2VfdHlwZSIgOiAiQURUXkEwMSIsCiAgICAibWVzc2FnZV9jb250cm9sX2lk\nIiA6ICJITDdNU0cwMDAwMSIsCiAgICAicHJvY2Vzc19pZCIgOiAiUCIsCiAgICAidmVyc2lvbl9p\nZCI6ICIyLjMiCn0K"
//                 },
//                 "outboundTemplate": {
//                     "@encoding": "base64",
//                     "#text": "TVNIfF5+XCZ8RVBJQ0FEVHxESHxMQUJBRFR8REh8MjAxMzAxMDExMjI2fHxBRFReQTAxfEhMN01T\nRzAwMDAxfFB8Mi4zfCAKUElEfHx8fHx8fHx8fHx8fHx8fHx8fHwKUEQxfHx8fHw="
//                 },
//                 "inboundDataType": "JSON",
//                 "outboundDataType": "HL7V2",
//                 "inboundProperties": {
//                     "@class": "com.mirth.connect.plugins.datatypes.json.JSONDataTypeProperties",
//                     "@version": "3.5.1",
//                     "batchProperties": {
//                         "@class": "com.mirth.connect.plugins.datatypes.json.JSONBatchProperties",
//                         "@version": "3.5.1",
//                         "splitType": "JavaScript",
//                         "batchScript": null
//                     }
//                 },
//                 "outboundProperties": {
//                     "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DataTypeProperties",
//                     "@version": "3.5.1",
//                     "serializationProperties": {
//                         "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2SerializationProperties",
//                         "@version": "3.5.1",
//                         "handleRepetitions": "true",
//                         "handleSubcomponents": "true",
//                         "useStrictParser": "false",
//                         "useStrictValidation": "false",
//                         "stripNamespaces": "true",
//                         "segmentDelimiter": null,
//                         "convertLineBreaks": "true"
//                     },
//                     "deserializationProperties": {
//                         "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DeserializationProperties",
//                         "@version": "3.5.1",
//                         "useStrictParser": "false",
//                         "useStrictValidation": "false",
//                         "segmentDelimiter": null
//                     },
//                     "batchProperties": {
//                         "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2BatchProperties",
//                         "@version": "3.5.1",
//                         "splitType": "MSH_Segment",
//                         "batchScript": null
//                     },
//                     "responseGenerationProperties": {
//                         "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseGenerationProperties",
//                         "@version": "3.5.1",
//                         "segmentDelimiter": null,
//                         "successfulACKCode": "AA",
//                         "successfulACKMessage": null,
//                         "errorACKCode": "AE",
//                         "errorACKMessage": "An Error Occurred Processing Message.",
//                         "rejectedACKCode": "AR",
//                         "rejectedACKMessage": "Message Rejected.",
//                         "msh15ACKAccept": "false",
//                         "dateFormat": "yyyyMMddHHmmss.SSS"
//                     },
//                     "responseValidationProperties": {
//                         "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseValidationProperties",
//                         "@version": "3.5.1",
//                         "successfulACKCode": "AA,CA",
//                         "errorACKCode": "AE,CE",
//                         "rejectedACKCode": "AR,CR",
//                         "validateMessageControlId": "true",
//                         "originalMessageControlId": "Destination_Encoded",
//                         "originalIdMapVariable": null
//                     }
//                 }
//             },
//             "filter": {
//                 "@version": "3.5.1",
//                 "elements": null
//             },
//             "transportName": "HTTP Listener",
//             "mode": "SOURCE",
//             "enabled": "true",
//             "waitForPrevious": "true"
//         },
//         "destinationConnectors": {
//             "connector": {
//                 "@version": "3.5.1",
//                 "metaDataId": "2",
//                 "name": "Destination 1",
//                 "properties": {
//                     "@class": "com.mirth.connect.connectors.vm.VmDispatcherProperties",
//                     "@version": "3.5.1",
//                     "pluginProperties": null,
//                     "destinationConnectorProperties": {
//                         "@version": "3.5.1",
//                         "queueEnabled": "false",
//                         "sendFirst": "false",
//                         "retryIntervalMillis": "10000",
//                         "regenerateTemplate": "false",
//                         "retryCount": "0",
//                         "rotate": "false",
//                         "includeFilterTransformer": "false",
//                         "threadCount": "1",
//                         "threadAssignmentVariable": null,
//                         "validateResponse": "false",
//                         "resourceIds": {
//                             "@class": "linked-hash-map",
//                             "entry": {
//                                 "string": [
//                                     "Default Resource",
//                                     "[Default Resource]"
//                                 ]
//                             }
//                         },
//                         "queueBufferSize": "1000",
//                         "reattachAttachments": "true"
//                     },
//                     "channelId": "none",
//                     "channelTemplate": "${message.transformedData}",
//                     "mapVariables": null
//                 },
//                 "transformer": {
//                     "@version": "3.5.1",
//                     "elements": null,
//                     "inboundTemplate": {
//                         "@encoding": "base64",
//                         "#text": "TVNIfF5+XCZ8RVBJQ0FEVHxESHxMQUJBRFR8REh8MjAxMzAxMDExMjI2fHxBRFReQTAxfEhMN01T\nRzAwMDAxfFB8Mi4zfCAKUElEfHx8fHx8fHx8fHx8fHx8fHx8fHwKUEQxfHx8fHw="
//                     },
//                     "outboundTemplate": {
//                         "@encoding": "base64",
//                         "#text": "TVNIfF5+XCZ8RVBJQ0FEVHxESHxMQUJBRFR8REh8MjAxMzAxMDExMjI2fHxBRFReQTAxfEhMN01T\nRzAwMDAxfFB8Mi4zfCAKUElEfHx8fHx8fHx8fHx8fHx8fHx8fHwKUEQxfHx8fHw="
//                     },
//                     "inboundDataType": "HL7V2",
//                     "outboundDataType": "HL7V2",
//                     "inboundProperties": {
//                         "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DataTypeProperties",
//                         "@version": "3.5.1",
//                         "serializationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2SerializationProperties",
//                             "@version": "3.5.1",
//                             "handleRepetitions": "true",
//                             "handleSubcomponents": "true",
//                             "useStrictParser": "false",
//                             "useStrictValidation": "false",
//                             "stripNamespaces": "true",
//                             "segmentDelimiter": null,
//                             "convertLineBreaks": "true"
//                         },
//                         "deserializationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DeserializationProperties",
//                             "@version": "3.5.1",
//                             "useStrictParser": "false",
//                             "useStrictValidation": "false",
//                             "segmentDelimiter": null
//                         },
//                         "batchProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2BatchProperties",
//                             "@version": "3.5.1",
//                             "splitType": "MSH_Segment",
//                             "batchScript": null
//                         },
//                         "responseGenerationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseGenerationProperties",
//                             "@version": "3.5.1",
//                             "segmentDelimiter": null,
//                             "successfulACKCode": "AA",
//                             "successfulACKMessage": null,
//                             "errorACKCode": "AE",
//                             "errorACKMessage": "An Error Occurred Processing Message.",
//                             "rejectedACKCode": "AR",
//                             "rejectedACKMessage": "Message Rejected.",
//                             "msh15ACKAccept": "false",
//                             "dateFormat": "yyyyMMddHHmmss.SSS"
//                         },
//                         "responseValidationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseValidationProperties",
//                             "@version": "3.5.1",
//                             "successfulACKCode": "AA,CA",
//                             "errorACKCode": "AE,CE",
//                             "rejectedACKCode": "AR,CR",
//                             "validateMessageControlId": "true",
//                             "originalMessageControlId": "Destination_Encoded",
//                             "originalIdMapVariable": null
//                         }
//                     },
//                     "outboundProperties": {
//                         "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DataTypeProperties",
//                         "@version": "3.5.1",
//                         "serializationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2SerializationProperties",
//                             "@version": "3.5.1",
//                             "handleRepetitions": "true",
//                             "handleSubcomponents": "true",
//                             "useStrictParser": "false",
//                             "useStrictValidation": "false",
//                             "stripNamespaces": "true",
//                             "segmentDelimiter": null,
//                             "convertLineBreaks": "true"
//                         },
//                         "deserializationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DeserializationProperties",
//                             "@version": "3.5.1",
//                             "useStrictParser": "false",
//                             "useStrictValidation": "false",
//                             "segmentDelimiter": null
//                         },
//                         "batchProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2BatchProperties",
//                             "@version": "3.5.1",
//                             "splitType": "MSH_Segment",
//                             "batchScript": null
//                         },
//                         "responseGenerationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseGenerationProperties",
//                             "@version": "3.5.1",
//                             "segmentDelimiter": null,
//                             "successfulACKCode": "AA",
//                             "successfulACKMessage": null,
//                             "errorACKCode": "AE",
//                             "errorACKMessage": "An Error Occurred Processing Message.",
//                             "rejectedACKCode": "AR",
//                             "rejectedACKMessage": "Message Rejected.",
//                             "msh15ACKAccept": "false",
//                             "dateFormat": "yyyyMMddHHmmss.SSS"
//                         },
//                         "responseValidationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseValidationProperties",
//                             "@version": "3.5.1",
//                             "successfulACKCode": "AA,CA",
//                             "errorACKCode": "AE,CE",
//                             "rejectedACKCode": "AR,CR",
//                             "validateMessageControlId": "true",
//                             "originalMessageControlId": "Destination_Encoded",
//                             "originalIdMapVariable": null
//                         }
//                     }
//                 },
//                 "responseTransformer": {
//                     "@version": "3.5.1",
//                     "elements": null,
//                     "inboundDataType": "HL7V2",
//                     "outboundDataType": "HL7V2",
//                     "inboundProperties": {
//                         "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DataTypeProperties",
//                         "@version": "3.5.1",
//                         "serializationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2SerializationProperties",
//                             "@version": "3.5.1",
//                             "handleRepetitions": "true",
//                             "handleSubcomponents": "true",
//                             "useStrictParser": "false",
//                             "useStrictValidation": "false",
//                             "stripNamespaces": "true",
//                             "segmentDelimiter": null,
//                             "convertLineBreaks": "true"
//                         },
//                         "deserializationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DeserializationProperties",
//                             "@version": "3.5.1",
//                             "useStrictParser": "false",
//                             "useStrictValidation": "false",
//                             "segmentDelimiter": null
//                         },
//                         "batchProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2BatchProperties",
//                             "@version": "3.5.1",
//                             "splitType": "MSH_Segment",
//                             "batchScript": null
//                         },
//                         "responseGenerationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseGenerationProperties",
//                             "@version": "3.5.1",
//                             "segmentDelimiter": null,
//                             "successfulACKCode": "AA",
//                             "successfulACKMessage": null,
//                             "errorACKCode": "AE",
//                             "errorACKMessage": "An Error Occurred Processing Message.",
//                             "rejectedACKCode": "AR",
//                             "rejectedACKMessage": "Message Rejected.",
//                             "msh15ACKAccept": "false",
//                             "dateFormat": "yyyyMMddHHmmss.SSS"
//                         },
//                         "responseValidationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseValidationProperties",
//                             "@version": "3.5.1",
//                             "successfulACKCode": "AA,CA",
//                             "errorACKCode": "AE,CE",
//                             "rejectedACKCode": "AR,CR",
//                             "validateMessageControlId": "true",
//                             "originalMessageControlId": "Destination_Encoded",
//                             "originalIdMapVariable": null
//                         }
//                     },
//                     "outboundProperties": {
//                         "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DataTypeProperties",
//                         "@version": "3.5.1",
//                         "serializationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2SerializationProperties",
//                             "@version": "3.5.1",
//                             "handleRepetitions": "true",
//                             "handleSubcomponents": "true",
//                             "useStrictParser": "false",
//                             "useStrictValidation": "false",
//                             "stripNamespaces": "true",
//                             "segmentDelimiter": null,
//                             "convertLineBreaks": "true"
//                         },
//                         "deserializationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DeserializationProperties",
//                             "@version": "3.5.1",
//                             "useStrictParser": "false",
//                             "useStrictValidation": "false",
//                             "segmentDelimiter": null
//                         },
//                         "batchProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2BatchProperties",
//                             "@version": "3.5.1",
//                             "splitType": "MSH_Segment",
//                             "batchScript": null
//                         },
//                         "responseGenerationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseGenerationProperties",
//                             "@version": "3.5.1",
//                             "segmentDelimiter": null,
//                             "successfulACKCode": "AA",
//                             "successfulACKMessage": null,
//                             "errorACKCode": "AE",
//                             "errorACKMessage": "An Error Occurred Processing Message.",
//                             "rejectedACKCode": "AR",
//                             "rejectedACKMessage": "Message Rejected.",
//                             "msh15ACKAccept": "false",
//                             "dateFormat": "yyyyMMddHHmmss.SSS"
//                         },
//                         "responseValidationProperties": {
//                             "@class": "com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseValidationProperties",
//                             "@version": "3.5.1",
//                             "successfulACKCode": "AA,CA",
//                             "errorACKCode": "AE,CE",
//                             "rejectedACKCode": "AR,CR",
//                             "validateMessageControlId": "true",
//                             "originalMessageControlId": "Destination_Encoded",
//                             "originalIdMapVariable": null
//                         }
//                     }
//                 },
//                 "filter": {
//                     "@version": "3.5.1",
//                     "elements": null
//                 },
//                 "transportName": "Channel Writer",
//                 "mode": "DESTINATION",
//                 "enabled": "true",
//                 "waitForPrevious": "true"
//             }
//         },
//         "preprocessingScript": "// Modify the message variable below to pre process data\nreturn message;",
//         "postprocessingScript": "// This script executes once after a message has been processed\n// Responses returned from here will be stored as \"Postprocessor\" in the response map\nreturn;",
//         "deployScript": "// This script executes once when the channel is deployed\n// You only have access to the globalMap and globalChannelMap here to persist data\nreturn;",
//         "undeployScript": "// This script executes once when the channel is undeployed\n// You only have access to the globalMap and globalChannelMap here to persist data\nreturn;",
//         "properties": {
//             "@version": "3.5.1",
//             "clearGlobalChannelMap": "true",
//             "messageStorageMode": "DEVELOPMENT",
//             "encryptData": "false",
//             "removeContentOnCompletion": "false",
//             "removeOnlyFilteredOnCompletion": "false",
//             "removeAttachmentsOnCompletion": "false",
//             "initialState": "STARTED",
//             "storeAttachments": "false",
//             "metaDataColumns": {
//                 "metaDataColumn": [{
//                         "name": "SOURCE",
//                         "type": "STRING",
//                         "mappingName": "mirth_source"
//                     },
//                     {
//                         "name": "TYPE",
//                         "type": "STRING",
//                         "mappingName": "mirth_type"
//                     }
//                 ]
//             },
//             "attachmentProperties": {
//                 "@version": "3.5.1",
//                 "type": "None",
//                 "properties": null
//             },
//             "resourceIds": {
//                 "@class": "linked-hash-map",
//                 "entry": {
//                     "string": [
//                         "Default Resource",
//                         "[Default Resource]"
//                     ]
//                 }
//             }
//         },
//         "exportData": {
//             "metadata": {
//                 "enabled": "true",
//                 "lastModified": {
//                     "time": "1522853496462",
//                     "timezone": "America/New_York"
//                 },
//                 "pruningSettings": {
//                     "archiveEnabled": "true"
//                 }
//             }
//         }
//     }
// };


const channelConfig = `<channel version="3.5.1">
  <id>111</id>
  <nextMetaDataId>3</nextMetaDataId>
  <name>secure_json_to_hl7_dest_channel_write</name>
  <description></description>
  <revision>1</revision>
  <sourceConnector version="3.5.1">
    <metaDataId>0</metaDataId>
    <name>sourceConnector</name>
    <properties class="com.mirth.connect.connectors.http.HttpReceiverProperties" version="3.5.1">
      <pluginProperties>
        <com.mirth.connect.plugins.httpauth.basic.BasicHttpAuthProperties version="3.5.1">
  <authType>BASIC</authType>
          <realm>My Realm</realm>
          <credentials class="linked-hash-map">
    <entry>
      <string>admin</string>
              <string>admin</string>
            </entry>
          </credentials>
        </com.mirth.connect.plugins.httpauth.basic.BasicHttpAuthProperties>
      </pluginProperties>
      <listenerConnectorProperties version="3.5.1">
        <host>0.0.0.0</host>
        <port>8003</port>
      </listenerConnectorProperties>
      <sourceConnectorProperties version="3.5.1">
        <responseVariable>Auto-generate (Before processing)</responseVariable>
        <respondAfterProcessing>true</respondAfterProcessing>
        <processBatch>false</processBatch>
        <firstResponse>false</firstResponse>
        <processingThreads>1</processingThreads>
        <resourceIds class="linked-hash-map">
          <entry>
            <string>Default Resource</string>
            <string>[Default Resource]</string>
          </entry>
        </resourceIds>
        <queueBufferSize>1000</queueBufferSize>
      </sourceConnectorProperties>
      <xmlBody>false</xmlBody>
      <parseMultipart>true</parseMultipart>
      <includeMetadata>false</includeMetadata>
      <binaryMimeTypes>application/.*(?&lt;!json|xml)$|image/.*|video/.*|audio/.*</binaryMimeTypes>
      <binaryMimeTypesRegex>true</binaryMimeTypesRegex>
      <responseContentType>text/plain</responseContentType>
      <responseDataTypeBinary>false</responseDataTypeBinary>
      <responseStatusCode></responseStatusCode>
      <responseHeaders class="linked-hash-map"/>
      <charset>UTF-8</charset>
      <contextPath></contextPath>
      <timeout>0</timeout>
      <staticResources/>
    </properties>
    <transformer version="3.5.1">
      <elements>
        <com.mirth.connect.plugins.javascriptstep.JavaScriptStep>
          <sequenceNumber>0</sequenceNumber>
          <script></script>





        </com.mirth.connect.plugins.javascriptstep.JavaScriptStep>
      </elements>
      <inboundTemplate encoding="base64">ew0KICAgICJhcHBsaWNhdGlvbl9zZW5kaW5nIjogIiIsDQogICAgInNlbmRpbmdfZmFjaWxpdHkiOiAiIiwNCiAgICAicmVjZWl2aW5nX2FwcGxpY2F0aW9uIjogIiIsDQogICAgInJlY2VpdmluZ19mYWNpbGl0eSI6ICIiLA0KICAgICJ0aW1lIjogIiIsDQogICAgIm1lc3NhZ2VfdHlwZSI6ICIiLA0KICAgICJtZXNzYWdlX2NvbnRyb2xfaWQiOiAiIiwNCiAgICAicHJvY2Vzc19pZCI6ICIiLA0KICAgICJ2ZXJzaW9uX2lkIjogIjIuNCINCn0NCg==</inboundTemplate>
      <outboundTemplate encoding="base64">TVNIfF5+XCZ8fHx8fHx8fHx8Mi40</outboundTemplate>
      <inboundDataType>JSON</inboundDataType>
      <outboundDataType>HL7V2</outboundDataType>
      <inboundProperties class="com.mirth.connect.plugins.datatypes.json.JSONDataTypeProperties" version="3.5.1">
        <batchProperties class="com.mirth.connect.plugins.datatypes.json.JSONBatchProperties" version="3.5.1">
          <splitType>JavaScript</splitType>
          <batchScript></batchScript>
        </batchProperties>
      </inboundProperties>
      <outboundProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DataTypeProperties" version="3.5.1">
        <serializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2SerializationProperties" version="3.5.1">
          <handleRepetitions>true</handleRepetitions>
          <handleSubcomponents>true</handleSubcomponents>
          <useStrictParser>false</useStrictParser>
          <useStrictValidation>false</useStrictValidation>
          <stripNamespaces>true</stripNamespaces>
          <segmentDelimiter>\r</segmentDelimiter>
          <convertLineBreaks>true</convertLineBreaks>
        </serializationProperties>
        <deserializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DeserializationProperties" version="3.5.1">
          <useStrictParser>false</useStrictParser>
          <useStrictValidation>false</useStrictValidation>
          <segmentDelimiter>\r</segmentDelimiter>
        </deserializationProperties>
        <batchProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2BatchProperties" version="3.5.1">
          <splitType>MSH_Segment</splitType>
          <batchScript></batchScript>
        </batchProperties>
        <responseGenerationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseGenerationProperties" version="3.5.1">
          <segmentDelimiter>\r</segmentDelimiter>
          <successfulACKCode>AA</successfulACKCode>
          <successfulACKMessage></successfulACKMessage>
          <errorACKCode>AE</errorACKCode>
          <errorACKMessage>An Error Occurred Processing Message.</errorACKMessage>
          <rejectedACKCode>AR</rejectedACKCode>
          <rejectedACKMessage>Message Rejected.</rejectedACKMessage>
          <msh15ACKAccept>false</msh15ACKAccept>
          <dateFormat>yyyyMMddHHmmss.SSS</dateFormat>
        </responseGenerationProperties>
        <responseValidationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseValidationProperties" version="3.5.1">
          <successfulACKCode>AA,CA</successfulACKCode>
          <errorACKCode>AE,CE</errorACKCode>
          <rejectedACKCode>AR,CR</rejectedACKCode>
          <validateMessageControlId>true</validateMessageControlId>
          <originalMessageControlId>Destination_Encoded</originalMessageControlId>
          <originalIdMapVariable></originalIdMapVariable>
        </responseValidationProperties>
      </outboundProperties>
    </transformer>
    <filter version="3.5.1">
      <elements/>
    </filter>
    <transportName>HTTP Listener</transportName>
    <mode>SOURCE</mode>
    <enabled>true</enabled>
    <waitForPrevious>true</waitForPrevious>
  </sourceConnector>
  <destinationConnectors>
    <connector version="3.5.1">
      <metaDataId>2</metaDataId>
      <name>Destination 1</name>
      <properties class="com.mirth.connect.connectors.vm.VmDispatcherProperties" version="3.5.1">
        <pluginProperties/>
        <destinationConnectorProperties version="3.5.1">
          <queueEnabled>false</queueEnabled>
          <sendFirst>false</sendFirst>
          <retryIntervalMillis>10000</retryIntervalMillis>
          <regenerateTemplate>false</regenerateTemplate>
          <retryCount>0</retryCount>
          <rotate>false</rotate>
          <includeFilterTransformer>false</includeFilterTransformer>
          <threadCount>1</threadCount>
          <threadAssignmentVariable></threadAssignmentVariable>
          <validateResponse>false</validateResponse>
          <resourceIds class="linked-hash-map">
            <entry>
              <string>Default Resource</string>
              <string>[Default Resource]</string>
            </entry>
          </resourceIds>
          <queueBufferSize>1000</queueBufferSize>
          <reattachAttachments>true</reattachAttachments>
        </destinationConnectorProperties>
        <channelId>none</channelId>
        <channelTemplate>\${message.transformedData}</channelTemplate>
        <mapVariables/>
      </properties>
      <transformer version="3.5.1">
        <elements/>
        <inboundDataType>HL7V2</inboundDataType>
        <outboundDataType>HL7V2</outboundDataType>
        <inboundProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DataTypeProperties" version="3.5.1">
          <serializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2SerializationProperties" version="3.5.1">
            <handleRepetitions>true</handleRepetitions>
            <handleSubcomponents>true</handleSubcomponents>
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <stripNamespaces>true</stripNamespaces>
            <segmentDelimiter>\r</segmentDelimiter>
            <convertLineBreaks>true</convertLineBreaks>
          </serializationProperties>
          <deserializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DeserializationProperties" version="3.5.1">
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <segmentDelimiter>\r</segmentDelimiter>
          </deserializationProperties>
          <batchProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2BatchProperties" version="3.5.1">
            <splitType>MSH_Segment</splitType>
            <batchScript></batchScript>
          </batchProperties>
          <responseGenerationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseGenerationProperties" version="3.5.1">
            <segmentDelimiter>\r</segmentDelimiter>
            <successfulACKCode>AA</successfulACKCode>
            <successfulACKMessage></successfulACKMessage>
            <errorACKCode>AE</errorACKCode>
            <errorACKMessage>An Error Occurred Processing Message.</errorACKMessage>
            <rejectedACKCode>AR</rejectedACKCode>
            <rejectedACKMessage>Message Rejected.</rejectedACKMessage>
            <msh15ACKAccept>false</msh15ACKAccept>
            <dateFormat>yyyyMMddHHmmss.SSS</dateFormat>
          </responseGenerationProperties>
          <responseValidationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseValidationProperties" version="3.5.1">
            <successfulACKCode>AA,CA</successfulACKCode>
            <errorACKCode>AE,CE</errorACKCode>
            <rejectedACKCode>AR,CR</rejectedACKCode>
            <validateMessageControlId>true</validateMessageControlId>
            <originalMessageControlId>Destination_Encoded</originalMessageControlId>
            <originalIdMapVariable></originalIdMapVariable>
          </responseValidationProperties>
        </inboundProperties>
        <outboundProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DataTypeProperties" version="3.5.1">
          <serializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2SerializationProperties" version="3.5.1">
            <handleRepetitions>true</handleRepetitions>
            <handleSubcomponents>true</handleSubcomponents>
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <stripNamespaces>true</stripNamespaces>
            <segmentDelimiter>\r</segmentDelimiter>
            <convertLineBreaks>true</convertLineBreaks>
          </serializationProperties>
          <deserializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DeserializationProperties" version="3.5.1">
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <segmentDelimiter>\r</segmentDelimiter>
          </deserializationProperties>
          <batchProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2BatchProperties" version="3.5.1">
            <splitType>MSH_Segment</splitType>
            <batchScript></batchScript>
          </batchProperties>
          <responseGenerationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseGenerationProperties" version="3.5.1">
            <segmentDelimiter>\r</segmentDelimiter>
            <successfulACKCode>AA</successfulACKCode>
            <successfulACKMessage></successfulACKMessage>
            <errorACKCode>AE</errorACKCode>
            <errorACKMessage>An Error Occurred Processing Message.</errorACKMessage>
            <rejectedACKCode>AR</rejectedACKCode>
            <rejectedACKMessage>Message Rejected.</rejectedACKMessage>
            <msh15ACKAccept>false</msh15ACKAccept>
            <dateFormat>yyyyMMddHHmmss.SSS</dateFormat>
          </responseGenerationProperties>
          <responseValidationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseValidationProperties" version="3.5.1">
            <successfulACKCode>AA,CA</successfulACKCode>
            <errorACKCode>AE,CE</errorACKCode>
            <rejectedACKCode>AR,CR</rejectedACKCode>
            <validateMessageControlId>true</validateMessageControlId>
            <originalMessageControlId>Destination_Encoded</originalMessageControlId>
            <originalIdMapVariable></originalIdMapVariable>
          </responseValidationProperties>
        </outboundProperties>
      </transformer>
      <responseTransformer version="3.5.1">
        <elements/>
        <inboundTemplate encoding="base64">TVNIfF5+XCZ8fHx8fHx8fHx8Mi40</inboundTemplate>
        <outboundTemplate encoding="base64">TVNIfF5+XCZ8fHx8fHx8fHx8Mi40</outboundTemplate>
        <inboundDataType>HL7V2</inboundDataType>
        <outboundDataType>HL7V2</outboundDataType>
        <inboundProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DataTypeProperties" version="3.5.1">
          <serializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2SerializationProperties" version="3.5.1">
            <handleRepetitions>true</handleRepetitions>
            <handleSubcomponents>true</handleSubcomponents>
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <stripNamespaces>true</stripNamespaces>
            <segmentDelimiter>\r</segmentDelimiter>
            <convertLineBreaks>true</convertLineBreaks>
          </serializationProperties>
          <deserializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DeserializationProperties" version="3.5.1">
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <segmentDelimiter>\r</segmentDelimiter>
          </deserializationProperties>
          <batchProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2BatchProperties" version="3.5.1">
            <splitType>MSH_Segment</splitType>
            <batchScript></batchScript>
          </batchProperties>
          <responseGenerationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseGenerationProperties" version="3.5.1">
            <segmentDelimiter>\r</segmentDelimiter>
            <successfulACKCode>AA</successfulACKCode>
            <successfulACKMessage></successfulACKMessage>
            <errorACKCode>AE</errorACKCode>
            <errorACKMessage>An Error Occurred Processing Message.</errorACKMessage>
            <rejectedACKCode>AR</rejectedACKCode>
            <rejectedACKMessage>Message Rejected.</rejectedACKMessage>
            <msh15ACKAccept>false</msh15ACKAccept>
            <dateFormat>yyyyMMddHHmmss.SSS</dateFormat>
          </responseGenerationProperties>
          <responseValidationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseValidationProperties" version="3.5.1">
            <successfulACKCode>AA,CA</successfulACKCode>
            <errorACKCode>AE,CE</errorACKCode>
            <rejectedACKCode>AR,CR</rejectedACKCode>
            <validateMessageControlId>true</validateMessageControlId>
            <originalMessageControlId>Destination_Encoded</originalMessageControlId>
            <originalIdMapVariable></originalIdMapVariable>
          </responseValidationProperties>
        </inboundProperties>
        <outboundProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DataTypeProperties" version="3.5.1">
          <serializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2SerializationProperties" version="3.5.1">
            <handleRepetitions>true</handleRepetitions>
            <handleSubcomponents>true</handleSubcomponents>
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <stripNamespaces>true</stripNamespaces>
            <segmentDelimiter>\r</segmentDelimiter>
            <convertLineBreaks>true</convertLineBreaks>
          </serializationProperties>
          <deserializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DeserializationProperties" version="3.5.1">
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <segmentDelimiter>\r</segmentDelimiter>
          </deserializationProperties>
          <batchProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2BatchProperties" version="3.5.1">
            <splitType>MSH_Segment</splitType>
            <batchScript></batchScript>
          </batchProperties>
          <responseGenerationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseGenerationProperties" version="3.5.1">
            <segmentDelimiter>\r</segmentDelimiter>
            <successfulACKCode>AA</successfulACKCode>
            <successfulACKMessage></successfulACKMessage>
            <errorACKCode>AE</errorACKCode>
            <errorACKMessage>An Error Occurred Processing Message.</errorACKMessage>
            <rejectedACKCode>AR</rejectedACKCode>
            <rejectedACKMessage>Message Rejected.</rejectedACKMessage>
            <msh15ACKAccept>false</msh15ACKAccept>
            <dateFormat>yyyyMMddHHmmss.SSS</dateFormat>
          </responseGenerationProperties>
          <responseValidationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseValidationProperties" version="3.5.1">
            <successfulACKCode>AA,CA</successfulACKCode>
            <errorACKCode>AE,CE</errorACKCode>
            <rejectedACKCode>AR,CR</rejectedACKCode>
            <validateMessageControlId>true</validateMessageControlId>
            <originalMessageControlId>Destination_Encoded</originalMessageControlId>
            <originalIdMapVariable></originalIdMapVariable>
          </responseValidationProperties>
        </outboundProperties>
      </responseTransformer>
      <filter version="3.5.1">
        <elements/>
      </filter>
      <transportName>Channel Writer</transportName>
      <mode>DESTINATION</mode>
      <enabled>true</enabled>
      <waitForPrevious>true</waitForPrevious>
    </connector>
  </destinationConnectors>
  <preprocessingScript>// Modify the message variable below to pre process data
return message;</preprocessingScript>
  <postprocessingScript>// This script executes once after a message has been processed
// Responses returned from here will be stored as &quot;Postprocessor&quot; in the response map
return;</postprocessingScript>
  <deployScript>// This script executes once when the channel is deployed
// You only have access to the globalMap and globalChannelMap here to persist data
return;</deployScript>
  <undeployScript>// This script executes once when the channel is undeployed
// You only have access to the globalMap and globalChannelMap here to persist data
return;</undeployScript>
  <properties version="3.5.1">
    <clearGlobalChannelMap>true</clearGlobalChannelMap>
    <messageStorageMode>DEVELOPMENT</messageStorageMode>
    <encryptData>false</encryptData>
    <removeContentOnCompletion>false</removeContentOnCompletion>
    <removeOnlyFilteredOnCompletion>false</removeOnlyFilteredOnCompletion>
    <removeAttachmentsOnCompletion>false</removeAttachmentsOnCompletion>
    <initialState>STARTED</initialState>
    <storeAttachments>false</storeAttachments>
    <metaDataColumns>
      <metaDataColumn>
        <name>SOURCE</name>
        <type>STRING</type>
        <mappingName>mirth_source</mappingName>
      </metaDataColumn>
      <metaDataColumn>
        <name>TYPE</name>
        <type>STRING</type>
        <mappingName>mirth_type</mappingName>
      </metaDataColumn>
    </metaDataColumns>
    <attachmentProperties version="3.5.1">
      <type>None</type>
      <properties/>
    </attachmentProperties>
    <resourceIds class="linked-hash-map">
      <entry>
        <string>Default Resource</string>
        <string>[Default Resource]</string>
      </entry>
    </resourceIds>
  </properties>
  <exportData>
    <metadata>
      <enabled>true</enabled>
      <lastModified>
        <time>1522853496462</time>
        <timezone>America/New_York</timezone>
      </lastModified>
      <pruningSettings>
        <archiveEnabled>true</archiveEnabled>
      </pruningSettings>
    </metadata>
  </exportData>
</channel>`;

module.exports = channelConfig;