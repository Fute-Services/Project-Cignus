import { Directory, File, Paths } from 'expo-file-system';
import { pdfJsSource, pdfWorkerJsSource } from '../data/pdfjs_assets';

// Writes the bundled pdf.js/pdf.worker.js sources to on-device cache files once,
// so the PDF viewer's WebView can load them via a local file:// script src instead
// of depending on a CDN (cdnjs) that may be unreachable on kiosk/venue wifi.
export function getLocalPdfJsUris(): { pdfJsUri: string; pdfWorkerUri: string } {
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
