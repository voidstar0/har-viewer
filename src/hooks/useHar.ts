import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Har } from '../types/har';

function mapUUIDs(har: Har) {
  const temporaryHar = har;
  temporaryHar.log.entries = temporaryHar.log.entries.map((e) => ({
    ...e,
    uuid: uuidv4(),
  }));
  return temporaryHar;
}

/**
 * Modify the HAR's entries to have unique UUIDs for each entry
 * to allow us to map entries by uniqueness. URL can't be used
 * since a request to the same URL can be made multiple times.
 * @param initialHar Har file to view
 * @returns Har with UUIds in the entries and a function to modify the current HAR
 */
export default function useHar(initialHar: Har): [Har, (har: Har) => void] {
  const [har, setHar] = useState<Har>(mapUUIDs(initialHar));

  const dispatch = useCallback(
    (newHar: Har) => {
      setHar(mapUUIDs(newHar));
    },
    [setHar],
  );

  return [har, dispatch];
}
