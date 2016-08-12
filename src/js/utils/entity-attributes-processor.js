import { Immutable } from 'imm-flux-utils';

export default function entityAttributesProcessor(entityAttributes) {
  const isList = Immutable.List.isList;
  const orderedMap = Immutable.OrderedMap;
  let tempAttributes = orderedMap();

  if (!entityAttributes) {
    return tempAttributes;
  }

  if (entityAttributes && isList(entityAttributes)) {
    entityAttributes.map((attr) => {
      tempAttributes = tempAttributes.concat(attr);
    });

    entityAttributes = tempAttributes;
  }

  return entityAttributes;
}
