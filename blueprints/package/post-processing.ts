import { execaSync } from 'execa';

const postProcessing = async (): Promise<void> => {
  execaSync('yarn', { stdio: 'inherit' });
  console.info('✨ Success.');
}

export default postProcessing;
