import SyntaxHighlighter from 'react-syntax-highlighter';
import dark from 'react-syntax-highlighter/dist/esm/styles/hljs/hybrid';
import JsonToTS from 'json-to-ts';
import { Entry } from '../../types/har';
import CollapsibleSection from '../CollapsibleSection';
import KeyValue from '../KeyValue';
import EntryResponseImage from '../EntryResponseImage';
import { cleanSize } from '../../helpers/file';

interface ExpandedHarRequestViewProps {
  entry: Entry;
}

export default function ExpandedHarResponseView({
  entry,
}: ExpandedHarRequestViewProps) {
  return (
    <>
      <CollapsibleSection name="Response Metadata">
        <KeyValue
          name={`Mime Type: `}
          value={entry.response.content.mimeType}
        />
        <KeyValue
          name={`Response Size: `}
          value={cleanSize(entry.response.content.size)}
        />
        <KeyValue
          name={`Response Time: `}
          value={`${entry.timings.receive.toFixed(2)} ms`}
        />
      </CollapsibleSection>

      <CollapsibleSection name="Response Body">
        <SyntaxHighlighter
          language="javascript"
          style={dark}
          wrapLines
          customStyle={{ borderRadius: `10px`, padding: `12px` }}
        >
          {entry.response.content.text || `No content available`}
        </SyntaxHighlighter>
        <div>
          {entry.response.content.mimeType.startsWith(`image/`) && (
            <EntryResponseImage entry={entry} />
          )}
        </div>
      </CollapsibleSection>

      {entry.response.content.mimeType.startsWith(`application/json`) &&
        entry.response.content.text && (
          <CollapsibleSection name="Types from JSON">
            <div style={{ width: `95vw` }}>
              <SyntaxHighlighter
                language="typescript"
                style={dark}
                showLineNumbers
                customStyle={{ borderRadius: `10px`, padding: `12px` }}
              >
                {JsonToTS(JSON.parse(entry.response.content.text)).join(`\n\n`)}
              </SyntaxHighlighter>
            </div>
          </CollapsibleSection>
        )}
    </>
  );
}
