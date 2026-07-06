import { Platform } from 'react-native';
import { Directory, File, Paths } from 'expo-file-system';
import { pdfJsSource, pdfWorkerJsSource } from '../data/pdfjs_assets';

// Writes the bundled pdf.js/pdf.worker.js sources to on-device cache files once,
// so the PDF viewer's WebView can load them via a local file:// script src instead
// of depending on a CDN (cdnjs) that may be unreachable on kiosk/venue wifi.
//
// expo-file-system's Directory/File classes aren't implemented on web (used by
// the desktop Electron shell too, which renders the WebView content as a real
// iframe) — there's no on-device cache to write to. Blob URLs give the same
// "load without hitting a CDN" property directly in the browser/Chromium
// context, so use those instead of touching the filesystem.
export function getLocalPdfJsUris(): { pdfJsUri: string; pdfWorkerUri: string } {
  if (Platform.OS === 'web') {
    const pdfJsUri = URL.createObjectURL(new Blob([pdfJsSource], { type: 'text/javascript' }));
    const pdfWorkerUri = URL.createObjectURL(new Blob([pdfWorkerJsSource], { type: 'text/javascript' }));
    return { pdfJsUri, pdfWorkerUri };
  }

  const dir = new Directory(Paths.cache, 'pdfjs');
  if (!dir.exists) {
    dir.create({ intermediates: true, idempotent: true });
  }

  const pdfJsFile = new File(dir, 'pdf.min.js');
  if (!pdfJsFile.exists) {
    pdfJsFile.create();
    pdfJsFile.write(pdfJsSource);
  }

  const pdfWorkerFile = new File(dir, 'pdf.worker.min.js');
  if (!pdfWorkerFile.exists) {
    pdfWorkerFile.create();
    pdfWorkerFile.write(pdfWorkerJsSource);
  }

  return { pdfJsUri: pdfJsFile.uri, pdfWorkerUri: pdfWorkerFile.uri };
}
