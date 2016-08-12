import manifest from '../../package.json';

export default function getBuildVersion() {
  return manifest.version || 'dev';
}
