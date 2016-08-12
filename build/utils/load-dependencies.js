import pull from 'lodash/pull';
import manifest from '../../package.json';

export default function loadDependencies(exclude, include) {
  let dependencies = Object.keys(manifest.dependencies || {});

  if (!dependencies || !dependencies.length) {
    return [];
  }

  if (exclude) {
    exclude.map((item) => dependencies = pull(dependencies, item));
  }

  if (include) {
    include.map((item) => dependencies.push(item));
  }

  return dependencies.sort();
}
