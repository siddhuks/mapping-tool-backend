const channelConfig = `<channel version="4.5.1">
  <id>hh02-SIU_S12</id>
  <nextMetaDataId>3</nextMetaDataId>
  <name>hh02_SIU_S12</name>
  <description></description>
  <revision>27</revision>
  <sourceConnector version="4.5.1">
    <metaDataId>0</metaDataId>
    <name>sourceConnector</name>
    <properties class="com.mirth.connect.connectors.http.HttpReceiverProperties" version="4.5.1">
      <pluginProperties>
        <com.mirth.connect.plugins.httpauth.NoneHttpAuthProperties version="4.5.1">
  <authType>NONE</authType>
        </com.mirth.connect.plugins.httpauth.NoneHttpAuthProperties>
      </pluginProperties>
      <listenerConnectorProperties version="4.5.1">
        <host>0.0.0.0</host>
        <port>8082</port>
      </listenerConnectorProperties>
      <sourceConnectorProperties version="4.5.1">
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
      <responseHeadersVariable></responseHeadersVariable>
      <useResponseHeadersVariable>false</useResponseHeadersVariable>
      <charset>UTF-8</charset>
      <contextPath>/user/hh02/SIU_S12</contextPath>
      <timeout>0</timeout>
      <staticResources/>
    </properties>
    <transformer version="4.5.1">
      <elements>
        <com.mirth.connect.plugins.javascriptstep.JavaScriptStep version="4.5.1">
          <sequenceNumber>0</sequenceNumber>
          <enabled>true</enabled>
          <script>tmp[&apos;MSH&apos;][&apos;MSH.4&apos;][&apos;MSH.4.1&apos;] = &apos;HH&apos;;
tmp[&apos;MSH&apos;][&apos;MSH.6&apos;][&apos;MSH.6.3&apos;] = &apos;HW&apos;;
tmp[&apos;MSH&apos;][&apos;MSH.7&apos;] = msg[0][&apos;appointment&apos;][&apos;attended_by&apos;];
tmp[&apos;MSH&apos;][&apos;MSH.10&apos;] = msg[0][&apos;appointment&apos;][&apos;reservation_time&apos;];
tmp[&apos;MSH&apos;][&apos;MSH.12&apos;] = msg[0][&apos;appointment&apos;][&apos;recurrence_end_date&apos;];
tmp[&apos;EVN&apos;][&apos;EVN.2&apos;][&apos;EVN.2.1&apos;] = msg[0][&apos;appointment&apos;][&apos;status&apos;];
tmp[&apos;PID&apos;][&apos;PID.8&apos;] = msg[0][&apos;appointment&apos;][&apos;is_attended&apos;];
tmp[&apos;PV1&apos;][&apos;PV1.19&apos;] = msg[0][&apos;appointment&apos;][&apos;is_attended&apos;];
tmp[&apos;SCH&apos;][&apos;SCH.25&apos;][&apos;SCH.25.3&apos;] = msg[0][&apos;appointment&apos;][&apos;google_cal_id&apos;];</script>
        </com.mirth.connect.plugins.javascriptstep.JavaScriptStep>
      </elements>
      <inboundTemplate encoding="base64">ew0KICAgICJhcHBsaWNhdGlvbl9zZW5kaW5nIjogIiIsDQogICAgInNlbmRpbmdfZmFjaWxpdHkiOiAiIiwNCiAgICAicmVjZWl2aW5nX2FwcGxpY2F0aW9uIjogIiIsDQogICAgInJlY2VpdmluZ19mYWNpbGl0eSI6ICIiLA0KICAgICJ0aW1lIjogIiIsDQogICAgIm1lc3NhZ2VfdHlwZSI6ICIiLA0KICAgICJtZXNzYWdlX2NvbnRyb2xfaWQiOiAiIiwNCiAgICAicHJvY2Vzc19pZCI6ICIiLA0KICAgICJ2ZXJzaW9uX2lkIjogIjIuNCINCn0NCg==</inboundTemplate>
      <outboundTemplate encoding="base64">TVNIfF5+XCZ8fHx8fHx8fHx8Mi40</outboundTemplate>
      <inboundDataType>JSON</inboundDataType>
      <outboundDataType>HL7V2</outboundDataType>
      <inboundProperties class="com.mirth.connect.plugins.datatypes.json.JSONDataTypeProperties" version="4.5.1">
        <batchProperties class="com.mirth.connect.plugins.datatypes.json.JSONBatchProperties" version="4.5.1">
          <splitType>JavaScript</splitType>
          <batchScript></batchScript>
        </batchProperties>
      </inboundProperties>
      <outboundProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DataTypeProperties" version="4.5.1">
        <serializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2SerializationProperties" version="4.5.1">
          <handleRepetitions>true</handleRepetitions>
          <handleSubcomponents>true</handleSubcomponents>
          <useStrictParser>false</useStrictParser>
          <useStrictValidation>false</useStrictValidation>
          <stripNamespaces>true</stripNamespaces>
          <segmentDelimiter>
</segmentDelimiter>
          <convertLineBreaks>true</convertLineBreaks>
        </serializationProperties>
        <deserializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DeserializationProperties" version="4.5.1">
          <useStrictParser>false</useStrictParser>
          <useStrictValidation>false</useStrictValidation>
          <segmentDelimiter>
</segmentDelimiter>
        </deserializationProperties>
        <batchProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2BatchProperties" version="4.5.1">
          <splitType>MSH_Segment</splitType>
          <batchScript></batchScript>
        </batchProperties>
        <responseGenerationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseGenerationProperties" version="4.5.1">
          <segmentDelimiter>
</segmentDelimiter>
          <successfulACKCode>AA</successfulACKCode>
          <successfulACKMessage></successfulACKMessage>
          <errorACKCode>AE</errorACKCode>
          <errorACKMessage>An Error Occurred Processing Message.</errorACKMessage>
          <rejectedACKCode>AR</rejectedACKCode>
          <rejectedACKMessage>Message Rejected.</rejectedACKMessage>
          <msh15ACKAccept>false</msh15ACKAccept>
          <dateFormat>yyyyMMddHHmmss.SSS</dateFormat>
        </responseGenerationProperties>
        <responseValidationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseValidationProperties" version="4.5.1">
          <successfulACKCode>AA,CA</successfulACKCode>
          <errorACKCode>AE,CE</errorACKCode>
          <rejectedACKCode>AR,CR</rejectedACKCode>
          <validateMessageControlId>true</validateMessageControlId>
          <originalMessageControlId>Destination_Encoded</originalMessageControlId>
          <originalIdMapVariable></originalIdMapVariable>
        </responseValidationProperties>
      </outboundProperties>
    </transformer>
    <filter version="4.5.1">
      <elements/>
    </filter>
    <transportName>HTTP Listener</transportName>
    <mode>SOURCE</mode>
    <enabled>true</enabled>
    <waitForPrevious>true</waitForPrevious>
  </sourceConnector>
  <destinationConnectors>
    <connector version="4.5.1">
      <metaDataId>2</metaDataId>
      <name>Destination 1</name>
      <properties class="com.mirth.connect.connectors.http.HttpDispatcherProperties" version="4.5.1">
        <pluginProperties/>
        <destinationConnectorProperties version="4.5.1">
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
        <host>http://localhost:5000/api/mirth/receive</host>
        <useProxyServer>false</useProxyServer>
        <proxyAddress></proxyAddress>
        <proxyPort></proxyPort>
        <method>post</method>
        <headers class="linked-hash-map"/>
        <parameters class="linked-hash-map"/>
        <useHeadersVariable>false</useHeadersVariable>
        <headersVariable></headersVariable>
        <useParametersVariable>false</useParametersVariable>
        <parametersVariable></parametersVariable>
        <responseXmlBody>false</responseXmlBody>
        <responseParseMultipart>true</responseParseMultipart>
        <responseIncludeMetadata>false</responseIncludeMetadata>
        <responseBinaryMimeTypes>application/.*(?&lt;!json|xml)$|image/.*|video/.*|audio/.*</responseBinaryMimeTypes>
        <responseBinaryMimeTypesRegex>true</responseBinaryMimeTypesRegex>
        <multipart>false</multipart>
        <useAuthentication>false</useAuthentication>
        <authenticationType>Basic</authenticationType>
        <usePreemptiveAuthentication>false</usePreemptiveAuthentication>
        <username></username>
        <password></password>
        <content>\${message.encodedData}</content>
        <contentType>text/plain</contentType>
        <dataTypeBinary>false</dataTypeBinary>
        <charset>UTF-8</charset>
        <socketTimeout>30000</socketTimeout>
      </properties>
      <transformer version="4.5.1">
        <elements/>
        <inboundDataType>HL7V2</inboundDataType>
        <outboundDataType>HL7V2</outboundDataType>
        <inboundProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DataTypeProperties" version="4.5.1">
          <serializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2SerializationProperties" version="4.5.1">
            <handleRepetitions>true</handleRepetitions>
            <handleSubcomponents>true</handleSubcomponents>
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <stripNamespaces>true</stripNamespaces>
            <segmentDelimiter>
</segmentDelimiter>
            <convertLineBreaks>true</convertLineBreaks>
          </serializationProperties>
          <deserializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DeserializationProperties" version="4.5.1">
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <segmentDelimiter>
</segmentDelimiter>
          </deserializationProperties>
          <batchProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2BatchProperties" version="4.5.1">
            <splitType>MSH_Segment</splitType>
            <batchScript></batchScript>
          </batchProperties>
          <responseGenerationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseGenerationProperties" version="4.5.1">
            <segmentDelimiter>
</segmentDelimiter>
            <successfulACKCode>AA</successfulACKCode>
            <successfulACKMessage></successfulACKMessage>
            <errorACKCode>AE</errorACKCode>
            <errorACKMessage>An Error Occurred Processing Message.</errorACKMessage>
            <rejectedACKCode>AR</rejectedACKCode>
            <rejectedACKMessage>Message Rejected.</rejectedACKMessage>
            <msh15ACKAccept>false</msh15ACKAccept>
            <dateFormat>yyyyMMddHHmmss.SSS</dateFormat>
          </responseGenerationProperties>
          <responseValidationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseValidationProperties" version="4.5.1">
            <successfulACKCode>AA,CA</successfulACKCode>
            <errorACKCode>AE,CE</errorACKCode>
            <rejectedACKCode>AR,CR</rejectedACKCode>
            <validateMessageControlId>true</validateMessageControlId>
            <originalMessageControlId>Destination_Encoded</originalMessageControlId>
            <originalIdMapVariable></originalIdMapVariable>
          </responseValidationProperties>
        </inboundProperties>
        <outboundProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DataTypeProperties" version="4.5.1">
          <serializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2SerializationProperties" version="4.5.1">
            <handleRepetitions>true</handleRepetitions>
            <handleSubcomponents>true</handleSubcomponents>
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <stripNamespaces>true</stripNamespaces>
            <segmentDelimiter>
</segmentDelimiter>
            <convertLineBreaks>true</convertLineBreaks>
          </serializationProperties>
          <deserializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DeserializationProperties" version="4.5.1">
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <segmentDelimiter>
</segmentDelimiter>
          </deserializationProperties>
          <batchProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2BatchProperties" version="4.5.1">
            <splitType>MSH_Segment</splitType>
            <batchScript></batchScript>
          </batchProperties>
          <responseGenerationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseGenerationProperties" version="4.5.1">
            <segmentDelimiter>
</segmentDelimiter>
            <successfulACKCode>AA</successfulACKCode>
            <successfulACKMessage></successfulACKMessage>
            <errorACKCode>AE</errorACKCode>
            <errorACKMessage>An Error Occurred Processing Message.</errorACKMessage>
            <rejectedACKCode>AR</rejectedACKCode>
            <rejectedACKMessage>Message Rejected.</rejectedACKMessage>
            <msh15ACKAccept>false</msh15ACKAccept>
            <dateFormat>yyyyMMddHHmmss.SSS</dateFormat>
          </responseGenerationProperties>
          <responseValidationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseValidationProperties" version="4.5.1">
            <successfulACKCode>AA,CA</successfulACKCode>
            <errorACKCode>AE,CE</errorACKCode>
            <rejectedACKCode>AR,CR</rejectedACKCode>
            <validateMessageControlId>true</validateMessageControlId>
            <originalMessageControlId>Destination_Encoded</originalMessageControlId>
            <originalIdMapVariable></originalIdMapVariable>
          </responseValidationProperties>
        </outboundProperties>
      </transformer>
      <responseTransformer version="4.5.1">
        <elements/>
        <inboundTemplate encoding="base64">TVNIfF5+XCZ8fHx8fHx8fHx8Mi40</inboundTemplate>
        <outboundTemplate encoding="base64">TVNIfF5+XCZ8fHx8fHx8fHx8Mi40</outboundTemplate>
        <inboundDataType>HL7V2</inboundDataType>
        <outboundDataType>HL7V2</outboundDataType>
        <inboundProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DataTypeProperties" version="4.5.1">
          <serializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2SerializationProperties" version="4.5.1">
            <handleRepetitions>true</handleRepetitions>
            <handleSubcomponents>true</handleSubcomponents>
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <stripNamespaces>true</stripNamespaces>
            <segmentDelimiter>
</segmentDelimiter>
            <convertLineBreaks>true</convertLineBreaks>
          </serializationProperties>
          <deserializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DeserializationProperties" version="4.5.1">
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <segmentDelimiter>
</segmentDelimiter>
          </deserializationProperties>
          <batchProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2BatchProperties" version="4.5.1">
            <splitType>MSH_Segment</splitType>
            <batchScript></batchScript>
          </batchProperties>
          <responseGenerationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseGenerationProperties" version="4.5.1">
            <segmentDelimiter>
</segmentDelimiter>
            <successfulACKCode>AA</successfulACKCode>
            <successfulACKMessage></successfulACKMessage>
            <errorACKCode>AE</errorACKCode>
            <errorACKMessage>An Error Occurred Processing Message.</errorACKMessage>
            <rejectedACKCode>AR</rejectedACKCode>
            <rejectedACKMessage>Message Rejected.</rejectedACKMessage>
            <msh15ACKAccept>false</msh15ACKAccept>
            <dateFormat>yyyyMMddHHmmss.SSS</dateFormat>
          </responseGenerationProperties>
          <responseValidationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseValidationProperties" version="4.5.1">
            <successfulACKCode>AA,CA</successfulACKCode>
            <errorACKCode>AE,CE</errorACKCode>
            <rejectedACKCode>AR,CR</rejectedACKCode>
            <validateMessageControlId>true</validateMessageControlId>
            <originalMessageControlId>Destination_Encoded</originalMessageControlId>
            <originalIdMapVariable></originalIdMapVariable>
          </responseValidationProperties>
        </inboundProperties>
        <outboundProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DataTypeProperties" version="4.5.1">
          <serializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2SerializationProperties" version="4.5.1">
            <handleRepetitions>true</handleRepetitions>
            <handleSubcomponents>true</handleSubcomponents>
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <stripNamespaces>true</stripNamespaces>
            <segmentDelimiter>
</segmentDelimiter>
            <convertLineBreaks>true</convertLineBreaks>
          </serializationProperties>
          <deserializationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2DeserializationProperties" version="4.5.1">
            <useStrictParser>false</useStrictParser>
            <useStrictValidation>false</useStrictValidation>
            <segmentDelimiter>
</segmentDelimiter>
          </deserializationProperties>
          <batchProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2BatchProperties" version="4.5.1">
            <splitType>MSH_Segment</splitType>
            <batchScript></batchScript>
          </batchProperties>
          <responseGenerationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseGenerationProperties" version="4.5.1">
            <segmentDelimiter>
</segmentDelimiter>
            <successfulACKCode>AA</successfulACKCode>
            <successfulACKMessage></successfulACKMessage>
            <errorACKCode>AE</errorACKCode>
            <errorACKMessage>An Error Occurred Processing Message.</errorACKMessage>
            <rejectedACKCode>AR</rejectedACKCode>
            <rejectedACKMessage>Message Rejected.</rejectedACKMessage>
            <msh15ACKAccept>false</msh15ACKAccept>
            <dateFormat>yyyyMMddHHmmss.SSS</dateFormat>
          </responseGenerationProperties>
          <responseValidationProperties class="com.mirth.connect.plugins.datatypes.hl7v2.HL7v2ResponseValidationProperties" version="4.5.1">
            <successfulACKCode>AA,CA</successfulACKCode>
            <errorACKCode>AE,CE</errorACKCode>
            <rejectedACKCode>AR,CR</rejectedACKCode>
            <validateMessageControlId>true</validateMessageControlId>
            <originalMessageControlId>Destination_Encoded</originalMessageControlId>
            <originalIdMapVariable></originalIdMapVariable>
          </responseValidationProperties>
        </outboundProperties>
      </responseTransformer>
      <filter version="4.5.1">
        <elements/>
      </filter>
      <transportName>HTTP Sender</transportName>
      <mode>DESTINATION</mode>
      <enabled>true</enabled>
      <waitForPrevious>true</waitForPrevious>
    </connector>
  </destinationConnectors>
  <preprocessingScript>
  
  </preprocessingScript>
  <postprocessingScript>// This script executes once after a message has been processed
// Responses returned from here will be stored as &quot;Postprocessor&quot; in the response map
return;</postprocessingScript>
  <deployScript>// This script executes once when the channel is deployed
// You only have access to the globalMap and globalChannelMap here to persist data
return;</deployScript>
  <undeployScript>// This script executes once when the channel is undeployed
// You only have access to the globalMap and globalChannelMap here to persist data
return;</undeployScript>
  <properties version="4.5.1">
    <clearGlobalChannelMap>true</clearGlobalChannelMap>
    <messageStorageMode>DEVELOPMENT</messageStorageMode>
    <encryptData>false</encryptData>
    <encryptAttachments>false</encryptAttachments>
    <encryptCustomMetaData>false</encryptCustomMetaData>
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
    <attachmentProperties version="4.5.1">
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
        <time>1735043502813</time>
        <timezone>Europe/London</timezone>
      </lastModified>
      <pruningSettings>
        <archiveEnabled>true</archiveEnabled>
        <pruneErroredMessages>false</pruneErroredMessages>
      </pruningSettings>
      <userId>1</userId>
    </metadata>
  </exportData>
</channel>`;

module.exports = channelConfig;