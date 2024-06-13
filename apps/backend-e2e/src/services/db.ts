import { exec } from 'child_process';

export const refreshSchema = async () => {
  return new Promise<void>((resolve, reject) => {
    exec('./scripts/refresh-schema.sh', (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
};
