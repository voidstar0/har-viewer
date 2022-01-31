import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import testhar from './testhar.json';
import './App.css';
import SequentialHarView from './components/SequentialHarView';
import { Har } from './types/har';
import Header from './components/Header';
import useHar from './hooks/useHar';

function App() {
  const [har, setHar] = useHar(testhar as Har);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.addEventListener(`load`, () => {
        const binaryString = reader.result;
        if (typeof binaryString !== `string`) {
          throw new TypeError(`Unreachable`);
        }
        setHar(JSON.parse(binaryString));
      });
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <div className="App" {...getRootProps()}>
      <input {...getInputProps()} />
      <Header />
      <SequentialHarView har={har} />
    </div>
  );
}

export default App;
