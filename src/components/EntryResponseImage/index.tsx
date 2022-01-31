import { Entry } from '../../types/har';

interface EntryResponseImageProps {
  entry: Entry;
}

export default function EntryResponseImage({ entry }: EntryResponseImageProps) {
  return (
    <img
      src={`data:${entry.response.content.mimeType};base64,${entry.response.content.text}`}
      alt={`From Response ${entry.request.url.substring(
        entry.request.url.lastIndexOf(`/`),
      )}`}
    />
  );
}
