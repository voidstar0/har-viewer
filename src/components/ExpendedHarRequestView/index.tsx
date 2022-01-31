import SyntaxHighlighter from 'react-syntax-highlighter';
import dark from 'react-syntax-highlighter/dist/esm/styles/hljs/hybrid';
import { Entry } from '../../types/har';
import CollapsibleSection from '../CollapsibleSection';
import KeyValue from '../KeyValue';

interface ExpandedHarRequestViewProps {
  entry: Entry;
}

function createCodeFromRequest(entry: Entry) {
  // Remove pseudo-headers from the list
  // and transform a list of header objects into
  // a headers record
  const headers = entry.request.headers
    .filter((h) => !h.name.startsWith(`:`))
    .reduce((acc, h) => ({ ...acc, [h.name]: h.value }), {});

  const body = entry.request.postData?.text;
  const { method } = entry.request;
  const requestInit = { headers, body, method };
  return `fetch("${entry.request.url}", ${JSON.stringify(
    requestInit,
    null,
    4,
  )})`;
}

export default function ExpandedHarRequestView({
  entry,
}: ExpandedHarRequestViewProps) {
  const { request, response, serverIPAddress } = entry;
  return (
    <>
      <CollapsibleSection name="General">
        <KeyValue name={`Request URL: `} value={request.url} />
        <KeyValue name={`Request Method: `} value={request.method} />
        <KeyValue name={`Status: `} value={`${response.status}`} />
        <KeyValue name={`Remote Addr: `} value={`${serverIPAddress}`} />
      </CollapsibleSection>
      <CollapsibleSection name="Request Headers">
        {request.headers.map(({ name, value }) => (
          <KeyValue name={name} value={value} key={name} />
        ))}
      </CollapsibleSection>

      <CollapsibleSection name="Response Headers">
        {response.headers.map(({ name, value }) => (
          <KeyValue name={name} value={value} key={name} />
        ))}
      </CollapsibleSection>

      <CollapsibleSection name="Request with Code">
        <div style={{ width: `95vw` }}>
          <SyntaxHighlighter
            language="javascript"
            style={dark}
            showLineNumbers
            customStyle={{ borderRadius: `10px`, padding: `12px` }}
          >
            {createCodeFromRequest(entry)}
          </SyntaxHighlighter>
        </div>
      </CollapsibleSection>
    </>
  );
}
