import { execSync } from 'child_process';
const postProcessing = async (): Promise<void> => {
  execSync('yarn', { stdio: 'inherit' });
  console.info('✨ Success.');
}

export default postProcessing;
