import { commandSync } from 'execa';

const postProcessing = async (): Promise<void> => {
  commandSync('yarn', { stdio: 'inherit' });
  console.info('✨ Success.');
}

export default postProcessing;
