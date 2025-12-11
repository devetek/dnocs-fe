import { result } from '../result';
import type { Result } from '../result/types';

interface Options {
  accept?: string;
  allowMultiple?: boolean;
}

type UploadDialogError =
  | { reason: 'closed' }
  | { reason: 'failed'; error: Error };

export async function openUploadDialog(
  options?: Options,
): Promise<Result<File[], UploadDialogError>> {
  const { allowMultiple = false, accept = '*' } = options ?? {};

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = accept;
  input.multiple = allowMultiple;
  input.style.display = 'none';

  return new Promise<Result<File[], UploadDialogError>>((resolve) => {
    input.addEventListener('cancel', () => {
      resolve(
        result.err({
          reason: 'closed',
        }),
      );
    });

    input.addEventListener('change', (e) => {
      const files = (e.target as HTMLInputElement).files;

      if (!files || files.length < 1) {
        resolve(
          result.err({
            reason: 'failed',
            error: Error('No files retrieved!'),
          }),
        );
        return;
      }

      resolve(result.ok(Array.from(files)));
    });

    document.body.appendChild(input);

    input.click();
    input.remove(); // clean up
  });
}
