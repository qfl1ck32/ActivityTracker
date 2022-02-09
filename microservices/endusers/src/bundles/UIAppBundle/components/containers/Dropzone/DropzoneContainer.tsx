import { Box, IconButton } from '@mui/material';
import React, { Fragment, useCallback, useState } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { AppFile } from 'src/api.types';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/Add';

import { useUIComponents } from '@bluelibs/x-ui-react-bundle';

export type DropzoneFileType = Partial<File> & Partial<AppFile>;

export type DropzoneContainerProps = {
  options?: DropzoneOptions;

  files: Partial<DropzoneFileType>[];

  onUpload?: ((file: File) => Promise<void>) | ((files: File[]) => Promise<void>);
  onRemove?: (index: number) => Promise<void>;
};

export const DropzoneContainer: React.FC<DropzoneContainerProps> = ({ options, files, onUpload, onRemove }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (onUpload) {
      setIsLoading(true);

      try {
        // TODO: why as any...
        await onUpload(acceptedFiles.length === 1 ? acceptedFiles[0] : (acceptedFiles as any));
      } catch (_) {
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const UIComponents = useUIComponents();

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    ...options,
  });

  const onRemoveItem = async (index: number) => {
    if (!onRemove) return;

    setIsLoading(true);

    try {
      await onRemove(index);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <input {...getInputProps()} />

      <Box
        sx={{
          display: 'flex',
          borderRadius: '25%',
          backgroundColor: files.length && !isLoading ? '' : '#00AAFF',
          height: 200,
          width: 200,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isLoading ? (
          <UIComponents.Loader />
        ) : files.length === 0 ? (
          <IconButton {...getRootProps()} sx={{ borderRadius: 0, color: 'white' }}>
            <AddIcon />
            Upload
          </IconButton>
        ) : (
          files.map((file, index) => (
            <Box key={index}>
              <img
                {...getRootProps()}
                style={{ width: 200, height: 200, borderRadius: '25%', border: '5px solid #00AAFF' }}
                src={file.downloadUrl}
              />
              {onRemove && (
                <IconButton
                  onClick={() => onRemoveItem(index)}
                  size="small"
                  sx={{ justifyContent: 'flex-end', position: 'absolute' }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              )}
            </Box>
          ))
        )}
      </Box>
    </Fragment>
  );
};
